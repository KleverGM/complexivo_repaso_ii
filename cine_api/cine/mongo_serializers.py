from rest_framework import serializers

class MovieCatalogSerializer(serializers.Serializer):
    movie_title = serializers.CharField(max_length=120)
    genre = serializers.CharField(required=False)
    duration_min = serializers.IntegerField(required=False)
    rating = serializers.CharField(required=False)
    is_active = serializers.BooleanField(default=True, required=False)

class EventType:
    CREATED = "Created"
    CONFIRMED = "Confirmed"
    CANCELLED = "Cancelled"
    CHECKED_IN = "Checked_In"
    
    CHOICES = [
            (CREATED, "created"),
            (CONFIRMED, "confirmed"),
            (CANCELLED, "cancelled"),
            (CHECKED_IN, "checked_In")
        ]



class Source:
    WEB = "Web"
    MOBILE = "Mobile"
    SYSTEM = "System" 
    
    CHOICES = [
            (WEB, "web"),
            (MOBILE, "mobile"),
            (SYSTEM, "system"),
        ]

class ReservationEventSerializer(serializers.Serializer):
    reservation_id = serializers.IntegerField()        
    event_type = serializers.ChoiceField(choices=EventType.CHOICES, default=EventType.CREATED)
    source = serializers.ChoiceField(choices=Source.CHOICES, default=Source.WEB)
    note = serializers.CharField(required=False)
    created_at = serializers.DateTimeField(required=False)