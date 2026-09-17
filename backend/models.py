from sqlalchemy import Column, Integer, String, Float, Date
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, default="Inspector")


class Mine(Base):
    __tablename__ = "mines"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    location = Column(String, nullable=False)
    owner = Column(String)
    status = Column(String, default="Active")


class Inspection(Base):
    __tablename__ = "inspections"

    id = Column(Integer, primary_key=True, index=True)
    mine_id = Column(Integer, nullable=False)
    inspector = Column(String, nullable=False)
    inspection_date = Column(String, nullable=False)
    status = Column(String, default="Pending")
    remarks = Column(String)


class Violation(Base):
    __tablename__ = "violations"

    id = Column(Integer, primary_key=True, index=True)
    inspection_id = Column(Integer, nullable=False)
    description = Column(String, nullable=False)
    severity = Column(String, default="Medium")
    status = Column(String, default="Open")


class CorrectiveAction(Base):
    __tablename__ = "corrective_actions"

    id = Column(Integer, primary_key=True, index=True)
    violation_id = Column(Integer, nullable=False)
    action = Column(String, nullable=False)
    responsible_person = Column(String)
    due_date = Column(String)
    status = Column(String, default="Pending")