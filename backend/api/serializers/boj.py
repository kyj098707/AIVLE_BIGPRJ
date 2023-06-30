from django.contrib.auth import get_user_model
from rest_framework import serializers
from ..models import RecRival

class RecRivalSerializers(serializers.ModelSerializer):
    class Meta:
        model = RecRival
        exclude = ["follower"]