# Generated by Django 4.2.1 on 2023-06-11 05:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_request_invite'),
    ]

    operations = [
        migrations.AddField(
            model_name='mteamuser',
            name='is_leader',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='mteamuser',
            name='solved',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='team',
            name='visibility',
            field=models.BooleanField(default=True),
        ),
    ]