from django.urls import path
from .views import users,boards,teams,db

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
    path('team/<int:pk>/users/', teams.user_accept_invitation, name="user_accept_invitation"),
    path('team/<int:team_pk>/users/<int:user_pk>/', teams.team_accept_request, name="team_accept_request"),
    path('team/<int:team_pk>/users/<int:user_pk>/invite/', teams.invite, name="invite"),
    path('team/<int:team_pk>/users/req/', teams.req, name="request"),

    # db
    path('db/problems/', db.create_problem_db, name="create_problem_db"),

]
