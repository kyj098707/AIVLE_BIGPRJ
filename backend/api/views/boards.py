from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from ..serializers.boards import BoardsCreateSerializers
from rest_framework.permissions import IsAuthenticated


@permission_classes([IsAuthenticated])
@api_view(['POST'])
def create(request):
    writer = request.user
    serializer = BoardsCreateSerializers(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save(writer=writer)

    return Response(serializer.data)


@permission_classes([IsAuthenticated])
@