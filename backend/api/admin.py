from django.contrib import admin
from django.contrib.auth import get_user_model

from .models import Board, Rival, Team, MTeamUser, Problem, Type, MProblemType, Request, Invite

User = get_user_model()


@admin.register(User)
class User(admin.ModelAdmin):
    pass


@admin.register(Board)
class Board(admin.ModelAdmin):
    pass


@admin.register(Rival)
class Rival(admin.ModelAdmin):
    pass

@admin.register(Team)
class Team(admin.ModelAdmin):
    pass

@admin.register(MTeamUser)
class MTeamUser(admin.ModelAdmin):
    pass

@admin.register(Problem)
class Problem(admin.ModelAdmin):
    pass

@admin.register(Type)
class Type(admin.ModelAdmin):
    pass

@admin.register(MProblemType)
class MProblemType(admin.ModelAdmin):
    pass

@admin.register(Request)
class Request(admin.ModelAdmin):
    pass

@admin.register(Invite)
class Invite(admin.ModelAdmin):
    pass