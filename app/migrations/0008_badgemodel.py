# Generated by Django 5.1.5 on 2025-03-27 06:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_rename_status_eventmodel_place_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='BadgeModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Title', models.CharField(max_length=30)),
                ('Description', models.TextField()),
                ('Category', models.CharField(max_length=15)),
                ('Count', models.PositiveIntegerField()),
                ('Image', models.ImageField(upload_to='Badges')),
            ],
        ),
    ]
