def predict_inspection_priority(
    risk_level,
    unresolved_violations,
    critical_violations,
    recent_incidents,
    compliance_score
):
    """
    Determine how urgently a mine should be inspected.

    Returns:
        Priority level, priority score, and reasons.
    """

    score = 0
    reasons = []

    # Risk level
    risk_points = {
        "Low": 0,
        "Medium": 20,
        "High": 40
    }

    risk = risk_level.capitalize()

    score += risk_points.get(risk, 0)

    if risk == "High":
        reasons.append("Mine has a high overall risk level")
    elif risk == "Medium":
        reasons.append("Mine has a medium overall risk level")

    # Unresolved violations
    if unresolved_violations >= 5:
        score += 20
        reasons.append("High number of unresolved violations")
    elif unresolved_violations >= 3:
        score += 10
        reasons.append("Several unresolved violations")

    # Critical violations
    if critical_violations >= 3:
        score += 20
        reasons.append("Multiple critical violations")
    elif critical_violations >= 1:
        score += 10
        reasons.append("Critical violation detected")

    # Recent incidents
    if recent_incidents >= 2:
        score += 15
        reasons.append("Multiple recent safety incidents")
    elif recent_incidents == 1:
        score += 8
        reasons.append("Recent safety incident detected")

    # Compliance score
    if compliance_score < 50:
        score += 15
        reasons.append("Very low compliance score")
    elif compliance_score < 70:
        score += 10
        reasons.append("Low compliance score")

    # Limit score to 100
    score = min(score, 100)

    # Determine priority
    if score >= 70:
        priority = "Urgent"
    elif score >= 40:
        priority = "High"
    elif score >= 20:
        priority = "Medium"
    else:
        priority = "Low"

    if not reasons:
        reasons.append("No major inspection risk factors detected")

    return {
        "priority": priority,
        "priority_score": score,
        "reasons": reasons
    }


if __name__ == "__main__":

    result = predict_inspection_priority(
        risk_level="High",
        unresolved_violations=8,
        critical_violations=3,
        recent_incidents=2,
        compliance_score=48
    )

    print("\nMineXpert Inspection Priority")
    print("-----------------------------")

    print("Priority:", result["priority"])
    print("Priority Score:", result["priority_score"])

    print("\nReasons:")

    for reason in result["reasons"]:
        print("-", reason)