import json

from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from django.contrib.auth import login 

from rest_framework import generics
from rest_framework import status
from rest_framework import views
from rest_framework_simplejwt.tokens import RefreshToken

from .models import AssosiationMembersModel,PlacementModel,StudentModel
from .serializers import AssositationSerializer,PlacmentSerializer,RegisterSerializers

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

class Register(generics.CreateAPIView):
    queryset=User.objects.all()
    serializer_class=RegisterSerializers
    permission_classes=[]
    authentication_classes=[]
    
    def perform_create(self, serializer):
        #In User model I stored the mail id as the username as it must be uniquee
        username=serializer.validated_data.get("username")
        CollegeMail=serializer.validated_data.get("collegeMail")  #unqiue field 
        #Mail=727623BIT***@mcet.in
        
        if(CollegeMail[12:20]!="@mcet.in"):
            return JsonResponse({"register":"Enter the valid Email ID"},status=status.HTTP_401_UNAUTHORIZED)
        qs=User.objects.filter(username=CollegeMail) 
        
        if qs.exists():
            return JsonResponse({"register":" You'r college Email ID has already registered"},status=status.HTTP_403_FORBIDDEN)
        password=serializer.validated_data.get("password")
        verify=serializer.validated_data.pop('confirmPassword')
        
        if(password!=verify):
            return JsonResponse({'register':"failed check password"},status=status.HTTP_403_FORBIDDEN)
        # super().perform_create(serializer)

        user=User(username=CollegeMail)
        user.set_password(password)
        user.save()
        #setting the username
        student=StudentModel(Name=username)
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

        if not username or not password:
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