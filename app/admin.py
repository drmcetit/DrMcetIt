from django.contrib import admin

from .models import AssosiationMembersModel,PlacementModel,StudentModel

admin.site.register(StudentModel)

class AssosiationAdmin(admin.ModelAdmin):
    list_filter=('Year',)
admin.site.register(AssosiationMembersModel)

class PlacementAdmin(admin.ModelAdmin):
    list_filter=('Batch','Placed','StartUp')
    list_display=('Name','Batch','Company','LPA')
admin.site.register(PlacementModel)
