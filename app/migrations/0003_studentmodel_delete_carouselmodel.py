# Generated by Django 5.1.5 on 2025-03-26 08:44

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_alter_carouselmodel_titile_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='StudentModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.CharField(max_length=30, null=True)),
                ('Section', models.CharField(max_length=1, null=True)),
                ('Leetcode', models.URLField(null=True)),
                ('Github', models.URLField(null=True)),
                ('Linkedin', models.URLField(null=True)),
                ('HackerRank', models.URLField(null=True)),
                ('User', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.DeleteModel(
            name='carouselModel',
        ),
    ]
