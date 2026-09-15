def generate_recommendations(
    risk_level,
    compliance_score,
    total_violations,
    critical_violations,
    unresolved_violations,
    recent_incidents
):
    """
    Generate safety and compliance recommendations
    based on the mine's current risk information.
    """

    recommendations = []

    # Overall risk
    if risk_level.lower() == "high":
        recommendations.append(
            "Schedule an immediate safety inspection."
        )

    elif risk_level.lower() == "medium":
        recommendations.append(
            "Schedule a follow-up inspection and monitor "
            "the mine more frequently."
        )

    else:
        recommendations.append(
            "Continue routine safety monitoring."
        )

    # Compliance
    if compliance_score < 50:
        recommendations.append(
            "Take immediate corrective action to improve "
            "the mine's compliance score."
        )

    elif compliance_score < 70:
        recommendations.append(
            "Review outstanding compliance issues and "
            "complete corrective actions."
        )

    # Critical violations
    if critical_violations >= 3:
        recommendations.append(
            "Prioritize all critical violations and "
            "verify corrective action immediately."
        )

    elif critical_violations > 0:
        recommendations.append(
            "Resolve critical violations as a priority."
        )

    # Unresolved violations
    if unresolved_violations >= 5:
        recommendations.append(
            "Clear the backlog of unresolved violations "
            "and verify closure through re-inspection."
        )

    elif unresolved_violations > 0:
        recommendations.append(
            "Track and close all outstanding violations."
        )

    # Total violations
    if total_violations >= 10:
        recommendations.append(
            "Conduct a detailed compliance review because "
            "of the high number of violations."
        )

    elif total_violations >= 5:
        recommendations.append(
            "Investigate recurring compliance problems."
        )

    # Recent incidents
    if recent_incidents >= 2:
        recommendations.append(
            "Investigate recent safety incidents and "
            "implement preventive measures."
        )

    elif recent_incidents == 1:
        recommendations.append(
            "Review the recent safety incident and "
            "verify that corrective action was completed."
        )

    # Default recommendation
    if not recommendations:
        recommendations.append(
            "Maintain current safety and compliance practices."
        )

    return recommendations


if __name__ == "__main__":

    result = generate_recommendations(
        risk_level="High",
        compliance_score=48,
        total_violations=12,
        critical_violations=3,
        unresolved_violations=8,
        recent_incidents=2
    )

    print("\nMineXpert Safety Recommendations")
    print("--------------------------------")

    for number, recommendation in enumerate(
        result,
        start=1
    ):
        print(f"{number}. {recommendation}")