# Generated by Django 5.1.5 on 2025-03-27 00:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_studentmodel_roll_num'),
    ]

    operations = [
        migrations.RenameField(
            model_name='studentmodel',
            old_name='Roll_num',
            new_name='RollNum',
        ),
    ]
