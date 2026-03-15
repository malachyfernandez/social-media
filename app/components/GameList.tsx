import React from 'react';
import ContainerCol from './layout/ContainerCol';
import AppButton from './ui/AppButton';
import PoppinsText from './ui/PoppinsText';

interface GameListProps {
    gamesTheyJoined: string[];
    setGamesTheyJoined: (games: string[]) => void;
}

const GameList = ({ gamesTheyJoined, setGamesTheyJoined }: GameListProps) => {
    return (
        <ContainerCol className='p-6'>
            <ContainerCol>
                <PoppinsText weight='bold'>Joined Games</PoppinsText>
            </ContainerCol>
            <ContainerCol>
                {gamesTheyJoined.map((game) => (
                    <ContainerCol key={game}>
                        <PoppinsText>{game}</PoppinsText>
                        <AppButton 
                            variant="green" 
                            className="h-12 w-40" 
                            onPress={() => setGamesTheyJoined(gamesTheyJoined.filter((g) => g !== game))}
                        >
                            <PoppinsText weight='medium' color="white">Leave</PoppinsText>
                        </AppButton>
                    </ContainerCol>
                ))}
            </ContainerCol>

            <ContainerCol>
                <PoppinsText weight='bold'>My Games</PoppinsText>
            </ContainerCol>
        </ContainerCol>
    );
};

export default GameList;
