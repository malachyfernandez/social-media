import React from 'react';
import Column from './layout/Column';
import AppButton from './ui/AppButton';
import PoppinsText from './ui/PoppinsText';

interface JoinedGamesProps {
    gamesTheyJoined: string[];
    setGamesTheyJoined: (games: string[]) => void;
}

const JoinedGames = ({ gamesTheyJoined, setGamesTheyJoined }: JoinedGamesProps) => {
    return (
        <Column>
            <PoppinsText weight='bold'>Joined Games</PoppinsText>

            {gamesTheyJoined.map((game) => (
                <Column key={game}>
                    <PoppinsText>{game}</PoppinsText>
                    <AppButton
                        variant="green"
                        className="h-12 w-40"
                        onPress={() => setGamesTheyJoined(gamesTheyJoined.filter((g) => g !== game))}
                    >
                        <PoppinsText weight='medium' color="white">Leave</PoppinsText>
                    </AppButton>
                </Column>
            ))}
        </Column>
    );
};

export default JoinedGames;
