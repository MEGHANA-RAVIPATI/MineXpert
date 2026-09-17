import sys
from pathlib import Path

import joblib
import pandas as pd

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report


# Add ml directory to Python path
ML_DIR = Path(__file__).resolve().parents[1]
sys.path.append(str(ML_DIR))


from config import (
    PROCESSED_DATA_DIR,
    MODEL_DIR,
    RISK_FEATURES,
    RISK_MODEL_FILE
)


DATA_FILE = PROCESSED_DATA_DIR / "risk_dataset.csv"


def train_model():
    """
    Train the MineXpert mine risk classification model
    using the processed mining dataset.
    """

    # --------------------------------
    # 1. Check dataset
    # --------------------------------

    if not DATA_FILE.exists():
        raise FileNotFoundError(
            "Processed dataset not found. "
            "Run preprocess.py first."
        )

    # --------------------------------
    # 2. Load dataset
    # --------------------------------

    df = pd.read_csv(DATA_FILE)

    if df.empty:
        raise ValueError(
            "Processed dataset is empty."
        )

    # --------------------------------
    # 3. Validate features
    # --------------------------------

    missing_features = [
        feature
        for feature in RISK_FEATURES
        if feature not in df.columns
    ]

    if missing_features:
        raise ValueError(
            "Dataset is missing ML features: "
            + ", ".join(missing_features)
        )

    if "risk_level" not in df.columns:
        raise ValueError(
            "Dataset must contain the 'risk_level' target column."
        )

    # --------------------------------
    # 4. Prepare X and y
    # --------------------------------

    X = df[RISK_FEATURES]

    y = df["risk_level"].astype(str).str.strip().str.capitalize()

    # --------------------------------
    # 5. Train/test split
    # --------------------------------

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.20,
        random_state=42,
        stratify=y
    )

    # --------------------------------
    # 6. Create model
    # --------------------------------

    model = RandomForestClassifier(
        n_estimators=200,
        random_state=42,
        n_jobs=-1,
        class_weight="balanced"
    )

    # --------------------------------
    # 7. Train model
    # --------------------------------

    model.fit(
        X_train,
        y_train
    )

    # --------------------------------
    # 8. Evaluate on unseen test data
    # --------------------------------

    predictions = model.predict(
        X_test
    )

    accuracy = accuracy_score(
        y_test,
        predictions
    )

    print("\nMineXpert Risk Model")
    print("--------------------")

    print(
        "Training records:",
        len(X_train)
    )

    print(
        "Testing records:",
        len(X_test)
    )

    print(
        "Accuracy:",
        round(accuracy, 3)
    )

    print("\nClassification Report:")

    print(
        classification_report(
            y_test,
            predictions,
            zero_division=0
        )
    )

    # --------------------------------
    # 9. Feature importance
    # --------------------------------

    feature_importance = (
        pd.Series(
            model.feature_importances_,
            index=RISK_FEATURES
        )
        .sort_values(
            ascending=False
        )
    )

    print("\nTop Risk Factors:")

    for feature, importance in feature_importance.items():

        print(
            f"- {feature}: "
            f"{importance:.3f}"
        )

    # --------------------------------
    # 10. Save model
    # --------------------------------

    MODEL_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    joblib.dump(
        {
            "model": model,
            "features": RISK_FEATURES
        },
        RISK_MODEL_FILE
    )

    print("\nModel saved to:")
    print(RISK_MODEL_FILE)


if __name__ == "__main__":
    train_model()