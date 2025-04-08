# Generated by Django 5.1.5 on 2025-04-08 08:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0026_alter_assosiationmembersmodel_desigination_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='AssossationFacultyModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=40)),
                ('desigination', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=254)),
                ('phoneNum', models.CharField(max_length=13)),
            ],
        ),
        migrations.AddField(
            model_name='assosiationmembersmodel',
            name='phoneNum',
            field=models.CharField(max_length=12, null=True),
        ),
    ]
