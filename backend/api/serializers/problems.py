from django.contrib.auth import get_user_model
from rest_framework import serializers
from ..models import Problem, Rec
from ..serializers.users import UserSerializers

User = get_user_model()

TIER_MAP = {"31":"Master",
        "1":"Bronze V","2":"Bronze IV","3":"Bronze III","4":"Bronze II","5":"Bronze I",
        "6":"Silver V","7":"Silver IV","8":"Silver III","9":"Silver II","10":"Silver I",
        "11":"Gold V", "12":"Gold IV", "13":"Gold III", "14":"Gold II", "15":"Gold I",
        "16":"Platinum V", "17":"Platinum IV", "18":"Platinum III", "19":"Platinum II", "20":"Platinum I",
        "21":"Diamond V", "22":"Diamond IV", "23":"Diamond III", "24":"Diamond II", "25":"Diamond I",
        "26":"Ruby V", "27":"Ruby IV", "28" :"Ruby III", "29": "Ruby II", "30" : "Ruby I","0":"UnRating"}


class ProblemSerializers(serializers.ModelSerializer):
    tier = serializers.SerializerMethodField()
    type_list = serializers.SerializerMethodField()
    first_type = serializers.SerializerMethodField()
    class Meta:
        model = Problem
        fields = ["id","title","number","tier","level","userCount","avgTries","first_type","type_list"]
    
    def get_tier(self,obj):
        return TIER_MAP[obj.level]

    def get_type_list(self,obj):
        return obj.type[:-1].split("/") if obj.type else ["유형 없음"]

    def get_first_type(self,obj):
        return obj.type[:-1].split("/")[0] if obj.type else "유형 없음"


class SimpleProblemList(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = ["id", "title"]


class RecSerializers(serializers.ModelSerializer):
    problem = ProblemSerializers()

    class Meta:
        model = Rec
        fields = ["problem"]

class RecProblemPageSerializers(serializers.ModelSerializer):
    rec = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["rec"]
    
    def get_rec(self,obj):
        rec = Rec.objects.filter(boj=obj.boj)[:5]
        serializers = RecSerializers(rec,many=True)
        return serializers.data


class RecProblemSerializers(serializers.ModelSerializer):
    rec = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["rec"]

    def get_rec(self, obj):
        rec = Rec.objects.filter(boj=obj.boj)
        serializers = RecSerializers(rec, many=True)
        return serializers.data