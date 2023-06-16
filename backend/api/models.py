from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.db import models
from django.conf import settings


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
    tier = models.CharField(max_length=10, default="iron")
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


class MProblemWorkbook(models.Model):
    problem = models.ForeignKey(Problem,on_delete=models.PROTECT)
    workbook = models.ForeignKey(Workbook, on_delete=models.PROTECT)


class MTeamUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    solved = models.IntegerField(default=0)
    is_leader = models.BooleanField(default=False)

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


class BOJ(models.Model):
    name = models.CharField(max_length=20)
    tier = models.CharField(max_length=10)
    solved_count = models.IntegerField()
    streak = models.IntegerField()
    rating = models.IntegerField()
    ranking = models.IntegerField()

class Solved(models.Model):
    boj = models.ForeignKey(BOJ, on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)

