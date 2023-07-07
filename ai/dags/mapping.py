from enum import unique
from sqlalchemy import Column, String
from database import Base

# recommend_general_problems table
class RecommendProblems(Base):
    __tablename__ = "recommend_problems"

    handle = Column(String(255), primary_key=True)
    rec_problems = Column(String(4294000000), unique=False, index=False, nullable=True)

    def __repr__(self):
        return f"recommend_general_problems('{self.handle}', '{self.rec_problems}')"


# recommend_rivals table
class RecommendRivals(Base):
    __tablename__ = "recommend_rivals"

    handle = Column(String(255), primary_key=True)
    rec_rivals = Column(String(4294000000), unique=False, nullable=True)

    def __repr__(self):
        return f"recommend_rivals('{self.handle}', '{self.rec_rivals}')"