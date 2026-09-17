from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

import models
from database import get_db

router = APIRouter(tags=["Mine Management", "Inspections", "Violations", "Corrective Actions"])


# =========================
# MINE SCHEMAS
# =========================

class MineRequest(BaseModel):
    name: str
    location: str
    owner: str = ""
    status: str = "Active"


# =========================
# INSPECTION SCHEMAS
# =========================

class InspectionRequest(BaseModel):
    mine_id: int
    inspector: str
    inspection_date: str
    status: str = "Pending"
    remarks: str = ""


# =========================
# VIOLATION SCHEMAS
# =========================

class ViolationRequest(BaseModel):
    inspection_id: int
    description: str
    severity: str = "Medium"
    status: str = "Open"


# =========================
# CORRECTIVE ACTION SCHEMAS
# =========================

class CorrectiveActionRequest(BaseModel):
    violation_id: int
    action: str
    responsible_person: str = ""
    due_date: str = ""
    status: str = "Pending"


# =====================================================
# MINE APIs
# =====================================================

@router.post("/mines")
def add_mine(data: MineRequest, db: Session = Depends(get_db)):
    mine = models.Mine(
        name=data.name,
        location=data.location,
        owner=data.owner,
        status=data.status
    )

    db.add(mine)
    db.commit()
    db.refresh(mine)

    return {
        "message": "Mine added successfully",
        "mine_id": mine.id
    }


@router.get("/mines")
def get_mines(db: Session = Depends(get_db)):
    return db.query(models.Mine).all()


@router.get("/mines/{mine_id}")
def get_mine(mine_id: int, db: Session = Depends(get_db)):
    mine = db.query(models.Mine).filter(
        models.Mine.id == mine_id
    ).first()

    if not mine:
        raise HTTPException(status_code=404, detail="Mine not found")

    return mine


@router.put("/mines/{mine_id}")
def update_mine(
    mine_id: int,
    data: MineRequest,
    db: Session = Depends(get_db)
):
    mine = db.query(models.Mine).filter(
        models.Mine.id == mine_id
    ).first()

    if not mine:
        raise HTTPException(status_code=404, detail="Mine not found")

    mine.name = data.name
    mine.location = data.location
    mine.owner = data.owner
    mine.status = data.status

    db.commit()

    return {"message": "Mine updated successfully"}


@router.delete("/mines/{mine_id}")
def delete_mine(mine_id: int, db: Session = Depends(get_db)):
    mine = db.query(models.Mine).filter(
        models.Mine.id == mine_id
    ).first()

    if not mine:
        raise HTTPException(status_code=404, detail="Mine not found")

    db.delete(mine)
    db.commit()

    return {"message": "Mine deleted successfully"}


# =====================================================
# INSPECTION APIs
# =====================================================

@router.post("/inspections")
def add_inspection(
    data: InspectionRequest,
    db: Session = Depends(get_db)
):
    inspection = models.Inspection(
        mine_id=data.mine_id,
        inspector=data.inspector,
        inspection_date=data.inspection_date,
        status=data.status,
        remarks=data.remarks
    )

    db.add(inspection)
    db.commit()
    db.refresh(inspection)

    return {
        "message": "Inspection added successfully",
        "inspection_id": inspection.id
    }


@router.get("/inspections")
def get_inspections(db: Session = Depends(get_db)):
    return db.query(models.Inspection).all()


@router.get("/inspections/{inspection_id}")
def get_inspection(
    inspection_id: int,
    db: Session = Depends(get_db)
):
    inspection = db.query(models.Inspection).filter(
        models.Inspection.id == inspection_id
    ).first()

    if not inspection:
        raise HTTPException(status_code=404, detail="Inspection not found")

    return inspection


# =====================================================
# VIOLATION APIs
# =====================================================

@router.post("/violations")
def add_violation(
    data: ViolationRequest,
    db: Session = Depends(get_db)
):
    violation = models.Violation(
        inspection_id=data.inspection_id,
        description=data.description,
        severity=data.severity,
        status=data.status
    )

    db.add(violation)
    db.commit()
    db.refresh(violation)

    return {
        "message": "Violation added successfully",
        "violation_id": violation.id
    }


@router.get("/violations")
def get_violations(db: Session = Depends(get_db)):
    return db.query(models.Violation).all()


@router.get("/violations/{violation_id}")
def get_violation(
    violation_id: int,
    db: Session = Depends(get_db)
):
    violation = db.query(models.Violation).filter(
        models.Violation.id == violation_id
    ).first()

    if not violation:
        raise HTTPException(status_code=404, detail="Violation not found")

    return violation


@router.put("/violations/{violation_id}")
def update_violation(
    violation_id: int,
    data: ViolationRequest,
    db: Session = Depends(get_db)
):
    violation = db.query(models.Violation).filter(
        models.Violation.id == violation_id
    ).first()

    if not violation:
        raise HTTPException(status_code=404, detail="Violation not found")

    violation.description = data.description
    violation.severity = data.severity
    violation.status = data.status

    db.commit()

    return {"message": "Violation updated successfully"}


# =====================================================
# CORRECTIVE ACTION APIs
# =====================================================

@router.post("/corrective-actions")
def add_corrective_action(
    data: CorrectiveActionRequest,
    db: Session = Depends(get_db)
):
    action = models.CorrectiveAction(
        violation_id=data.violation_id,
        action=data.action,
        responsible_person=data.responsible_person,
        due_date=data.due_date,
        status=data.status
    )

    db.add(action)
    db.commit()
    db.refresh(action)

    return {
        "message": "Corrective action added successfully",
        "corrective_action_id": action.id
    }


@router.get("/corrective-actions")
def get_corrective_actions(db: Session = Depends(get_db)):
    return db.query(models.CorrectiveAction).all()


@router.get("/corrective-actions/{action_id}")
def get_corrective_action(
    action_id: int,
    db: Session = Depends(get_db)
):
    action = db.query(models.CorrectiveAction).filter(
        models.CorrectiveAction.id == action_id
    ).first()

    if not action:
        raise HTTPException(
            status_code=404,
            detail="Corrective action not found"
        )

    return action


@router.put("/corrective-actions/{action_id}")
def update_corrective_action(
    action_id: int,
    data: CorrectiveActionRequest,
    db: Session = Depends(get_db)
):
    action = db.query(models.CorrectiveAction).filter(
        models.CorrectiveAction.id == action_id
    ).first()

    if not action:
        raise HTTPException(
            status_code=404,
            detail="Corrective action not found"
        )

    action.action = data.action
    action.responsible_person = data.responsible_person
    action.due_date = data.due_date
    action.status = data.status

    db.commit()

    return {"message": "Corrective action updated successfully"}