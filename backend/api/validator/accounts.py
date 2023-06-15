from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import MinimumLengthValidator, CommonPasswordValidator, NumericPasswordValidator
from django.core.validators  import validate_email

User = get_user_model()

class MyMinimumLengthValidator(MinimumLengthValidator):
    def validate(self, password, user=None):
        # self.min_length == 8
        if len(password) < self.min_length:
            return False
        return True


class MyCommonPasswordValidator(CommonPasswordValidator):
    # 흔한 패스위드 탐지
    def validate(self, password, user=None):
        if password.lower().strip() in self.passwords:
            return False
        return True


class MyNumericPasswordValidator(NumericPasswordValidator):
    # 숫자로만 구성 됐는지 체크
    def validate(self, password, user=None):
        if password.isdigit():
            return False
        return True


class EmailNicknameValidator:
    def __init__(self, email, nickname):
        self.email = email
        self.nickname = nickname
    def email_format(self):
        try:
            validate_email(self.email)
            return True
        except:
            return False
    def email_duplication(self):
        if User.objects.filter(email=self.email).exists():
            return False
        return True
    def nickname_format(self):
        if len(self.nickname) > 2:
            return True
        return False
    def nickname_duplication(self):
        if User.objects.filter(username=self.nickname).exists():
            return False
        return True

