#Avoid using the complex concept for later easy understanding  and also avoid try catch for the later confunsion of others
import json
from datetime import datetime

from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from django.contrib.auth import login 
from django.db.models import Q

from rest_framework import generics
from rest_framework import status
from rest_framework import views
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.parsers import MultiPartParser, FormParser
from django.middleware.csrf import get_token

from .models import AssosiationMembersModel,PlacementModel,StudentModel,EventModel,BadgeModel,TeacherModel,ClassModel
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

def count_participation(count):#9,3
    num=5
    if(count<5):
        return 0 
    while(num<=count):#3<=9
        num*=2
        if(num>80):
            return max
    return int(num/2)

def count_winner(count):#9,3
    num=3
    if(count<3):
        return 0 
    while(num<=count):#3<=9
        num+=3
        if(num>15):
            return max
    return int(num-3)

def separateDate(serializer):#seprateDate
    #Seprate the date and time and return date in the qs
    for i in serializer:
        i["date"]=i["date"][:10]
    return serializer


def get_csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})


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

        qs=User.objects.filter(username=CollegeMail) 
        if qs.exists():
            return JsonResponse({"register":" You'r college Email ID has already registered"},status=status.HTTP_403_FORBIDDEN)
        #Mail=727623BIT***@mcet.in
        
        # if(CollegeMail[12:20]!="@mcet.in"):
        #     return JsonResponse({"register":"Enter the valid Email ID"},status=status.HTTP_401_UNAUTHORIZED)
        # qs=User.objects.filter(username=CollegeMail) 
        RollNum=CollegeMail[:12]
        qs=ClassModel.objects.all()
        flag=0
        for i in qs:
            if RollNum in i.rollNum:
                flag=1
                cc=i.CC #cc->empid
                section=i.section
                break
        
        if(flag==0):
            return JsonResponse({"register":"Enter the valid Email ID"},status=status.HTTP_401_UNAUTHORIZED)
        
        password=data.get("password")
        verify=data.get('confirmPassword')
        
        if(password!=verify):
            return JsonResponse({'register':"failed check password"},status=status.HTTP_403_FORBIDDEN)
        # super().perform_create(serializer)

        user=User(username=CollegeMail)
        user.set_password(password)
        user.save()
        #setting the username
        
        teacher=User.objects.filter(username=cc)
        if not (teacher.exists()):
            return JsonResponse({"register":"Teacher is not signup yet"},status=status.HTTP_400_BAD_REQUEST)
        teacher=User.objects.get(username=cc)
        teacherNameqs=TeacherModel.objects.filter(User=teacher)

        if not teacherNameqs.exists():
            return JsonResponse({"register":"Teacher is not signup yet"},status=status.HTTP_400_BAD_REQUEST)
        teacherNameqs=TeacherModel.objects.get(User=teacher)
        teacherName=teacherNameqs.Name

        student=StudentModel(User=user,Name=username,RollNum=RollNum,CC=teacherName,Section=section)
        student.save()
        print(f"User Added({username})")
        return JsonResponse({'register':f"student account({RollNum}) successfully registered"},status=status.HTTP_200_OK)
        
RegisterClass=Register.as_view()

class TeacherRegisterView(views.APIView):
    permission_classes=[]
    authentication_classes=[]

    def post(self,request):
        data=json.loads(request.body)
        EmpId=data.get("empId")
        
        qs=User.objects.filter(username=EmpId)
        if qs.exists():
            return JsonResponse({"register":"The empid already exisit"},status=status.HTTP_400_BAD_REQUEST)
        
        password=data.get("password")
        verify=data.get('confirmPassword')

        if(password!=verify):
            return JsonResponse({"register":"The password and conform password are not same"},status=status.HTTP_400_BAD_REQUEST)
        
        user=User(username=EmpId)
        user.set_password(password)
        user.save()

        username=data.get("username")
        teacher=TeacherModel(User=user,Name=username)
        teacher.save()

        return JsonResponse({"register":f"Teacher account({EmpId}) successfully register"},status=status.HTTP_201_CREATED)
    
TeacherRegisterClass=TeacherRegisterView.as_view()

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
            
LoginViewClass=LoginView.as_view()

class TeacherLoginView(views.APIView):
    permission_classes=[]
    authentication_classes=[]

    def post(self,request):
        data=json.loads(request.body)
        empID=data.get("empId")
        password=data.get("password")

        if not empID or not password:
            return JsonResponse({"login":"please provied both empId and password"},status=status.HTTP_400_BAD_REQUEST)
        
        user=User.objects.filter(username=empID)

        if(user.exists()):
            user=User.objects.get(username=empID)
            if not(check_password(password,user.password)):
                return JsonResponse({"login": "Invalid empId or Password."},status=status.HTTP_404_NOT_FOUND)                
        else:
            return JsonResponse({"login": "Invalid empId or Password."},status=status.HTTP_401_UNAUTHORIZED)
        
        if user.is_active:
            login(request,user)
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            return JsonResponse({
                "login": "success",
                "access_token_staff": access_token,
                "refresh_token_staff": str(refresh)
            }, status=status.HTTP_200_OK)
        else:
            return JsonResponse({"login": "User account is inactive."},status=status.HTTP_403_FORBIDDEN)

TeacherLoginClass=TeacherLoginView.as_view()

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
            Activity["Date"]=str(i.date)[:10]
            Activity["Place"]=i.place
            RecentActivity.append(Activity)

        #Badges
        orginalParticpataionCount=toatlCount
        originalWinnerCount=EventModel.objects.filter(rollNo=student.RollNum).exclude(place="participation").count()
        print("-------->",originalWinnerCount)
        particpataionCount=count_participation(orginalParticpataionCount)
        WinnerCount=count_winner(originalWinnerCount)

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
        
        return JsonResponse({"totalAcitivities":toatlCount,"cgpa":cgpa,"recentActivities":RecentActivity,"particpataionBadge":particpataionBadge,"winnerBadge":winnerBadge,"particpationCount":orginalParticpataionCount,"WinnerCount":originalWinnerCount},status=status.HTTP_200_OK)

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
        activities=separateDate(activities)
        return JsonResponse({"activities":activities},status=status.HTTP_200_OK)
        # return super().get(request, *args, **kwargs)

ActivityViewClass=ActivityView.as_view()

class ProfileEditView(generics.RetrieveUpdateAPIView):

    queryset=StudentModel.objects.all()
    serializer_class=StudentSerializer
    parser_classes = (MultiPartParser, FormParser) 

    def get_object(self):
        user=self.request.user
        try:
            student=StudentModel.objects.get(User=user)
            return student
        except StudentModel.DoesNotExist:
            return JsonResponse({"profile":"not the valid student account"},status=status.HTTP_404_NOT_FOUND)
        
    def get(self, request, *args, **kwargs):
        user=self.request.user

        if(not user.is_authenticated):
            return JsonResponse({"profile":"Login required"},status=status.HTTP_401_UNAUTHORIZED)

        student=StudentModel.objects.filter(User=user)
        if(not student.exists()):
            return JsonResponse({"profile":"Not a vaild student account"},status=status.HTTP_401_UNAUTHORIZED)
        
        studentqs=StudentModel.objects.get(User=user)
        student=StudentSerializer(studentqs).data
        # return super().get(request, *args, **kwargs)

        classqs=ClassModel.objects.filter(rollNum__contains = studentqs.RollNum)
        if not classqs.exists():
            return JsonResponse({"profile":"not a valid class"})
        classqs=ClassModel.objects.get(rollNum__contains = studentqs.RollNum)
        Mentor1=classqs.mentor1
        Mentor2=classqs.mentor2
        Mentor3=classqs.mentor3

        mentor1=User.objects.filter(username=Mentor1)
        mentor2=User.objects.filter(username=Mentor2)
        mentor3=User.objects.filter(username=Mentor3)

        if((not mentor1.exists()) or (not mentor2.exists()) or (not mentor3.exists())):
            return JsonResponse({"profile":"not a valid mentor id"})
        
        mentor1=User.objects.get(username=Mentor1)
        mentor2=User.objects.get(username=Mentor2)
        mentor3=User.objects.get(username=Mentor3)

        mentorName1=TeacherModel.objects.get(User=mentor1).Name
        mentorName2=TeacherModel.objects.get(User=mentor2).Name
        mentorName3=TeacherModel.objects.get(User=mentor3).Name

        student["mentor1"]=mentorName1
        student["mentor2"]=mentorName2
        student["mentor3"]=mentorName3
        student["email"]=user.username

        return JsonResponse(student,status=status.HTTP_200_OK)
    
    def patch(self, request, *args, **kwargs):
        

        user=self.request.user

        if not(user.is_authenticated):
            return JsonResponse({"profile":"Login required"},status=status.HTTP_401_UNAUTHORIZED)
        
        studentqs=self.get_object()

        mutable_data = request.data.copy()
        if 'profilePic' not in request.FILES:
            mutable_data.pop('profilePic', None)

        serialize=StudentSerializer(studentqs,data=mutable_data,partial=True)

        if(serialize.is_valid()):
            serialize.save()
            #return Response(serialize.data, status=status.HTTP_200_OK)
            return JsonResponse({"Profile":f"Profile updated for {user.username}"},status=status.HTTP_202_ACCEPTED)
        else:
            return JsonResponse({"profile":"Not the valid data"},status=status.HTTP_406_NOT_ACCEPTABLE)
    
ProfileEditClass=ProfileEditView.as_view()

class ProfileView(generics.ListAPIView):
    queryset=StudentModel.objects.all()
    serializer_class=StudentSerializer

    def get(self, request, *args, **kwargs):
        user=self.request.user

        if not(user.is_authenticated):
            return JsonResponse({"profile":"login required"},status=status.HTTP_401_UNAUTHORIZED)
        
        profileqs=StudentModel.objects.filter(User=user)
        if not profileqs.exists():
            return JsonResponse({"profile":"Not valid student account"},status=status.HTTP_401_UNAUTHORIZED)
        
        profileqs=StudentModel.objects.get(User=user)
        profileSerialize=StudentSerializer(profileqs).data
        profileSerialize["email"]=user.username
        return JsonResponse(profileSerialize,status=status.HTTP_200_OK)
        # return super().get(request, *args, **kwargs)
    
ProfileViewClass=ProfileView.as_view()

class StudentListView(generics.ListAPIView):
    queryset=StudentModel.objects.all()
    serializer_class=StudentSerializer

    def get(self, request, *args, **kwargs):
        # return super().get(request, *args, **kwargs)

        user=self.request.user

        if(not user.is_authenticated):
            return JsonResponse({"studentList":"Login required"},status=status.HTTP_401_UNAUTHORIZED)
        
        teacher=TeacherModel.objects.filter(User=user)
        if not teacher.exists():
            return JsonResponse({"studentList":"Not a valid teacher account"},status=status.HTTP_401_UNAUTHORIZED)
        
        teacher=TeacherModel.objects.get(User=user)
        empId=user.username
        classqs=ClassModel.objects.filter(Q(mentor1=empId) | Q(mentor2=empId) | Q(mentor3=empId))
        if not(classqs.exists()):
            return JsonResponse({"studentList":"Your not the CC or Mentor of any Class"},status=status.HTTP_400_BAD_REQUEST)
        
        classqs=ClassModel.objects.get(Q(mentor1=empId) | Q(mentor2=empId) | Q(mentor3=empId))
        CCempId=classqs.CC

        CC=User.objects.get(username=CCempId)
        CCName=TeacherModel.objects.get(User=CC).Name
        StudentListqs=StudentModel.objects.filter(CC=CCName)

        if not(StudentListqs.exists()):
            return JsonResponse({"studentList":"No student list available"},status=status.HTTP_204_NO_CONTENT)
        
        StudentList=StudentSerializer(StudentListqs,many=True).data
        #Add the activity 
        for i in StudentList:
            rollNum=i['RollNum']
            activitesqs=EventModel.objects.filter(rollNo=rollNum)

            if not(activitesqs.exists()):
                i["activites"]=["No activites found"]
            else:
                activites=EventSerializer(activitesqs,many=True).data
                i["activites"]=separateDate(activites)
            
            i["collegeMail"]=rollNum+"@mcet.in"

        return Response(StudentList,status=status.HTTP_200_OK)
    
StudentListClass=StudentListView.as_view()

# class StudentDetailView(generics.RetrieveAPIView):
#     queryset=StudentModel.objects.all()
#     serializer_class=StudentSerializer

#     def get(self, request,rollNo=None, *args, **kwargs):

#         user=self.request.user
#         if not(user.is_authenticated):
#             return JsonResponse({"student":"Login required"},status=status.HTTP_401_UNAUTHORIZED)
        
#         teacher=TeacherModel.objects.filter(User=user)
#         if not(teacher.exists()):
#             return JsonResponse({"student":"Not a valid student account"},status=status.HTTP_401_UNAUTHORIZED)
        
#         if rollNo is None:
#             return JsonResponse({"student":"The roll number is not provided"},status=status.HTTP_400_BAD_REQUEST)
        
#         student=StudentModel.objects.filter(RollNum=rollNo)
#         if not student.exists():
#             return JsonResponse({"student":"There is no student detail at the specified roll number"},status=status.HTTP_204_NO_CONTENT)
        
#         studentqs=StudentModel.objects.get(RollNum=rollNo)
#         student=StudentSerializer(studentqs)
#         return JsonResponse(student.data,status=status.HTTP_200_OK)
    
# StudentDetailClass=StudentDetailView.as_view()

