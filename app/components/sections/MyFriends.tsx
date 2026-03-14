import React from 'react';
import PoppinsText from '../ui/PoppinsText';

interface MyFriendsProps {
    friendsList: string[];
}

const MyFriends = ({ friendsList }: MyFriendsProps) => {
    
    return (
        <>
            <PoppinsText>My Friends</PoppinsText>
            {friendsList?.map((friend, index) => (
                <PoppinsText key={index}>{friend}</PoppinsText>
            ))}
        </>
    );
};

export default MyFriends;
