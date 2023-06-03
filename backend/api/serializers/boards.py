from django.contrib.auth import get_user_model
from rest_framework import serializers
from ..models import Board,Comment

User = get_user_model()


class BoardCreateSerializers(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ["title", "content"]

class CommentCreateSerializers(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["content"]
