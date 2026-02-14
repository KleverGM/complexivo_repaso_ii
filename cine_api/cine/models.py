from django.db import models

class Show(models.Model):
    movie_title = models.CharField(max_length=120, unique=True)
    room = models.CharField(max_length=20)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    available_seats = models.IntegerField()

    def __str__(self):
        return self.movie_title
    
class Status(models.TextChoices):
    RESERVED = "Reserved", "reserved"
    CONFIRMED = "Confirmed", "confirmed"
    CANCELLED = "Cancelled", "cancelled"

class Reservation(models.Model):
    show = models.ForeignKey(Show, on_delete=models.PROTECT, related_name="shows")
    customer_name = models.CharField(max_length=120, null= False)
    seats = models.IntegerField()
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.RESERVED)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.show.movie_title} {self.customer_name} ({self.status})"