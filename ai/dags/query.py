from sqlalchemy.orm import Session
from mapping import RecommendProblems, RecommendRivals

# recommend_problems table
def get_rec_problems_by_handle(db: Session, handle: str):
    return db.query(RecommendProblems).filter(RecommendProblems.handle == handle).first()

def update_rec_problems(db:Session, recommend_problems:RecommendProblems):
    db.query(RecommendProblems).filter(RecommendProblems.handle == recommend_problems.handle).update({
        column: getattr(recommend_problems, column) for column in RecommendProblems.__table__.columns.keys()
    })
    db.commit()

def insert_rec_problems(db:Session, recommend_problems:RecommendProblems):
    db.merge(recommend_problems)
    db.commit()

def delete_rec_problems(db:Session, handle: str):
    recommend_problems = db.query(RecommendProblems).filter(RecommendProblems.handle == handle).first()
    db.delete(recommend_problems)
    db.commit()


# recommend_rivals table
def get_rec_rivals_by_handle(db: Session, handle: str):
    return db.query(RecommendRivals).filter(RecommendRivals.handle == handle).first()

def update_rec_rivals(db:Session, recommend_rivals:RecommendRivals):
    db.query(RecommendRivals).filter(RecommendRivals.handle == recommend_rivals.handle).update({
        column: getattr(recommend_rivals, column) for column in RecommendRivals.__table__.columns.keys()
    })
    db.commit()

def insert_rec_rivals(db:Session, recommend_rivals:RecommendRivals):
    db.add(recommend_rivals)
    db.commit()

def delete_rec_rivals(db:Session, handle: str):
    recommend_rivals = db.query(RecommendRivals).filter(RecommendRivals.handle == handle).first()
    db.delete(recommend_rivals)
    db.commit()