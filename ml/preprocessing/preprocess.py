import sys
from pathlib import Path

import pandas as pd


# Add ml directory to Python path
ML_DIR = Path(__file__).resolve().parents[1]
sys.path.append(str(ML_DIR))


from config import RAW_DATA_DIR, PROCESSED_DATA_DIR
from preprocessing.feature_engineering import create_risk_features


REQUIRED_COLUMNS = [
    "mine_id",
    "inspections_count",
    "total_violations",
    "critical_violations",
    "unresolved_violations",
    "compliance_score",
    "recent_incidents",
    "risk_level"
]


def validate_dataset(df):
    """
    Validate that the dataset contains all
    columns required by the ML pipeline.
    """

    missing_columns = [
        column
        for column in REQUIRED_COLUMNS
        if column not in df.columns
    ]

    if missing_columns:
        raise ValueError(
            "Dataset is missing required columns: "
            + ", ".join(missing_columns)
        )


def preprocess(input_file=None):
    """
    Load a mining dataset, validate it, create
    engineered features, and save the processed dataset.

    Parameters:
        input_file: Optional CSV file supplied by
                    the backend/database team.
    """

    RAW_DATA_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    PROCESSED_DATA_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    # --------------------------------
    # 1. Locate dataset
    # --------------------------------

    if input_file is None:

        input_file = (
            RAW_DATA_DIR / "mine_risk_data.csv"
        )

    else:

        input_file = Path(input_file)

    if not input_file.exists():
        raise FileNotFoundError(
            f"Dataset not found: {input_file}"
        )

    # --------------------------------
    # 2. Load dataset
    # --------------------------------

    df = pd.read_csv(input_file)

    if df.empty:
        raise ValueError(
            "Dataset is empty."
        )

    # --------------------------------
    # 3. Validate dataset
    # --------------------------------

    validate_dataset(df)

    # --------------------------------
    # 4. Clean data
    # --------------------------------

    df = df.drop_duplicates()

    numeric_columns = [
        "inspections_count",
        "total_violations",
        "critical_violations",
        "unresolved_violations",
        "compliance_score",
        "recent_incidents"
    ]

    for column in numeric_columns:

        df[column] = pd.to_numeric(
            df[column],
            errors="coerce"
        )

    df = df.dropna(
        subset=numeric_columns + ["risk_level"]
    )

    # --------------------------------
    # 5. Create engineered features
    # --------------------------------

    processed_df = create_risk_features(
        df
    )

    # --------------------------------
    # 6. Save processed dataset
    # --------------------------------

    processed_file = (
        PROCESSED_DATA_DIR
        / "risk_dataset.csv"
    )

    processed_df.to_csv(
        processed_file,
        index=False
    )

    # --------------------------------
    # 7. Display summary
    # --------------------------------

    print("\nMineXpert Data Preprocessing")
    print("----------------------------")

    print(
        "Input dataset:",
        input_file
    )

    print(
        "Processed dataset:",
        processed_file
    )

    print(
        "Records processed:",
        len(processed_df)
    )

    print(
        "Features created:",
        len(processed_df.columns)
    )

    print("\nDataset validation: SUCCESS")


if __name__ == "__main__":

    preprocess()