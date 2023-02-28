def make_query_find_friends(userid: int, col: list[str],
                            is_accepted: bool) -> str:
    return f'''
    SELECT 1 as id, {','.join(col)}
    FROM users_friends
    JOIN users_user
    ON ((users_user.id = users_friends.sender_id)
    OR (users_user.id = users_friends.reciever_id))
    AND (users_user.id != {userid})
    WHERE (users_friends.sender_id = {userid} OR users_friends.reciever_id = {userid})
    AND (is_accepted = {is_accepted});'''