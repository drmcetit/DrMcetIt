# Generated by Django 5.1.5 on 2025-04-08 05:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0021_eventshowcasemodel'),
    ]

    operations = [
        migrations.CreateModel(
            name='AssosationProgramModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('programType', models.CharField(max_length=50)),
                ('year', models.IntegerField()),
                ('count', models.IntegerField()),
            ],
        ),
    ]
