from rest_framework import serializers

from .models import AssosiationMembersModel,PlacementModel,EventModel,StudentModel,BadgeModel,objectiveModel

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

    date=serializers.DateTimeField(required=True, error_messages={"required": "The date field is required."})
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
            'HackerRank',
            'bio',
            'profilePic',
            'batch',
            'phoneNum',
        ]
        extra_kwargs = {
            'profilePic': {'required': False}  # Make image optional
        }

    def update(self, instance, validated_data):
    # Only update profilePic if a new one is provided
        profile_pic = validated_data.pop('profilePic', None)
        if profile_pic:
            instance.profilePic = profile_pic  # Update image only if provided
        
        # Update other fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance

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
        

class objectiveSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=objectiveModel
        fields=[
            'POId',
            'title',
            'description'
        ]
