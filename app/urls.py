from django.urls import path
from . import views

urlpatterns=[
    #Event certificate and the activities are same
    # path('',views.HomeViewClass,name="Home"),
    path("signup/student/",views.RegisterClass,name="Student Signup"),
    path("login/student/",views.LoginViewClass,name="Student login"),
    path("signup/teacher/",views.TeacherRegisterClass,name="Teacher Signup"),
    path("login/teacher/",views.TeacherLoginClass,name="Login teacher"),
    path('assosation/members/',views.AssosationViewClass,name="Assosation members"),
    path('placment/',views.PlacmentViewClass,name="List of top placed and batch"),
    path('placment/<str:Batch>/',views.PlacmentBatchViewClass,name="placment of a batch"),
    path('event/certificate/',views.EventCertificateViewClass,name="Certificate register"),
    path('profile/',views.ProfileViewClass,name="student profile"),
    path('profile/dashboard/',views.DashbordViewClass,name="Dashbord of the student"),
    path("profile/activities/",views.ActivityViewClass,name="Activites of a student"),
    path('profile/edit/',views.ProfileEditClass,name="Profile edit"),
    path("badges/description/",views.BadgeDetailClass,name="Badge description"),

]