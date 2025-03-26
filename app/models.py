from django.db import models
from django.contrib.auth.models import User

# Create your models here.

# class carouselModel(models.Model):
#     Titile=models.CharField(max_length=75)
#     Description=models.TextField()
#     ButtonText=models.CharField(max_length=30)
#     Image=models.ImageField(upload_to="carousel")
#     Display=models.BooleanField(default=True)
#     Date=models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.Titile}-{self.Display }"

# class Class(models.Model):
#     Year=models.IntegerField()
#     YearCode=models.IntegerField()
#     Starting=models.IntegerField()
#     Ending=models.IntegerField()
#     Lateral=models.TextField(null=True)
#     out=models.TextField(null=True)

#     def __str__(self):
#         return f"{self.YearCode}"

class StudentModel(models.Model):
    User=models.ForeignKey(User,on_delete=models.CASCADE)
    Name=models.CharField(max_length=30,null=True)
    #Roll_num=models.CharField(max_length=15)
    Section=models.CharField(max_length=1,null=True)
    Leetcode=models.URLField(null=True)
    Github=models.URLField(null=True)
    Linkedin=models.URLField(null=True)
    HackerRank=models.URLField(null=True)

    def __str__(self):
        return f"{self.User.username}-{self.Name}"
    
class AssosiationMembersModel(models.Model):
    Name=models.CharField(max_length=30)
    Desigination=models.CharField(max_length=30)
    Year=models.CharField(max_length=10)
    ProfilePic=models.ImageField(upload_to="Assosiation Members",null=True)

    def __str__(self):
        return f"{self.Name}-{self.Desigination}"
    
class PlacementModel(models.Model):
    Name=models.CharField(max_length=30)
    Batch=models.CharField(max_length=10)
    Placed=models.BooleanField(default=True)
    Desigination=models.CharField(max_length=30)
    LPA=models.PositiveIntegerField(null=False)
    StartUp=models.BooleanField(default=False)
    Company=models.CharField(max_length=30)
    ProfilePic=models.ImageField(upload_to="Placement profile",null=True,blank=True)
    Placedon=models.DateField(null=True,blank=True)

    def __str__(self):
        return f"{self.Name}-{self.Batch}"
    