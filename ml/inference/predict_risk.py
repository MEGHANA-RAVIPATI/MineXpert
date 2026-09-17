import sys
from pathlib import Path

import joblib
import pandas as pd


# Add ml directory to Python path
ML_DIR = Path(__file__).resolve().parents[1]
sys.path.append(str(ML_DIR))


from config import RISK_MODEL_FILE, RISK_FEATURES


def get_risk_factors(
    total_violations,
    critical_violations,
    unresolved_violations,
    compliance_score,
    recent_incidents
):
    """
    Identify the main factors contributing to mine risk.
    """

    factors = []

    if compliance_score < 50:
        factors.append("Very low compliance score")
    elif compliance_score < 70:
        factors.append("Low compliance score")

    if total_violations >= 10:
        factors.append("Very high number of violations")
    elif total_violations >= 7:
        factors.append("High number of violations")

    if critical_violations >= 3:
        factors.append("Multiple critical violations")
    elif critical_violations >= 1:
        factors.append("Critical violation detected")

    if unresolved_violations >= 5:
        factors.append("High number of unresolved violations")
    elif unresolved_violations >= 3:
        factors.append("Several unresolved violations")

    if recent_incidents >= 2:
        factors.append("Multiple recent safety incidents")
    elif recent_incidents == 1:
        factors.append("Recent safety incident detected")

    if not factors:
        factors.append("No major risk factors detected")

    return factors


def load_model():
    """
    Load the trained risk model.
    """

    if not RISK_MODEL_FILE.exists():
        raise FileNotFoundError(
            "Risk model not found. "
            "Train the risk model first."
        )

    saved_model = joblib.load(
        RISK_MODEL_FILE
    )

    return saved_model["model"]


def prepare_risk_features(df):
    """
    Create the features required by the risk model
    for one or many mine records.
    """

    df = df.copy()

    df["violation_rate"] = (
        df["total_violations"]
        / df["inspections_count"].replace(0, 1)
    )

    df["critical_violation_rate"] = (
        df["critical_violations"]
        / df["total_violations"].replace(0, 1)
    )

    df["unresolved_violation_rate"] = (
        df["unresolved_violations"]
        / df["total_violations"].replace(0, 1)
    )

    df["incident_indicator"] = (
        df["recent_incidents"] > 0
    ).astype(int)

    return df[RISK_FEATURES]


def predict_risk(
    inspections_count,
    total_violations,
    critical_violations,
    unresolved_violations,
    compliance_score,
    recent_incidents
):
    """
    Predict the risk level of one mine.
    """

    model = load_model()

    input_data = pd.DataFrame([{
        "inspections_count": inspections_count,
        "total_violations": total_violations,
        "critical_violations": critical_violations,
        "unresolved_violations": unresolved_violations,
        "compliance_score": compliance_score,
        "recent_incidents": recent_incidents
    }])

    features = prepare_risk_features(
        input_data
    )

    prediction = model.predict(
        features
    )[0]

    probabilities = model.predict_proba(
        features
    )[0]

    confidence = max(probabilities)

    risk_factors = get_risk_factors(
        total_violations,
        critical_violations,
        unresolved_violations,
        compliance_score,
        recent_incidents
    )

    return {
        "risk_level": prediction,
        "confidence": round(
            float(confidence),
            3
        ),
        "risk_factors": risk_factors
    }


def predict_risk_batch(df):
    """
    Predict risk for multiple mine records.

    Parameters:
        df: Pandas DataFrame containing raw mine data.

    Returns:
        DataFrame containing predictions and confidence.
    """

    required_columns = [
        "inspections_count",
        "total_violations",
        "critical_violations",
        "unresolved_violations",
        "compliance_score",
        "recent_incidents"
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

    features = prepare_risk_features(
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

    results["predicted_risk"] = predictions

    results["risk_confidence"] = [
        round(float(value), 3)
        for value in confidences
    ]

    return results


if __name__ == "__main__":

    result = predict_risk(
        inspections_count=15,
        total_violations=8,
        critical_violations=2,
        unresolved_violations=5,
        compliance_score=65,
        recent_incidents=1
    )

    print("\nMineXpert Risk Prediction")
    print("-------------------------")

    print(
        "Risk Level:",
        result["risk_level"]
    )

    print(
        "Confidence:",
        result["confidence"]
    )

    print("\nMain Risk Factors:")

    for factor in result["risk_factors"]:
        print("-", factor)