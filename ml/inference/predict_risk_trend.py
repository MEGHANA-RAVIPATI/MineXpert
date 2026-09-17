def predict_risk_trend(
    current_risk,
    previous_risk,
    current_compliance,
    previous_compliance,
    current_violations,
    previous_violations
):
    """
    Estimate whether mine safety risk is improving,
    stable, or worsening based on recent history.
    """

    score = 0
    reasons = []

    # Compare risk levels
    risk_values = {
        "Low": 1,
        "Medium": 2,
        "High": 3
    }

    current = risk_values.get(current_risk.capitalize(), 0)
    previous = risk_values.get(previous_risk.capitalize(), 0)

    if current > previous:
        score += 40
        reasons.append("Risk level has increased")
    elif current < previous:
        score -= 30
        reasons.append("Risk level has decreased")

    # Compare compliance
    compliance_change = current_compliance - previous_compliance

    if compliance_change <= -10:
        score += 25
        reasons.append("Compliance score has decreased significantly")
    elif compliance_change < 0:
        score += 10
        reasons.append("Compliance score has decreased")
    elif compliance_change >= 10:
        score -= 20
        reasons.append("Compliance score has improved significantly")
    elif compliance_change > 0:
        score -= 10
        reasons.append("Compliance score has improved")

    # Compare violations
    violation_change = current_violations - previous_violations

    if violation_change >= 5:
        score += 25
        reasons.append("Number of violations has increased significantly")
    elif violation_change > 0:
        score += 10
        reasons.append("Number of violations has increased")
    elif violation_change <= -5:
        score -= 20
        reasons.append("Number of violations has decreased significantly")
    elif violation_change < 0:
        score -= 10
        reasons.append("Number of violations has decreased")

    # Determine trend
    if score >= 40:
        trend = "Worsening"
    elif score <= -20:
        trend = "Improving"
    else:
        trend = "Stable"

    if not reasons:
        reasons.append("No significant changes detected")

    return {
        "trend": trend,
        "trend_score": score,
        "reasons": reasons
    }


if __name__ == "__main__":

    result = predict_risk_trend(
        current_risk="High",
        previous_risk="Medium",
        current_compliance=55,
        previous_compliance=70,
        current_violations=12,
        previous_violations=7
    )

    print("\nMineXpert Risk Trend")
    print("--------------------")

    print("Trend:", result["trend"])
    print("Trend Score:", result["trend_score"])

    print("\nReasons:")

    for reason in result["reasons"]:
        print("-", reason)