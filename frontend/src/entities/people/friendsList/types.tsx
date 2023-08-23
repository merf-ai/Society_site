export interface TypePeople{
    sex ?: string,
    first_name ?: string,
    middle_name ?: string,
    last_name ?: string,
}

export interface IFriendDataListProps {
    friendData: TypePeople;
    username: string;
}