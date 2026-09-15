from collections import Counter


def detect_repeated_violations(violations):
    """
    Detect repeated violation types.

    Parameters:
        violations: list of violation names

    Returns:
        Dictionary containing repeated violations
        and their occurrence counts.
    """

    if not violations:
        return {
            "repeated_violations": [],
            "message": "No violations found."
        }

    # Normalize violation names
    normalized_violations = [
        str(violation).strip().lower()
        for violation in violations
    ]

    counts = Counter(normalized_violations)

    repeated = []

    for violation, count in counts.items():

        if count > 1:
            repeated.append({
                "violation": violation,
                "occurrences": count
            })

    # Sort by number of occurrences
    repeated.sort(
        key=lambda item: item["occurrences"],
        reverse=True
    )

    if not repeated:
        message = "No repeated violations detected."
    else:
        message = (
            f"{len(repeated)} repeated violation type(s) detected."
        )

    return {
        "repeated_violations": repeated,
        "message": message
    }


if __name__ == "__main__":

    sample_violations = [
        "Improper ventilation",
        "Missing safety equipment",
        "Improper ventilation",
        "Unauthorized entry",
        "Missing safety equipment",
        "Improper ventilation"
    ]

    result = detect_repeated_violations(sample_violations)

    print("\nMineXpert Repeated Violation Detection")
    print("--------------------------------------")

    print(result["message"])

    for violation in result["repeated_violations"]:
        print(
            f"- {violation['violation']}: "
            f"{violation['occurrences']} occurrences"
        )