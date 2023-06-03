from django.urls import path
from .views import users,boards

app_name = "api"
urlpatterns = [
    # users
    path('join/', users.join, name="join"),
    path('login/', users.LoginView.as_view(), name="login"),

    # boards
    path('boards/create/', boards.create_board, name="create_board"),
    path('boards/<int:pk>/comments/create/', boards.create_comment, name="create_comment"),
    path('boards/<int:pk>/comments/delete/', boards.delete_comment, name="delete_comment"),

]
