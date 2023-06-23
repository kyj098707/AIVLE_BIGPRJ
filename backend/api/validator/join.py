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


class EmailUsernameValidator:
    def __init__(self, email, username):
        self.email = email
        self.username = username
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
    def username_format(self):
        if len(self.username) > 2 and len(self.username) < 10:
            return True
        return False
    def username_duplication(self):
        if User.objects.filter(username=self.username).exists():
            return False
        return True

def signup_validate(username, password, email):
    """
    password validation
    - 8글자 이하, 단순, 문자 체크
    """

    response = {"message":"완료!","validation" : False}
    en_validator = EmailUsernameValidator(email=email, username=username)
    if not en_validator.username_duplication():
        response["message"] = "동일한 유저아이디가 존재합니다"
        return response
    elif not en_validator.email_duplication():
        response["message"] = '동일한 이메일이 존재합니다.'
        return response
    elif not en_validator.email_format():
        response["message"] = '올바른 이메일 형식이 아닙니다.'
        return response
    elif not en_validator.username_format():
        response["message"] = "유저 아이디는 2~9글자 내로 작성해주세요"
        return response
    elif not MyMinimumLengthValidator().validate(password):
        response["message"] = '8글자 이상의 비밀번호를 사용해주세요.'
        return response
    elif not MyCommonPasswordValidator().validate(password):
        response["message"] = '너무 단순한 비밀번호는 사용할 수 없습니다.'
        return response
    elif not MyNumericPasswordValidator().validate(password):
        response["message"] = '비밀번호에는 문자가 포함되어야 합니다'
        return response
    response["validation"] = True
    return response
