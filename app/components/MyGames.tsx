import React from 'react';
import Column from './layout/Column';
import PoppinsText from './ui/PoppinsText';

import { UserListRecord } from 'hooks/useUserList';
import { GameInfo } from 'types/games';

interface MyGamesProps {
    myGames: UserListRecord<GameInfo>[] | undefined;
}

const MyGames = ({ myGames }: MyGamesProps) => {
    return (
        <Column>
            <PoppinsText weight='bold'>My Games</PoppinsText>

            {myGames?.map((game, index) => (
                <Column key={index}>
                    <PoppinsText>{game.value.name}</PoppinsText>
                    <PoppinsText>{game.value.description}</PoppinsText>
                    <PoppinsText>{game.value.id}</PoppinsText>
                </Column>
            ))}
        </Column>
    );
};

export default MyGames;
