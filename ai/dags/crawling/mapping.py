from enum import unique
from sqlalchemy import Boolean, Column, Integer, String
from crawling.database import Base

# problems table
class Problems(Base):
    __tablename__ = "problems"

    problemId = Column(Integer, primary_key=True, unique=True, index=True)
    titleKo = Column(String(4294000000), unique=False, index=False, nullable=True)
    tags = Column(String(4294000000), unique=False, index=False, nullable=True)
    isSolvable = Column(Boolean, unique=False, index=False)
    acceptedUserCount = Column(Integer, unique=False, index=False)
    level = Column(Integer, unique=False, index=False)
    averageTries = Column(Integer, unique=False, index=False)
    official = Column(Boolean, unique=False, index=False)
    tags_ko = Column(String(4294000000), unique=False, index=False, nullable=True)
    def __repr__(self):
        return f"problems('{self.problemId}', '{self.titleKo}', '{self.tags}'," \
               f"'{self.isSolvable}', '{self.acceptedUserCount}', '{self.level}', '{self.averageTries}'," \
               f"'{self.official}', '{self.tags_ko}')"

# solved_problems table
class ProblemsSolved(Base):
    __tablename__ = "solved_problems"

    handle = Column(String(255), primary_key=True, unique=True, index=True)
    solved_problem = Column(String(4294000000), unique=False, index=False, nullable=True)

    def __repr__(self):
        return f"problems_solved('{self.handle}', '{self.solved_problem}')"

# updated_users table
class UsersUpdated(Base):
    __tablename__ = "updated_users"

    handle = Column(String(255), primary_key=True, unique=True, index=True)
    updatedCount = Column(Integer, unique=False, index=False)

    def __repr__(self):
        return f"records_solved('{self.handle}', '{self.updatedCount}')"

# users table
class Users(Base):
    __tablename__ = "users"

    handle = Column(String(255), primary_key=True, unique=True, index=True)
    solvedCount = Column(Integer, unique=False, index=False)
    userClass = Column(Integer, unique=False, index=False)
    tier = Column(Integer, unique=False, index=False)
    rating = Column(Integer, unique=False, index=False)
    ratingByProblemsSum = Column(Integer, unique=False, index=False)
    ratingByClass = Column(Integer, unique=False, index=False)
    ratingBySolvedCount = Column(Integer, unique=False, index=False)
    rivalCount = Column(Integer, unique=False, index=False)
    reverseRivalCount = Column(Integer, unique=False, index=False)
    maxStreak = Column(Integer, unique=False, index=False)
    rank = Column(Integer, unique=False, index=False)
    

    def __repr__(self):
        return f"users('{self.handle}', '{self.solvedCount}', '{self.userClass}'," \
               f"'{self.tier}', '{self.rating}', '{self.ratingByProblemsSum}'" \
               f"'{self.ratingByClass}', '{self.ratingBySolvedCount}'" \
               f"'{self.rivalCount}', '{self.reverseRivalCount}', '{self.maxStreak}'," \
               f"'{self.rank}')"

