from rest_framework import pagination

class FriendsListPagination(pagination.PageNumberPagination):
    page_size = 25
    max_page_size = 50
    page_query_param = 'page_size'
    