from django.contrib import admin
from django.contrib.auth import get_user_model

from .models import Board

User = get_user_model()


@admin.register(User)
class User(admin.ModelAdmin):
    pass


@admin.register(Board)
class Board(admin.ModelAdmin):
    pass