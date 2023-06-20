from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.db import models, transaction
from django.conf import settings


class BOJ(models.Model):
    name = models.CharField(max_length=20)
    tier = models.CharField(max_length=10)
    solved_count = models.IntegerField()
    streak = models.IntegerField()
    rating = models.IntegerField()
    ranking = models.IntegerField()

# ===== User 정보
class UserManager(BaseUserManager):
    def create_user(self, username=None, email=None, password=None):
        # None 판별
        if any([rf is None for rf in [username, email, password]]):
            raise ValueError("required field is not filled")
        # 유저 등록
        user = self.model(
            username=username,
            email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username=None,email=None, password=None):
        email = username + "@naver.com"
        if any([rf is None for rf in [username, email, password]]):
            raise ValueError("superuser : required field is not filled")
        user = self.create_user(
            username=username,
            email=self.normalize_email(email),
            password=password
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.is_activate = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    username = models.CharField(max_length=10, unique=True)
    email = models.EmailField(unique=True)
    bio = models.TextField(default="")
    boj = models.ForeignKey(BOJ, on_delete=models.CASCADE,null=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()
    USERNAME_FIELD = "username"
    REQUIRED_FIELD = "email"

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True


class Rival(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE, related_name="challenger")
    rival = models.ForeignKey(User,on_delete=models.CASCADE, related_name="target")


# ===== Posting
class Board(models.Model):
    title = models.CharField(max_length=20)
    content = models.TextField()
    writer = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now=True)
    board = models.ForeignKey(Board, on_delete=models.CASCADE)


class BoardLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    board = models.ForeignKey(Board, on_delete=models.CASCADE)


# Problem
class Team(models.Model):
    name = models.CharField(max_length=20)
    leader = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField()
    num_members = models.IntegerField()
    visibility = models.BooleanField(default=True)


class Problem(models.Model):
    title = models.CharField(max_length=40)
    number = models.CharField(max_length=10)
    level = models.CharField(max_length=10)


class Workbook(models.Model):
    title = models.CharField(max_length=40, default="untitle")
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    count = models.IntegerField(default=0)

class MProblemWorkbook(models.Model):
    problem = models.ForeignKey(Problem,on_delete=models.PROTECT)
    workbook = models.ForeignKey(Workbook, on_delete=models.PROTECT)

class Solved(models.Model):
    boj = models.ForeignKey(BOJ, on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)



class MWorkbookUser(models.Model):
    workbook = models.ForeignKey(Workbook, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    count = models.IntegerField(default=0)

class MTeamUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    is_leader = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        with transaction.atomic():
            super().save(*args, **kwargs)  # 유저와 팀을 등록한 후에 팀에 속한 workbook과 연결
            # 속한 문제집을 찾고
            workbooks = Workbook.objects.filter(team=self.team)
            # 문제집들을 매핑하기 위해서 하나의 문제집을 순회
            for workbook in workbooks:
                # 문제집들에 속한 문제들을 하나씩 빼서
                mpu = MProblemWorkbook.objects.filter(workbook=workbook)
                cnt = 0
                # 몇개씩 맞췄는지 보자
                for e in mpu:
                    if Solved.objects.filter(boj=self.user.boj,problem=e.problem).exists():
                        cnt += 1
                MWorkbookUser.objects.create(workbook=workbook, user=self.user,count=cnt)
class Type(models.Model):
    name = models.CharField(max_length=20)


class MProblemType(models.Model):
    problem = models.ForeignKey(Problem, on_delete=models.PROTECT)
    type = models.ForeignKey(Type, on_delete=models.PROTECT)



class Invite(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Request(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)





