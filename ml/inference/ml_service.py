import pandas as pd

from predict_risk import predict_risk
from predict_risk import predict_risk_batch

from predict_severity import predict_severity
from predict_severity import predict_severity_batch

from detect_repeated_violations import detect_repeated_violations
from predict_inspection_priority import predict_inspection_priority
from predict_risk_trend import predict_risk_trend
from generate_recommendations import generate_recommendations


def analyze_mine(
    inspections_count,
    total_violations,
    critical_violations,
    unresolved_violations,
    compliance_score,
    recent_incidents,
    previous_risk="Medium",
    previous_compliance=None,
    previous_violations=None,
    violations=None,
    safety_impact=None,
    repeat_violation=0
):
    """
    Run complete ML analysis for one mine.
    """

    # Risk prediction
    risk_result = predict_risk(
        inspections_count=inspections_count,
        total_violations=total_violations,
        critical_violations=critical_violations,
        unresolved_violations=unresolved_violations,
        compliance_score=compliance_score,
        recent_incidents=recent_incidents
    )

    current_risk = risk_result["risk_level"]

    # Violation severity
    severity_result = None

    if safety_impact is not None:
        severity_result = predict_severity(
            safety_impact=safety_impact,
            repeat_violation=repeat_violation
        )

    # Inspection priority
    priority_result = predict_inspection_priority(
        risk_level=current_risk,
        unresolved_violations=unresolved_violations,
        critical_violations=critical_violations,
        recent_incidents=recent_incidents,
        compliance_score=compliance_score
    )

    # Previous values
    if previous_compliance is None:
        previous_compliance = compliance_score

    if previous_violations is None:
        previous_violations = total_violations

    # Risk trend
    trend_result = predict_risk_trend(
        current_risk=current_risk,
        previous_risk=previous_risk,
        current_compliance=compliance_score,
        previous_compliance=previous_compliance,
        current_violations=total_violations,
        previous_violations=previous_violations
    )

    # Repeated violations
    if violations is None:
        violations = []

    repeated_result = detect_repeated_violations(
        violations
    )

    # Recommendations
    recommendations = generate_recommendations(
        risk_level=current_risk,
        compliance_score=compliance_score,
        total_violations=total_violations,
        critical_violations=critical_violations,
        unresolved_violations=unresolved_violations,
        recent_incidents=recent_incidents
    )

    return {
        "risk_prediction": risk_result,
        "severity_prediction": severity_result,
        "inspection_priority": priority_result,
        "risk_trend": trend_result,
        "repeated_violations": repeated_result,
        "recommendations": recommendations
    }


def analyze_dataset(df):
    """
    Process multiple mine/violation records.

    The dataset must contain the fields required
    by the risk and severity models.

    Returns:
        DataFrame containing ML predictions.
    """

    if not isinstance(df, pd.DataFrame):
        raise TypeError(
            "Input must be a pandas DataFrame."
        )

    if df.empty:
        raise ValueError(
            "Input dataset is empty."
        )

    # --------------------------------
    # Risk predictions
    # --------------------------------

    risk_results = predict_risk_batch(
        df
    )

    # --------------------------------
    # Severity predictions
    # --------------------------------

    if {
        "safety_impact",
        "repeat_violation"
    }.issubset(df.columns):

        severity_results = predict_severity_batch(
            df
        )

        risk_results["predicted_severity"] = (
            severity_results[
                "predicted_severity"
            ]
        )

        risk_results["severity_confidence"] = (
            severity_results[
                "severity_confidence"
            ]
        )

    return risk_results


if __name__ == "__main__":

    sample_data = pd.DataFrame([
        {
            "inspections_count": 15,
            "total_violations": 8,
            "critical_violations": 2,
            "unresolved_violations": 5,
            "compliance_score": 65,
            "recent_incidents": 1,
            "safety_impact": "high",
            "repeat_violation": 1
        },
        {
            "inspections_count": 10,
            "total_violations": 2,
            "critical_violations": 0,
            "unresolved_violations": 1,
            "compliance_score": 92,
            "recent_incidents": 0,
            "safety_impact": "low",
            "repeat_violation": 0
        }
    ])

    results = analyze_dataset(
        sample_data
    )

    print("\nMineXpert Batch ML Analysis")
    print("===========================")

    print(results)