from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from ..serializers.boards import BoardCreateSerializers,CommentCreateSerializers
from rest_framework.permissions import IsAuthenticated

from ..models import Board

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def create_board(request):
    writer = request.user
    serializer = BoardCreateSerializers(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save(writer=writer)

    return Response(serializer.data)


@permission_classes([IsAuthenticated])
@api_view(['POST'])
def create_comment(request,pk):
    board = get_object_or_404(Board, id=pk)
    user = request.user
    serializer = CommentCreateSerializers(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save(board=board, user=user)

    return Response(serializer.data)


@permission_classes([IsAuthenticated])
@api_view(['POST'])
def delete_comment(request,pk):
    board = get_object_or_404(Board, id=pk)
    user = request.user
    serializer = CommentCreateSerializers(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save(board=board, user=user)

    return Response(serializer.data)


