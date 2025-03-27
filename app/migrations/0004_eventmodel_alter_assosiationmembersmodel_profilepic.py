# Generated by Django 5.1.5 on 2025-03-26 23:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_studentmodel_delete_carouselmodel'),
    ]

    operations = [
        migrations.CreateModel(
            name='EventModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('department', models.CharField(default='IT', max_length=5)),
                ('year', models.CharField(max_length=10)),
                ('student', models.CharField(max_length=30)),
                ('rollNo', models.CharField(max_length=25)),
                ('level', models.CharField(max_length=50)),
                ('event', models.CharField(max_length=75)),
                ('type', models.CharField(max_length=30)),
                ('mode', models.CharField(max_length=25)),
                ('category', models.CharField(max_length=25)),
                ('status', models.CharField(max_length=50)),
                ('date', models.DateField(null=True)),
                ('organizer', models.CharField(max_length=75)),
                ('club', models.CharField(blank=True, max_length=75, null=True)),
                ('award', models.CharField(max_length=30, null=True)),
                ('teamInd', models.CharField(max_length=10)),
                ('description', models.TextField(blank=True, null=True)),
                ('proofAttachment', models.FileField(null=True, upload_to='Certificates')),
            ],
        ),
        migrations.AlterField(
            model_name='assosiationmembersmodel',
            name='ProfilePic',
            field=models.ImageField(null=True, upload_to='Assosiation Members'),
        ),
    ]
