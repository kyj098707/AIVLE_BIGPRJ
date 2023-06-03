from django.contrib.auth import get_user_model
from rest_framework import serializers
from ..models import Board

User = get_user_model()


class BoardsCreateSerializers(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ["title", "content"]

