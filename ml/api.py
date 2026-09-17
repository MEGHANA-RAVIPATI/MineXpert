from pathlib import Path
import sys

from fastapi import FastAPI
from pydantic import BaseModel


# Add ML directories to Python path
ML_DIR = Path(__file__).resolve().parent
INFERENCE_DIR = ML_DIR / "inference"

sys.path.append(str(INFERENCE_DIR))


from ml_service import analyze_mine
from predict_severity import predict_severity


app = FastAPI(
    title="MineXpert ML API",
    description=(
        "AI/ML services for mining safety, "
        "risk and compliance"
    ),
    version="1.0.0"
)


# --------------------------------
# Mine Analysis Request
# --------------------------------

class MineData(BaseModel):
    inspections_count: int
    total_violations: int
    critical_violations: int
    unresolved_violations: int
    compliance_score: float
    recent_incidents: int

    previous_risk: str = "Medium"
    previous_compliance: float | None = None
    previous_violations: int | None = None

    violations: list[str] = []


# --------------------------------
# Violation Severity Request
# --------------------------------

class SeverityData(BaseModel):
    safety_impact: str
    repeat_violation: int


# --------------------------------
# Home Endpoint
# --------------------------------

@app.get("/")
def home():
    return {
        "message": "MineXpert ML API is running",
        "status": "active",
        "services": [
            "risk_prediction",
            "severity_prediction",
            "inspection_priority",
            "risk_trend",
            "repeated_violation_detection",
            "safety_recommendations"
        ]
    }


# --------------------------------
# Complete Mine Analysis
# --------------------------------

@app.post("/analyze")
def analyze(data: MineData):

    result = analyze_mine(
        inspections_count=data.inspections_count,
        total_violations=data.total_violations,
        critical_violations=data.critical_violations,
        unresolved_violations=data.unresolved_violations,
        compliance_score=data.compliance_score,
        recent_incidents=data.recent_incidents,
        previous_risk=data.previous_risk,
        previous_compliance=data.previous_compliance,
        previous_violations=data.previous_violations,
        violations=data.violations
    )

    return result


# --------------------------------
# Violation Severity Prediction
# --------------------------------

@app.post("/predict-severity")
def severity(data: SeverityData):

    result = predict_severity(
        safety_impact=data.safety_impact,
        repeat_violation=data.repeat_violation
    )

    return result