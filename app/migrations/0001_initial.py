# Generated by Django 5.1.5 on 2025-03-23 09:15

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AssosiationMembersModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.CharField(max_length=30)),
                ('Desigination', models.CharField(max_length=30)),
                ('Year', models.CharField(max_length=10)),
                ('ProfilePic', models.ImageField(upload_to='Assosiation Members')),
            ],
        ),
        migrations.CreateModel(
            name='carouselModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Titile', models.CharField(max_length=50)),
                ('Description', models.TextField()),
                ('ButtonText', models.CharField(max_length=30)),
                ('Image', models.ImageField(upload_to='carousel')),
                ('Display', models.BooleanField(default=True)),
                ('Date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='PlacementModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.CharField(max_length=30)),
                ('Batch', models.CharField(max_length=10)),
                ('Placed', models.BooleanField(default=True)),
                ('Desigination', models.CharField(max_length=30)),
                ('LPA', models.PositiveIntegerField()),
                ('StartUp', models.BooleanField(default=False)),
                ('Company', models.IntegerField(max_length=30)),
                ('ProfilePic', models.ImageField(upload_to='Placement profile')),
                ('Placedon', models.DateField(null=True)),
            ],
        ),
    ]
