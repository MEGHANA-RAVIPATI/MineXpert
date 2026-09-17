import sys
from pathlib import Path

import joblib
import pandas as pd


# Add ml directory to Python path
ML_DIR = Path(__file__).resolve().parents[1]
sys.path.append(str(ML_DIR))


from config import SEVERITY_MODEL_FILE


IMPACT_MAPPING = {
    "low": 1,
    "medium": 2,
    "high": 3,
    "critical": 4
}


def load_model():
    """
    Load the trained severity model.
    """

    if not SEVERITY_MODEL_FILE.exists():
        raise FileNotFoundError(
            "Severity model not found. "
            "Train the severity model first."
        )

    saved_model = joblib.load(
        SEVERITY_MODEL_FILE
    )

    return saved_model["model"]


def prepare_severity_features(df):
    """
    Convert severity input data into the numerical
    format required by the model.
    """

    df = df.copy()

    df["safety_impact"] = (
        df["safety_impact"]
        .astype(str)
        .str.strip()
        .str.lower()
    )

    invalid_values = set(
        df["safety_impact"]
    ) - set(IMPACT_MAPPING.keys())

    if invalid_values:
        raise ValueError(
            "Invalid safety_impact values: "
            + ", ".join(
                sorted(invalid_values)
            )
        )

    df["safety_impact"] = (
        df["safety_impact"]
        .map(IMPACT_MAPPING)
    )

    df["repeat_violation"] = pd.to_numeric(
        df["repeat_violation"],
        errors="coerce"
    )

    if df["repeat_violation"].isna().any():
        raise ValueError(
            "repeat_violation must contain "
            "numeric 0 or 1 values."
        )

    if not df["repeat_violation"].isin(
        [0, 1]
    ).all():
        raise ValueError(
            "repeat_violation must contain "
            "only 0 or 1."
        )

    return df[
        [
            "safety_impact",
            "repeat_violation"
        ]
    ]


def predict_severity(
    safety_impact,
    repeat_violation
):
    """
    Predict the severity of one violation.
    """

    model = load_model()

    input_data = pd.DataFrame([{
        "safety_impact": safety_impact,
        "repeat_violation": repeat_violation
    }])

    features = prepare_severity_features(
        input_data
    )

    prediction = model.predict(
        features
    )[0]

    probabilities = model.predict_proba(
        features
    )[0]

    confidence = max(probabilities)

    return {
        "severity": prediction,
        "confidence": round(
            float(confidence),
            3
        )
    }


def predict_severity_batch(df):
    """
    Predict severity for multiple violations.

    Parameters:
        df: Pandas DataFrame containing violation data.

    Returns:
        DataFrame containing severity predictions
        and confidence values.
    """

    required_columns = [
        "safety_impact",
        "repeat_violation"
    ]

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

    model = load_model()

    features = prepare_severity_features(
        df
    )

    predictions = model.predict(
        features
    )

    probabilities = model.predict_proba(
        features
    )

    confidences = probabilities.max(
        axis=1
    )

    results = df.copy()

    results["predicted_severity"] = predictions

    results["severity_confidence"] = [
        round(float(value), 3)
        for value in confidences
    ]

    return results


if __name__ == "__main__":

    result = predict_severity(
        safety_impact="high",
        repeat_violation=1
    )

    print("\nMineXpert Violation Severity")
    print("----------------------------")

    print(
        "Severity:",
        result["severity"]
    )

    print(
        "Confidence:",
        result["confidence"]
    )