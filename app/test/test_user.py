# from django.test import TestCase
# from django.urls import reverse
# from django.contrib.auth.models import User

# from rest_framework import status
# from rest_framework.test import APITestCase
# from rest_framework.authtoken.models import Token

# from ..models import ClassModel,TeacherModel

# class StudentTestCase(APITestCase):

#     def setUp(self):
#         # Add required ClassModel row (simulating a valid RollNum check)
#             self.class_model = ClassModel.objects.create(
#                 rollNum="727623bit103",   # RollNum prefix must match the test email
#                 CC="EMP001",
#                 section="A",
#                 year=2

#             )
#             self.teacher_user = User.objects.create_user(username="EMP001", password="teachpass")
#             self.teacher_model = TeacherModel.objects.create(User=self.teacher_user, Name="Dr. John")


#     def test_create(self):
 
#         data={
#             "username":"Akash K",
#             "collegeMail":"727623bit001@mcet.in",
#             "password":"pass",
#             "confirmPassword":"pass"
#         }

#         response=self.client.post(reverse("Student Signup"),data,format='json')
#         print("RESPONSE DATA:", response.json())
#         #self.assertEqual(response.status_code,status.HTTP_201_CREATED)
        