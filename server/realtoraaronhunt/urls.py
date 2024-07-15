from django.urls import include, path
from rest_framework import routers
from realtoraaronhuntapi.views import submit

router = routers.DefaultRouter(trailing_slash=False)

urlpatterns = [
    path('', include(router.urls)),
    path('submit', submit),
]
