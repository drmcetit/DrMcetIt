# Generated by Django 5.1.5 on 2025-04-03 06:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0019_rename_objective_objectivemodel'),
    ]

    operations = [
        migrations.AlterField(
            model_name='objectivemodel',
            name='POId',
            field=models.CharField(max_length=10, unique=True),
        ),
    ]
