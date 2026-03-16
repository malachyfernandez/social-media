import React, { useState } from 'react';
import { useUserVariable } from 'hooks/useUserVariable';
import { ConvexDialog } from '../ui/dialog/ConvexDialog';
import Column from '../layout/Column';
import Animated from 'react-native-reanimated';
import { FadeInRight, FadeOutRight } from 'react-native-reanimated';
import AppButton from '../ui/buttons/AppButton';
import PoppinsText from '../ui/text/PoppinsText';
import PoppinsTextInput from '../ui/forms/PoppinsTextInput';
import JoinHandler from '../ui/forms/JoinHandler';
import ModalHeader from '../modals/ModalHeader';

interface JoinGameButtonProps {
    onJoin?: (gameId: string) => void;
}

const JoinGameButton = ({ onJoin }: JoinGameButtonProps) => {
    const [isHeroDialogOpen, setIsHeroDialogOpen] = useState(false);
    const [gameCode, setGameCode] = useState('');

    // const [gamesTheyJoined, setGamesTheyJoined] = useUserVariable<string[]>({
    //     key: "gamesTheyJoined",
    //     defaultValue: [],
    // });

    const handleJoin = (code: string) => {
        // setGamesTheyJoined([...gamesTheyJoined.value, code]);
        onJoin?.(code);
    };

    return (
        <Animated.View
            entering={FadeInRight.duration(100)}
            exiting={FadeOutRight.duration(100)}
        >
            <ConvexDialog.Root isOpen={isHeroDialogOpen} onOpenChange={setIsHeroDialogOpen}>
                <ConvexDialog.Trigger asChild>
                    <AppButton variant="green" className="h-12 w-40 shrink">
                        <PoppinsText weight='medium' color="white">Join a Game</PoppinsText>
                    </AppButton>
                </ConvexDialog.Trigger>
                <ConvexDialog.Portal>
                    <ConvexDialog.Overlay className='bg-black/20' />

                    <ConvexDialog.Content className='bg-background rounded border-2 border-border'>

                        <ConvexDialog.Close className='w-10 h-10 bg-accent-hover absolute right-4 top-4 z-10' iconProps={{ color: 'rgb(246, 238, 219)' }} />

                        <Column>
                            <ModalHeader
                                text="Join a Game"
                                subtext="Enter a game code to join."
                            />

                            <PoppinsTextInput
                                placeholder="Enter game code"
                                className="w-full border border-subtle-border p-2"
                                value={gameCode}
                                onChangeText={setGameCode}
                            />
                            
                            <JoinHandler gameCode={gameCode} onClose={() => setIsHeroDialogOpen(false)} onJoin={handleJoin} />

                        </Column>
                    </ConvexDialog.Content>
                </ConvexDialog.Portal>
            </ConvexDialog.Root>
        </Animated.View>
    );
};

export default JoinGameButton;
