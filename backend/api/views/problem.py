from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ..models import Problem
from ..serializers.problems import (ProblemCreateSerializers,
                                    )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_problem(request):
    serializer = ProblemCreateSerializers(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()

    return Response(serializer.data)