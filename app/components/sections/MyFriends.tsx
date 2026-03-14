import React from 'react';
import PoppinsText from '../ui/PoppinsText';
import FriendListItem from '../ui/FriendListItem';
import FindFriends from './FindFriends';

interface MyFriendsProps {
    friendsList: string[];
    currentUserId: string;
    addFriend: (friend: any) => void;
}

const MyFriends = ({ friendsList, currentUserId, addFriend }: MyFriendsProps) => {

    return (
        <>
            <FindFriends currentUserId={currentUserId} addFriend={addFriend} />
            <PoppinsText>Friends</PoppinsText>
            {friendsList?.map((friend, index) => (

                <FriendListItem key={index} friend={friend} />
            ))}
        </>
    );
};

export default MyFriends;
