from django.contrib.auth import get_user_model
from rest_framework import serializers
from ..models import RecRival, Rival, BOJ


class BOJSerializers(serializers.ModelSerializer):
    class Meta:
        model = BOJ
        fields = "__all__"


class RecRivalSerializers(serializers.ModelSerializer):
    class Meta:
        model = RecRival
        exclude = ["follower"]

class RivalSerializers(serializers.ModelSerializer):
    class Meta:
        model = Rival
        exclude = ["follower"]
