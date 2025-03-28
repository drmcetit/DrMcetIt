from django.urls import path
from . import views

urlpatterns=[
    # path('',views.HomeViewClass,name="Home"),
    path("signup/student/",views.RegisterClass,name="Student Signup"),
    path("login/student/",views.LoginViewClass,name="Student login"),
    path('assosation/members/',views.AssosationViewClass,name="Assosation members"),
    path('placment/',views.PlacmentViewClass,name="List of top placed and batch"),
    path('placment/<str:Batch>/',views.PlacmentBatchViewClass,name="placment of a batch"),
    path('event/certificate/',views.EventCertificateViewClass,name="Certificate register"),
    path('profile/dashboard/',views.DashbordViewClass,name="Dashbord of the student"),
    path("badges/description/",views.BadgeDetailClass,name="Badge description"),
]