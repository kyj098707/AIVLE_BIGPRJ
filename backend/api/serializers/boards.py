from django.contrib.auth import get_user_model
from rest_framework import serializers
from ..models import Board,Comment,BoardLike
from .users import UserSerializers

User = get_user_model()


class BoardCreateSerializers(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ["title", "content"]

class CommentListSerializers(serializers.ModelSerializer):
    user = UserSerializers()
    class Meta:
        model = Comment
        fields = ["id","content", "user", "created_at"]

class BoardDetailSerializers(serializers.ModelSerializer):
    num_like = serializers.SerializerMethodField()
    num_comment = serializers.SerializerMethodField()
    comment = serializers.SerializerMethodField()
    writer = UserSerializers()
    class Meta:
        model = Board
        fields = ["id","title", "content","writer","created_at","num_like","num_comment","comment"]

    def get_num_like(self,board):
        likes = BoardLike.objects.filter(board=board)
        return len(likes)

    def get_num_comment(self,board):
        comments = Comment.objects.filter(board=board)
        return len(comments)

    def get_comment(self, board):
        comments = Comment.objects.filter(board=board)
        serializers = CommentListSerializers(comments, many=True)
        return serializers.data



class BoardListSerializers(serializers.ModelSerializer):
    num_like = serializers.SerializerMethodField()
    num_comment = serializers.SerializerMethodField()
    writer = UserSerializers()
    class Meta:
        model = Board
        fields = ["id","title", "content","writer","created_at","num_like","num_comment"]

    def get_num_like(self,board):
        likes = BoardLike.objects.filter(board=board)
        return len(likes)

    def get_num_comment(self,board):
        comments = Comment.objects.filter(board=board)
        return len(comments)




class CommentCreateSerializers(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["content"]



class CommentSerializers(serializers.ModelSerializer):
    user = UserSerializers()
    class Meta:
        model = Comment
        fields = ["id","user","content","created_at"]
