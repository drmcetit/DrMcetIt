#Avoid using the complex concept for later easy understanding  
import json
from datetime import datetime

from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from django.contrib.auth import login 

from rest_framework import generics
from rest_framework import status
from rest_framework import views
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .models import AssosiationMembersModel,PlacementModel,StudentModel,EventModel,BadgeModel
from .serializers import AssositationSerializer,PlacmentSerializer,EventSerializer,StudentSerializer,BadgeSerializer

# Create your views here.

# class HomeView(views.APIView):
#     permission_classes=[]
#     authentication_classes=[]

#     def get(self,request):

#         #carousel display
#         qs=carouselModel.objects.exclude(Display=False).order_by('-Date')[:5]
#         carousel=carouselSerializer(qs,many=True).data

#         return JsonResponse({"carousel":carousel},status=status.HTTP_200_OK)

# HomeViewClass=HomeView.as_view()

def count(count,step):
    num=step
    if(count<step):
        return 0
    if(step==5):
        max=80
    else:
        max=15
    while(num<=count):
        num*=2
        if(num>max):
            return max
    return int(num/2)
class Register(views.APIView):
    # queryset=User.objects.all()
    # serializer_class=RegisterSerializers
    permission_classes=[]
    authentication_classes=[]
    
    def post(self,request):
        #In User model I stored the mail id as the username as it must be uniquee
        data=json.loads(request.body)
        username=data.get("username")
        CollegeMail=data.get("collegeMail")  #unqiue field 
        #Mail=727623BIT***@mcet.in
        
        if(CollegeMail[12:20]!="@mcet.in"):
            return JsonResponse({"register":"Enter the valid Email ID"},status=status.HTTP_401_UNAUTHORIZED)
        qs=User.objects.filter(username=CollegeMail) 
        
        if qs.exists():
            return JsonResponse({"register":" You'r college Email ID has already registered"},status=status.HTTP_403_FORBIDDEN)
        password=data.get("password")
        verify=data.get('confirmPassword')
        
        if(password!=verify):
            return JsonResponse({'register':"failed check password"},status=status.HTTP_403_FORBIDDEN)
        # super().perform_create(serializer)

        user=User(username=CollegeMail)
        user.set_password(password)
        user.save()
        #setting the username
        RollNum=CollegeMail[:12]
        student=StudentModel(User=user,Name=username,RollNum=RollNum)
        student.save()
        print(f"User Added({username})")
        return JsonResponse({'register':"Success"},status=status.HTTP_200_OK)
        
RegisterClass=Register.as_view()

class LoginView(views.APIView):
    permission_classes=[]
    authentication_classes=[]

    def post(self, request, *args, **kwargs):

        data=json.loads(request.body)
        collegeMail=data.get('collegeMail')
        password=data.get('password')

        if not collegeMail or not password:
            return JsonResponse({"login": "Email and Password are required."},status=status.HTTP_400_BAD_REQUEST)

        # user = authenticate(email=email, password=password)
        user=User.objects.filter(username=collegeMail)
        if(user.exists()):
            user=User.objects.get(username=collegeMail)
            if not(check_password(password,user.password)):

                return JsonResponse({"login": "Invalid Email or Password."},status=status.HTTP_404_NOT_FOUND)                
        else:
            return JsonResponse({"login": "Invalid Email or Password."},status=status.HTTP_401_UNAUTHORIZED)
        # user = authenticate(request, email=email, password=password)
        if user:
            if user.is_active:
                login(request,user)
                # Generate JWT tokens
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)

                return JsonResponse({
                    "login": "success",
                    "access_token": access_token,
                    "refresh_token": str(refresh)
                }, status=status.HTTP_200_OK)
            else:
                return JsonResponse({"login": "User account is inactive."},status=status.HTTP_403_FORBIDDEN)
        else:
            return JsonResponse({"login": "Invalid Email or Password."},status=status.HTTP_401_UNAUTHORIZED)

LoginViewClass=LoginView.as_view()

class AssosationView(generics.ListAPIView):

    queryset=AssosiationMembersModel.objects.all()
    serializer_class=AssositationSerializer
    permission_classes=[]
    authentication_classes=[]

    def get(self, request, *args, **kwargs):
        qs=AssosiationMembersModel.objects.all()
        members=AssositationSerializer(qs,many=True)
        # return super().get(request, *args, **kwargs)

        return JsonResponse({"Members":members.data},status=status.HTTP_200_OK)

AssosationViewClass=AssosationView.as_view()

class PlacmentView(generics.ListAPIView):

    queryset=PlacementModel.objects.all()
    serializer_class=PlacmentSerializer
    permission_classes=[]
    authentication_classes=[]

    def get(self, request, *args, **kwargs):

        #Top3
        qs=PlacementModel.objects.filter(Placed=True).order_by("LPA")
        if(qs.count()<=3):
            return JsonResponse({"Count":"Less than 3"},status=status.HTTP_204_NO_CONTENT)
        serializer=PlacmentSerializer(qs,many=True).data

        #Batch List
        batchqs=PlacementModel.objects.values_list('Batch').distinct()
        batchList=[]
        for i in batchqs:
            batchList.append(i[0])
        # return super().get(request, *args, **kwargs)

        return JsonResponse({"top1":serializer[0],"top2":serializer[1],"top3":serializer[2],"batchList":batchList},status=status.HTTP_200_OK)
    
PlacmentViewClass=PlacmentView.as_view()

class PlacmentBatchView(generics.ListAPIView):

    queryset=PlacementModel.objects.all()
    serializer_class=PlacmentSerializer
    permission_classes=[]
    authentication_classes=[]

    def get(self, request,Batch=None, *args, **kwargs):

        qs=PlacementModel.objects.filter(Batch=Batch).order_by("-LPA")
        if(qs.count()<=3):
            return JsonResponse({"Count":"Less than 3"},status=status.HTTP_204_NO_CONTENT)
        
        serializer=PlacmentSerializer(qs,many=True).data
        return JsonResponse({"top3":serializer[:3],"others":serializer[3:]},status=status.HTTP_200_OK)
        #return super().get(request, *args, **kwargs)

PlacmentBatchViewClass=PlacmentBatchView.as_view()

class EventCertificateView(generics.ListCreateAPIView):
    queryset=EventModel.objects.all()
    serializer_class=EventSerializer

    def get(self, request, *args, **kwargs):
        user=self.request.user
        print("------------->",user.username)
        if(not User.is_authenticated):
            return JsonResponse({"login":"Login Required"},status=status.HTTP_401_UNAUTHORIZED)
        
        Student=StudentModel.objects.filter(User=user)
        if not(Student.exists()):
            return JsonResponse({"Login":"Login required","username":user.username},status=status.HTTP_401_UNAUTHORIZED)
        Student=StudentModel.objects.get(User=user)
        department="IT"
        # print("=============>",datetime.now().month)
        # currentMonth=datetime.now().month
        # currentYear=datetime.now().year
        # if(currentMonth<=5):
        #     year=f"{currentYear-1}-{currentYear}"
        # else:
        #     year=f"{currentYear}-{currentYear+1}"
        studentName=Student.Name
        RollNum=Student.RollNum

        return Response({"department":department,"student":studentName,"rollNo":RollNum},status=status.HTTP_200_OK)
    
    def perform_create(self, serializer):

        #To ensure that the user doesn't submit the result of same event more than once
        #we take limited fields-Roll No,Event,Date,Organizer and Club to ensure the high possiblity
        RollNum=serializer.validated_data.get("rollNo")
        Event=serializer.validated_data.get("event")
        Date=serializer.validated_data.get("date")
        Organizer=serializer.validated_data.get("organizer")
        Club=serializer.validated_data.get("club")
        
        qs=EventModel.objects.filter(rollNo=RollNum,event=Event,date=Date,organizer=Organizer,club=Club)
        if(qs.exists()):
            return JsonResponse({"submitted":"you have already submitted "},status=status.HTTP_406_NOT_ACCEPTABLE)
        serializer.save()
        # return super().perform_create(serializer)

EventCertificateViewClass=EventCertificateView.as_view()

class DashbordView(generics.ListAPIView):
    queryset=StudentModel.objects.all()
    serializer_class=StudentSerializer

    def get(self, request, *args, **kwargs):
        User=self.request.user
        if(not User.is_authenticated):
            return JsonResponse({"Login":"Login required"},status=status.HTTP_401_UNAUTHORIZED)
        
        student=StudentModel.objects.get(User=User)
        toatlCount=EventModel.objects.filter(rollNo=student.RollNum).count()
        cgpa=student.cgpa

        RecentActivitiesqs=EventModel.objects.filter(rollNo=student.RollNum).order_by("-date")[:4]
        RecentActivity=[]

        for i in RecentActivitiesqs:
            Activity={}
            Activity["Title"]=i.event
            Activity["Date"]=i.date
            Activity["Place"]=i.place
            RecentActivity.append(Activity)

        #Badges
        orginalParticpataionCount=EventModel.objects.filter(rollNo=student.RollNum,place="participation").count()
        originalWinnerCount=EventModel.objects.filter(rollNo=student.RollNum).exclude(place="participation").count()

        print("-------->",originalWinnerCount)
        particpataionCount=count(orginalParticpataionCount,5)
        WinnerCount=count(8,3)

        if(particpataionCount>=5):
            particpataionBadgeqs=BadgeModel.objects.filter(Category="participation",Count=particpataionCount).first()
        else:
            particpataionBadgeqs=BadgeModel.objects.get(Count=0)
        serializer=BadgeSerializer(particpataionBadgeqs)
        particpataionBadge=serializer.data.get('Image')

        if(WinnerCount>=3):
            winnerBadgeqs=BadgeModel.objects.filter(Category="winner",Count=WinnerCount).first()
        else:
            winnerBadgeqs=BadgeModel.objects.get(Count=0)

        serializer=BadgeSerializer(winnerBadgeqs)
        winnerBadge=serializer.data.get('Image')
        
        return Response({"totalAcitivities":toatlCount,"cgpa":cgpa,"recentActivities":RecentActivity,"particpataionBadge":particpataionBadge,"winnerBadge":winnerBadge,"particpationCount":orginalParticpataionCount,"WinnerCount":originalWinnerCount},status=status.HTTP_200_OK)

DashbordViewClass=DashbordView.as_view()

class BadgeDetailView(generics.ListAPIView):

    queryset=BadgeModel.objects.all()
    serializer_class=BadgeSerializer

    def get(self, request, *args, **kwargs):
        qs=BadgeModel.objects.all().exclude(Count=0)
        serializer=BadgeSerializer(qs,many=True)
        print(serializer.data)

        return JsonResponse({"badges":serializer.data},status=status.HTTP_200_OK)
    
BadgeDetailClass=BadgeDetailView.as_view()

class ActivityView(generics.ListAPIView):
    queryset=EventModel.objects.all()
    serializer_class=EventSerializer

    def get(self, request, *args, **kwargs):
        user=self.request.user

        if (not user.is_authenticated):
            return JsonResponse({'activities':"Login required"},status=status.HTTP_401_UNAUTHORIZED)
        
        student=StudentModel.objects.filter(User=user)
        if(not student.exists()):
            return JsonResponse({"activities":"Not a valid student account"},status=status.HTTP_401_UNAUTHORIZED)
        student=StudentModel.objects.get(User=user)

        activitiesqs=EventModel.objects.filter(rollNo=student.RollNum)
        if not(activitiesqs.exists()):
            return JsonResponse({"activities":"There no activities currently"},status=status.HTTP_204_NO_CONTENT)
        
        activities=EventSerializer(activitiesqs,many=True).data
        
        return JsonResponse({"activities":activities},status=status.HTTP_200_OK)
        # return super().get(request, *args, **kwargs)