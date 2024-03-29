import re

from django.db.models import F
from django.http import JsonResponse, HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from ..models import Board, Comment, BoardLike, Problem
from ..serializers.boards import ( BoardCreateSerializers,
                                   BoardListSerializers,
                                   CommentCreateSerializers,
                                   CommentListSerializers,
                                CommentSerializers,
                                   BoardDetailSerializers )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_board(request):
    writer = request.user
    if request.data["title"] == "":
        return Response({'result': 'error', "msg": "제목은 필수 항목입니다."})
    real_content = re.sub('[^0-9가-힣]',"",request.data["content"])
    if real_content == "":
        return Response({'result': 'error', "msg": "올바른 내용을 작성해주세요."})
    serializer = BoardCreateSerializers(data=request.data)
    if Problem.objects.filter(number=request.data["problem_id"]).exists():
        problem = Problem.objects.filter(number=request.data["problem_id"])[0]
    else:
        return Response({'result':'error',"msg":"등록된 문제가 아닙니다."})
    serializer.is_valid(raise_exception=True)
    serializer.save(writer=writer, problem=problem)

    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_comment(request,pk):
    board = get_object_or_404(Board, id=pk)
    user = request.user
    serializer = CommentCreateSerializers(data=request.data)
    serializer.is_valid(raise_exception=True)
    comment = serializer.save(board=board, user=user)
    s = CommentSerializers(comment)

    return Response(s.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_board(request):
    boards = Board.objects.order_by("-created_at")
    list_serializer = BoardListSerializers(boards, many=True)
    return Response(list_serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_board(request, pk):

    boards = get_object_or_404(Board, pk=pk)
    if boards.writer != request.user:
        return Response({'result': 'error', "msg": "잘못된 접근입니다."})
    if request.data["title"] == "":
        return Response({'result': 'error', "msg": "제목은 필수 항목입니다."})
    real_content = re.sub('[^0-9가-힣]',"",request.data["content"])
    if real_content == "":
        return Response({'result': 'error', "msg": "올바른 내용을 작성해주세요."})
    serializer = BoardCreateSerializers(data=request.data)
    if Problem.objects.filter(number=request.data["problem_id"]).exists():
        problem = Problem.objects.filter(number=request.data["problem_id"])[0]
    else:
        return Response({'result':'error',"msg":"등록된 문제가 아닙니다."})
    boards.problem = problem
    boards.title = request.data["title"]
    boards.content = request.data["content"]
    boards.save()

    return Response(status=201)




@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_board(request,pk):
    board = get_object_or_404(Board,id=pk)

    if board.writer.id != request.user.id:
        return HttpResponse(status=401)
    board.delete()
    boards = Board.objects.order_by("-created_at")
    list_serializer = BoardListSerializers(boards, many=True)
    return Response(list_serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_comment(request,pk,comment_pk):
    comment = get_object_or_404(Comment,id=comment_pk)
    board = get_object_or_404(Board,id=pk)
    if comment.user.id != request.user.id:
        return HttpResponse(status=401)
    comment.delete()
    comment = Comment.objects.filter(board=board).order_by("created_at")
    list_serializer = CommentListSerializers(comment, many=True)
    return Response(list_serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def detail_board(request,pk):
    board = get_object_or_404(Board, id=pk)
    board.watching += 1
    board.save()
    serializer = BoardDetailSerializers(board)
    return JsonResponse({"pk":request.user.pk,**serializer.data})



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_board(request,pk):
    user = request.user
    board = get_object_or_404(Board, id=pk)
    if not BoardLike.objects.filter(user=user, board=board).exists():
        BoardLike.objects.create(user=user, board=board)
    else:
        like = BoardLike.objects.get(user=user, board=board)
        like.delete()
    serializer = BoardDetailSerializers(board)
    return Response(serializer.data)
