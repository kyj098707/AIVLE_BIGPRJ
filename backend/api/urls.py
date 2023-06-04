from django.urls import path
from .views import users,boards,teams

app_name = "api"
urlpatterns = [
    # users
    path('join/', users.join, name="join"),
    path('login/', users.LoginView.as_view(), name="login"),
    path('users/<int:pk>/rival/', users.handle_rival, name="handle_rival"),

    # boards
    path('boards/create/', boards.create_board, name="create_board"),
    path('boards/list/', boards.list_board, name="list_board"),
    path('boards/<int:pk>/', boards.detail_board, name="detail_board"),
    path('boards/<int:pk>/delete/', boards.delete_board, name="delete_board"),
    path('boards/<int:pk>/like/', boards.like_board, name="like_board"),
    path('boards/<int:pk>/comments/create/', boards.create_comment, name="create_comment"),
    path('boards/<int:pk>/comments/<int:comment_pk>/', boards.delete_comment, name="delete_comment"),

    # teams
    path('team/create/', teams.create_team, name="create_team"),
    path('team/<int:pk>/users/', teams.add_user_to_team, name="add_user_to_team"),

]
