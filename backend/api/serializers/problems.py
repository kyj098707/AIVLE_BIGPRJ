from rest_framework import serializers
from ..models import Problem


class ProblemCreateSerializers(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = ["title", "number", "level", "type"]

