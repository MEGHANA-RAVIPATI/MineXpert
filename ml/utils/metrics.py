from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score
)


def calculate_metrics(actual, predicted):
    """
    Calculate classification metrics.

    Parameters:
        actual: Actual class labels
        predicted: Predicted class labels

    Returns:
        Dictionary containing accuracy,
        precision, recall, and F1 score.
    """

    return {
        "accuracy": round(
            accuracy_score(
                actual,
                predicted
            ),
            3
        ),

        "precision": round(
            precision_score(
                actual,
                predicted,
                average="weighted",
                zero_division=0
            ),
            3
        ),

        "recall": round(
            recall_score(
                actual,
                predicted,
                average="weighted",
                zero_division=0
            ),
            3
        ),

        "f1_score": round(
            f1_score(
                actual,
                predicted,
                average="weighted",
                zero_division=0
            ),
            3
        )
    }