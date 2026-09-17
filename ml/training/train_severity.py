import sys
from pathlib import Path

import joblib
import pandas as pd

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report


# Add ml directory to Python path
ML_DIR = Path(__file__).resolve().parents[1]
sys.path.append(str(ML_DIR))


from config import MODEL_DIR, SEVERITY_MODEL_FILE


# Columns required for severity prediction
SEVERITY_FEATURES = [
    "safety_impact",
    "repeat_violation"
]


IMPACT_MAPPING = {
    "low": 1,
    "medium": 2,
    "high": 3,
    "critical": 4
}


def train_model(data_file):
    """
    Train the MineXpert violation severity model.

    Parameters:
        data_file: CSV dataset containing violation records.
    """

    data_file = Path(data_file)

    # --------------------------------
    # 1. Check dataset
    # --------------------------------

    if not data_file.exists():
        raise FileNotFoundError(
            f"Severity dataset not found: {data_file}"
        )

    # --------------------------------
    # 2. Load dataset
    # --------------------------------

    df = pd.read_csv(
        data_file
    )

    if df.empty:
        raise ValueError(
            "Severity dataset is empty."
        )

    # --------------------------------
    # 3. Validate columns
    # --------------------------------

    required_columns = (
        SEVERITY_FEATURES
        + ["severity"]
    )

    missing_columns = [
        column
        for column in required_columns
        if column not in df.columns
    ]

    if missing_columns:
        raise ValueError(
            "Dataset is missing required columns: "
            + ", ".join(missing_columns)
        )

    # --------------------------------
    # 4. Clean data
    # --------------------------------

    df["safety_impact"] = (
        df["safety_impact"]
        .astype(str)
        .str.strip()
        .str.lower()
    )

    df["safety_impact"] = (
        df["safety_impact"]
        .map(IMPACT_MAPPING)
    )

    df["repeat_violation"] = pd.to_numeric(
        df["repeat_violation"],
        errors="coerce"
    )

    df["severity"] = (
        df["severity"]
        .astype(str)
        .str.strip()
        .str.capitalize()
    )

    df = df.dropna(
        subset=required_columns
    )

    if df.empty:
        raise ValueError(
            "No valid severity records remain after cleaning."
        )

    # --------------------------------
    # 5. Prepare X and y
    # --------------------------------

    X = df[SEVERITY_FEATURES]

    y = df["severity"]

    # --------------------------------
    # 6. Train/test split
    # --------------------------------

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.20,
        random_state=42,
        stratify=y
    )

    # --------------------------------
    # 7. Create model
    # --------------------------------

    model = RandomForestClassifier(
        n_estimators=200,
        random_state=42,
        n_jobs=-1,
        class_weight="balanced"
    )

    # --------------------------------
    # 8. Train model
    # --------------------------------

    model.fit(
        X_train,
        y_train
    )

    # --------------------------------
    # 9. Evaluate model
    # --------------------------------

    predictions = model.predict(
        X_test
    )

    accuracy = accuracy_score(
        y_test,
        predictions
    )

    print("\nMineXpert Violation Severity Model")
    print("----------------------------------")

    print(
        "Training records:",
        len(X_train)
    )

    print(
        "Testing records:",
        len(X_test)
    )

    print(
        "Accuracy:",
        round(accuracy, 3)
    )

    print("\nClassification Report:")

    print(
        classification_report(
            y_test,
            predictions,
            zero_division=0
        )
    )

    # --------------------------------
    # 10. Feature importance
    # --------------------------------

    feature_importance = (
        pd.Series(
            model.feature_importances_,
            index=SEVERITY_FEATURES
        )
        .sort_values(
            ascending=False
        )
    )

    print("\nSeverity Factors:")

    for feature, importance in feature_importance.items():

        print(
            f"- {feature}: "
            f"{importance:.3f}"
        )

    # --------------------------------
    # 11. Save model
    # --------------------------------

    MODEL_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    joblib.dump(
        {
            "model": model,
            "features": SEVERITY_FEATURES
        },
        SEVERITY_MODEL_FILE
    )

    print("\nModel saved to:")
    print(SEVERITY_MODEL_FILE)


if __name__ == "__main__":

    print(
        "Provide a severity dataset when calling "
        "train_model()."
    )