from rest_framework import pagination


class FriendsListPagination(pagination.PageNumberPagination):
    page_size = 25
