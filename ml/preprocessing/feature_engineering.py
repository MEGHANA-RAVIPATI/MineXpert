import pandas as pd


def create_risk_features(df):
    """
    Create features used for mine risk prediction.
    """

    df = df.copy()

    # Avoid division by zero
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

    # Indicates whether the mine had a recent incident
    df["incident_indicator"] = (
        df["recent_incidents"] > 0
    ).astype(int)

    return df


def create_severity_features(df):
    """
    Convert violation information into numerical features
    for severity prediction.
    """

    df = df.copy()

    df["safety_impact"] = df["safety_impact"].map({
        "low": 1,
        "medium": 2,
        "high": 3,
        "critical": 4
    })

    df["repeat_violation"] = df["repeat_violation"].astype(int)

    return df