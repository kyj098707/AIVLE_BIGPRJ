from sqlalchemy.orm import Session
from mapping import RecommendProblems, RecommendRivals

# recommend_general_problems table
def get_rec_problems_by_handle(db: Session, handle: str):
    return db.query(RecommendProblems).filter(RecommendProblems.handle == handle).first()

def update_rec_problems(db:Session, rec_general_problems:RecommendProblems):
    db.query(RecommendProblems).filter(RecommendProblems.handle == rec_general_problems.handle).update({
        column: getattr(rec_general_problems, column) for column in RecommendProblems.__table__.columns.keys()
    })
    db.commit()

def insert_rec_problems(db:Session, rec_general_problems:RecommendProblems):
    db.merge(rec_general_problems)
    db.commit()

def delete_rec_problems(db:Session, handle: str):
    rec_general_problems = db.query(RecommendProblems).filter(RecommendProblems.handle == handle).first()
    db.delete(rec_general_problems)
    db.commit()


# recommend_rivals table
def get_rec_rivals_by_handle(db: Session, handle: str):
    return db.query(RecommendRivals).filter(RecommendRivals.handle == handle).first()

def update_rec_rivals(db:Session, rec_rivals:RecommendRivals):
    db.query(RecommendRivals).filter(RecommendRivals.handle == rec_rivals.handle).update({
        column: getattr(rec_rivals, column) for column in RecommendRivals.__table__.columns.keys()
    })
    db.commit()

def insert_rec_rivals(db:Session, rec_rivals:RecommendRivals):
    db.add(rec_rivals)
    db.commit()

def delete_rec_rivals(db:Session, handle: str):
    rec_rivals = db.query(RecommendRivals).filter(RecommendRivals.handle == handle).first()
    db.delete(rec_rivals)
    db.commit()