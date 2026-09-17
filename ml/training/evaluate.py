import sys
from pathlib import Path

import joblib
import pandas as pd

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score
)


# Add ml directory to Python path
ML_DIR = Path(__file__).resolve().parents[1]
sys.path.append(str(ML_DIR))


from config import (
    PROCESSED_DATA_DIR,
    RISK_MODEL_FILE,
    RISK_FEATURES
)


DATA_FILE = PROCESSED_DATA_DIR / "risk_dataset.csv"


def evaluate_model():
    """
    Evaluate the trained MineXpert risk model.
    """

    if not DATA_FILE.exists():
        raise FileNotFoundError(
            "Processed dataset not found. "
            "Run preprocess.py first."
        )

    if not RISK_MODEL_FILE.exists():
        raise FileNotFoundError(
            "Risk model not found. "
            "Train the risk model first."
        )

    df = pd.read_csv(DATA_FILE)

    saved_model = joblib.load(
        RISK_MODEL_FILE
    )

    model = saved_model["model"]

    X = df[RISK_FEATURES]
    y = df["risk_level"]

    predictions = model.predict(X)

    accuracy = accuracy_score(
        y,
        predictions
    )

    precision = precision_score(
        y,
        predictions,
        average="weighted",
        zero_division=0
    )

    recall = recall_score(
        y,
        predictions,
        average="weighted",
        zero_division=0
    )

    f1 = f1_score(
        y,
        predictions,
        average="weighted",
        zero_division=0
    )

    print("\nMineXpert Risk Model Evaluation")
    print("--------------------------------")

    print(
        "Accuracy :",
        round(accuracy, 3)
    )

    print(
        "Precision:",
        round(precision, 3)
    )

    print(
        "Recall   :",
        round(recall, 3)
    )

    print(
        "F1 Score :",
        round(f1, 3)
    )

    print("\nImportant:")
    print(
        "These metrics are based on the current demo dataset."
    )

    print(
        "Real-world performance must be measured using "
        "real mining data and unseen test data."
    )


if __name__ == "__main__":
    evaluate_model()