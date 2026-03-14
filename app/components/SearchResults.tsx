import React from 'react';
import { View } from 'react-native';
import AppButton from './ui/AppButton';
import PoppinsText from './ui/PoppinsText';
import { useUserVariableGet } from 'hooks/useUserVariableGet';

const SearchResults = ({ query, currentUserId, addFriend }: { query?: string; currentUserId?: string; addFriend?: (friend: any) => void }) => {

    const userlist = useUserVariableGet({
        key: 'userData',
        searchFor: query,
    });

    return (
        <View>

            {userlist?.map((user, index) => {
                if (user.value.userId === currentUserId) {
                    return null;
                }
                return (
                    <AppButton key={index} variant="grey" onPress={() => {
                        addFriend?.(user.value);
                    }}>


                        <PoppinsText >{user.value.email || 'No email'}</PoppinsText>
                    </AppButton>
                );
            })}


        </View>
    );
};

export default SearchResults;
