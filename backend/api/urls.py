from django.urls import path
from .views import users,boards

app_name = "api"
urlpatterns = [
    # users
    path('join/', users.join, name="join"),
    path('login/', users.LoginView.as_view(), name="login"),

    # boards
    path('boards/create/', boards.create, name="create_board"),


]
