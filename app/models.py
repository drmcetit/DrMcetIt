from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError


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

class ClassModel(models.Model):
    year=models.IntegerField()
    section=models.CharField(max_length=1)
    rollNum=models.TextField()
    #Assign the empid for cc,mentor for easy retrival instead of foreign key
    CC=models.CharField(max_length=10)
    mentor1=models.CharField(max_length=10)
    mentor2=models.CharField(max_length=10,null=True,blank=True)
    mentor3=models.CharField(max_length=10,null=True,blank=True)

    def __str__(self):
        user=User.objects.get(username=self.CC)
        teacher=TeacherModel.objects.get(User=user)
        return f"{self.year}-{self.section}-{teacher.Name}"


class StudentModel(models.Model):
    #batch,email,phone num,address
    User=models.ForeignKey(User,on_delete=models.CASCADE)
    Name=models.CharField(max_length=30,null=True)
    RollNum=models.CharField(max_length=15,null=True)
    Section=models.CharField(max_length=1,null=True)
    cgpa=models.FloatField(null=True)
    Leetcode=models.URLField(null=True)
    Github=models.URLField(null=True)
    Linkedin=models.URLField(null=True)
    HackerRank=models.URLField(null=True)
    CC=models.CharField(max_length=30,null=True)
    Mentor=models.CharField(max_length=30,null=True)
    # CurrentArrear=models.IntegerField(null=True,default=0)
    #email=models.EmailField(null=True)
    phoneNum=models.CharField(max_length=13,null=True)
    bio=models.TextField(null=True)
    profilePic=models.ImageField(upload_to="ProfilePic",null=True,blank=True)
    batch=models.CharField(null=True,max_length=2)


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
    
class EventModel(models.Model):
    #For event submissions
    department=models.CharField(max_length=5,default='IT')
    year=models.CharField(max_length=10)
    student=models.CharField(max_length=30) #studentName
    rollNo=models.CharField(max_length=25)
    level=models.CharField(max_length=50)
    event=models.CharField(max_length=150)
    type=models.CharField(max_length=30)   #currilcular and co curri cular
    mode=models.CharField(max_length=25)
    category=models.CharField(max_length=25)
    place=models.CharField(max_length=50)
    date=models.DateTimeField(null=True)
    organizer=models.CharField(max_length=100)
    club=models.CharField(max_length=75,null=True,blank=True)
    
    teamInd=models.CharField(max_length=10)
    description=models.TextField(null=True,blank=True)
    proofAttachment=models.FileField(upload_to="Certificates",null=True,blank=True)

    def __str__(self):
        return f"{self.student}-{self.event}"

class BadgeModel(models.Model):
    Title=models.CharField(max_length=30)
    Description=models.TextField()
    Category=models.CharField(max_length=15)
    Count=models.PositiveIntegerField()
    Image=models.ImageField(upload_to="Badges")

    def __str__(self):
        return f"{self.Title}-{self.Category}"

class TeacherModel(models.Model):
    User=models.ForeignKey(User,on_delete=models.CASCADE)
    Name=models.CharField(max_length=30)
    designatin=models.CharField(max_length=50)
    mobileNo=models.CharField(max_length=15)
    #empNo=models.CharField(max_length=7)

    def __str__(self):
        return f"{self.User.username}-{self.Name}"