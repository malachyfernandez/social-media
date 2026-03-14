import React from 'react';
import PoppinsText from '../ui/PoppinsText';
import { useUserListGet } from 'hooks/useUserListGet';
import { View } from 'react-native';

const FriendsPosts = ({ friendsList }: { friendsList: string[] }) => {
    const posts = useUserListGet({
        key: "posts",
        userIds: friendsList,
    });
    console.log("posts", posts);
    console.log("friendsList", friendsList);
    return (

        <View>
            <PoppinsText>My Friends posts</PoppinsText>
            {posts?.map((post, index) => (
                <PoppinsText key={index}>{post?.value.title}</PoppinsText>
            ))}
        </View>
    );
};

export default FriendsPosts;
