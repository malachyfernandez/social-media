import React from 'react';
import Column from './layout/Column';
import JoinedGames from './JoinedGames';
import MyGames from './MyGames';

import { UserListRecord } from 'hooks/useUserList';
import prettyLog from 'utils/prettyLog';
import { GameInfo } from 'types/games';



interface GameListProps {
    gamesTheyJoined: string[];
    setGamesTheyJoined: (games: string[]) => void;
    myGames: UserListRecord<GameInfo>[] | undefined;
    hasJoinedAGame: boolean;
    hasMadeAGame: boolean;
}

const GameList = ({ gamesTheyJoined, setGamesTheyJoined, myGames, hasJoinedAGame, hasMadeAGame }: GameListProps) => {

    prettyLog(myGames);
    return (
        <Column className='p-6'>
            {hasJoinedAGame && (
                <JoinedGames 
                    gamesTheyJoined={gamesTheyJoined} 
                    setGamesTheyJoined={setGamesTheyJoined} 
                />
            )}

            {hasMadeAGame && (
                <MyGames myGames={myGames} />
            )}
        </Column>
    );
};

export default GameList;
