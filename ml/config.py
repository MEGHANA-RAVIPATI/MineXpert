from pathlib import Path


# Root ML directory
ML_DIR = Path(__file__).resolve().parent


# Dataset directories
DATASET_DIR = ML_DIR / "dataset"
RAW_DATA_DIR = DATASET_DIR / "raw"
PROCESSED_DATA_DIR = DATASET_DIR / "processed"


# Model directory
MODEL_DIR = ML_DIR / "models"


# Model files
RISK_MODEL_FILE = MODEL_DIR / "risk_model.pkl"
SEVERITY_MODEL_FILE = MODEL_DIR / "severity_model.pkl"


# Risk model features
RISK_FEATURES = [
    "inspections_count",
    "total_violations",
    "critical_violations",
    "unresolved_violations",
    "compliance_score",
    "recent_incidents",
    "violation_rate",
    "critical_violation_rate",
    "unresolved_violation_rate",
    "incident_indicator"
]


# Create required directories
RAW_DATA_DIR.mkdir(parents=True, exist_ok=True)
PROCESSED_DATA_DIR.mkdir(parents=True, exist_ok=True)
MODEL_DIR.mkdir(parents=True, exist_ok=True)