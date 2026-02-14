from rest_framework import serializers
from .models import Show, Reservation

class ShowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Show
        fields = ["id", "movie_title", "room", "price", "available_seats"]

class ReservationSerializer(serializers.ModelSerializer):
    show_movie_title = serializers.CharField(source="show.movie_title", read_only=True)

    class Meta:
        model = Reservation
        fields = ["id", "show", "show_movie_title", "customer_name", "seats", "status", "created_at"]