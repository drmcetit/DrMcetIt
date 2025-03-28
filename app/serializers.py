from rest_framework import serializers

from .models import AssosiationMembersModel,PlacementModel,EventModel,StudentModel,BadgeModel

class AssositationSerializer(serializers.ModelSerializer):

    class Meta:
        model=AssosiationMembersModel
        fields=[
            'Name',
            'Desigination',
            'Year',
            'ProfilePic'
        ]

class PlacmentSerializer(serializers.ModelSerializer):

    class Meta:
        model=PlacementModel
        fields=[
            'Name',
            'Batch',
            'Placed',
            'Desigination',
            'LPA',
            'StartUp',
            'Company',
            'ProfilePic'
        ]

class EventSerializer(serializers.ModelSerializer):

    class Meta:
        model=EventModel
        fields=[
            'department',
            'year',
            'student',
            'rollNo',
            'level',
            'event',
            'type',
            'mode',
            'category',
            'place',
            'date',
            'organizer',
            'club',
            'teamInd',
            'description',
            'proofAttachment'

        ]

class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model=StudentModel
        fields=[
            'User',
            'Name',
            'RollNum',
            'Section',
            'CC',
            'Mentor',
            'cgpa',
            'Leetcode',
            'Github',
            'Linkedin',
            'HackerRank'
        ]

class BadgeSerializer(serializers.ModelSerializer):

    class Meta:
        model=BadgeModel
        fields=[
            "Title",
            "Description",
            "Category",
            "Count",
            "Image"
        ]
        