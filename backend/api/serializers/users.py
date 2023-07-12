from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from datetime import datetime

User = get_user_model()


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['pk', 'email', 'username']
        

class JoinSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    def create(self, validated_data):
        user = User.objects.create_user(email=validated_data["email"],
                                        username=validated_data["username"],
                                        password=validated_data["password"],
                                        )
        user.bio = validated_data["bio"]
        user.save()
        return user

    class Meta:
        model = User
        fields = ['pk','email','username','password','bio']


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        try:
            data = super().validate(attrs)
            refresh = self.get_token(self.user)
            data['username'] = self.user.username
            data['id'] = self.user.id
            data['refresh'] = str(refresh)
            data['access'] = str(refresh.access_token)
            access_token_expire_at = datetime.fromtimestamp(refresh.access_token['exp'])
            data['exp'] = access_token_expire_at
            if self.user.is_active == False:
                data['response'] = 'activate_error'
            else:
                data['response'] = 'complete'
        except Exception as e:
            data['response'] = 'error'
        return data
