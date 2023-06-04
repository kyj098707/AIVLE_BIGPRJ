from rest_framework import serializers
from ..models import Team


class TeamCreateSerializers(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ["name", "num_members", "description"]

