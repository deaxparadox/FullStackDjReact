from rest_framework import generics, permissions
from rest_framework.parsers import JSONParser
from rest_framework.authtoken.models import Token

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import IntegrityError
from django.contrib.auth.models import User 
from django.contrib.auth import authenticate
from django.utils.text import slugify



from .serializers import TodoSerializers, TodoToggleCompleteSerializer
from todo.models import Todo


class TodoListCreate(generics.ListCreateAPIView):
    serializer_class = TodoSerializers
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user 
        num = self.request.query_params.get('num')
        query_data = Todo.objects.filter(user=user).order_by("-created")
        if num:
            return query_data[:int(num)]
        return query_data
    
    def perform_create(self, serializer):
        slug = slugify(self.request.data.get("title"))
        serializer.save(user=self.request.user, slug=slug)

class TodoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TodoSerializers
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Todo.objects.filter(user=user)



class TodoToggleComplete(generics.UpdateAPIView):
    serializer_class = TodoToggleCompleteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Todo.objects.filter(user=user)
    
    def perform_update(self, serializer):
        serializer.instance.completed = not(serializer.instance.completed)
        serializer.save()

@csrf_exempt
def signup(request):
    if request.method == "POST":
        try:
            data = JSONParser().parse(request)
            user = User.objects.create_user(
                username=data['username'],
                password=data['password']
            )
            user.save()
            token = Token.objects.create(user=user)
            return JsonResponse(
                {
                    "token": str(token)
                },
                status=201
            )
        except IntegrityError:
            return JsonResponse(
                {
                    'error': 'username taken. choose another username'
                },
                status=400
            )


@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        user = authenticate(
            request,
            username=data['username'],
            password=data['password']
        )
        if user is None:
            return JsonResponse(
                {
                    'error': "unable to login. check username and password"
                },
                status=400
            )
        else:
            try:
                token = Token.objects.get(user=user)
            except:
                token = Token.objects.create(user=user)
            return JsonResponse(
                {
                    'token': str(token),
                },
                status=201
            )
