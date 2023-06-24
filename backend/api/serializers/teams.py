from django.contrib.auth import get_user_model
from rest_framework import serializers
from ..models import Team, MTeamUser, Solved, Invite, Request, Problem, Workbook, MProblemWorkbook, MProblemType, Type, \
    BOJ,MWorkbookUser
from .users import UserSerializers

User = get_user_model()


TIER_MAP = {"31":"Master",
        "1":"Bronze V","2":"Bronze IV","3":"Bronze III","4":"Bronze II","5":"Bronze I",
        "6":"Silver V","7":"Silver IV","8":"Silver III","9":"Silver II","10":"Silver I",
        "11":"Gold V", "12":"Gold IV", "13":"Gold III", "14":"Gold II", "15":"Gold I",
        "16":"Platinum V", "17":"Platinum IV", "18":"Platinum III", "19":"Platinum II", "20":"Platinum I",
        "21":"Diamond V", "22":"Diamond IV", "23":"Diamond III", "24":"Diamond II", "25":"Diamond I",
        "26":"Ruby V", "27":"Ruby IV", "28" :"Ruby III", "29": "Ruby II", "30" : "Ruby I"}

class SolvedProblemSerializers(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = ["number"]


class SolvedSerializers(serializers.ModelSerializer):
    problem = SolvedProblemSerializers()
    class Meta:
        model = Solved
        fields = ["problem"]

class TeamCreateSerializers(serializers.ModelSerializer):
    result = serializers.SerializerMethodField()

    class Meta:
        model = Team
        fields = ["id","name", "num_members", "description","result"]

    def get_result(self,obj):
        return "complete"


# class LeaderSerializers(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields=["name"]

class TeamSerializers(serializers.ModelSerializer):
    leader = UserSerializers()
    class Meta:
        model = Team
        fields = ["id","name", "num_members", "description","leader"]


class TeamDetailSerializers(serializers.ModelSerializer):
    leader = UserSerializers()
    ranking = serializers.SerializerMethodField()

    class Meta:
        model = Team
        fields = ["id", "name", "num_members", "description", "leader","ranking"]

    def get_ranking(self, team):
        teams = Team.objects.all().order_by("id")

        return list(teams).index(team)


class MTeamUserSerializers(serializers.ModelSerializer):
    team = TeamSerializers()
    user = UserSerializers()
    class Meta:
        model = MTeamUser
        fields = ["team", "user"]

class BOJSerializers(serializers.ModelSerializer):
    class Meta:
        model = BOJ
        exclude = ["ranking"]
class AwardSerializers(serializers.ModelSerializer):
    user = UserSerializers()
    boj = serializers.SerializerMethodField()

    class Meta:
        model = MTeamUser
        fields = ["user", "boj"]

    def get_boj(self, obj):
        serializers = BOJSerializers(obj.user.boj)
        return serializers.data



class TeamUserSerializers(serializers.ModelSerializer):
    user = UserSerializers()
    position = serializers.SerializerMethodField()
    tier = serializers.SerializerMethodField()
    boj = serializers.SerializerMethodField()
    class Meta:
        model = MTeamUser
        fields = ["user","position","tier","boj"]

    def get_position(self,obj):
        return "King" if obj.is_leader else "Courtier"

    def get_tier(self,obj):
        return TIER_MAP[obj.user.boj.tier]

    def get_boj(self,obj):
        serializers = BOJSerializers(obj.user.boj)
        return serializers.data




class InviteSerializers(serializers.ModelSerializer):
    team = TeamSerializers()
    class Meta:
        model = Invite
        fields = ["team"]


class RequestSerializers(serializers.ModelSerializer):
    user = UserSerializers()
    class Meta:
        model = Request
        fields = ["user"]


class TypeSerializers(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = ["name"]


class TypeInProblemSerializers(serializers.ModelSerializer):
    type = TypeSerializers()
    class Meta:
        model = MProblemType
        fields = ["type"]

class ProblemSerializers(serializers.ModelSerializer):
    tier = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()
    class Meta:
        model = Problem
        fields = ["id","title","number","tier", "type"]

    def get_tier(self,obj):
        return TIER_MAP[obj.level]

    def get_type(self,obj):
        types = MProblemType.objects.filter(problem=obj)
        serializers = TypeInProblemSerializers(types, many=True)

        return serializers.data


class ProblemInWorkbookSerializers(serializers.ModelSerializer):
    problem = ProblemSerializers()
    class Meta:
        model = MProblemWorkbook
        fields = ["problem"]

class WorkbookSerializers(serializers.ModelSerializer):
    problem_list = serializers.SerializerMethodField()
    class Meta:
        model = Workbook
        fields = ["id","title","problem_list"]

    def get_problem_list(self,obj):
        problems = MProblemWorkbook.objects.filter(workbook=obj)
        serializers = ProblemInWorkbookSerializers(problems, many=True)
        return serializers.data

class AchievementSerializers(serializers.ModelSerializer):
    achievement = serializers.SerializerMethodField()
    user = UserSerializers()
    workbook = WorkbookSerializers()
    class Meta:
        model = MWorkbookUser
        fields = "__all__"

    def get_achievement(self,obj):
        return int(100 *obj.count/obj.workbook.count) if obj.workbook.count != 0 else 0



class ProblemTagSerializers(serializers.ModelSerializer):
    color = serializers.SerializerMethodField()
    url = serializers.SerializerMethodField()
    class Meta:
        model = Problem
        fields = ["id","title","number","color","url"]

    def get_color(self, obj):
        if int(obj.level) in [1,2,3,4,5]:
            return "#cc8e34"
        elif int(obj.level) in [6,7,8,9,10]:
            return "#c0c0c0"
        elif int(obj.level) in [11,12,13,14,15]:
            return "gold"
        elif int(obj.level) in [16,17,18,19,20]:
            return "cyan"
        elif int(obj.level) in [21,22,23,24,25]:
            return "geekblue"
        elif int(obj.level) in [26,27,28,29,30]:
            return "magenta"
        else:
            return "#000000"

    def get_url(self,obj):
        return f"https://www.acmicpc.net/problem/{obj.number}"

