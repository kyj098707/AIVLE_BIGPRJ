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
    rival = models.ForeignKey(settings.AUTH_USER_MODEL,null=True, on_delete=models.CASCADE)

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
