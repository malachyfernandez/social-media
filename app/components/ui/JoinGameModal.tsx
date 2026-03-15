import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeOut, FadeOutDown } from 'react-native-reanimated';
import ContainerCol from '../layout/ContainerCol';
import PoppinsText from './PoppinsText';
import PoppinsTextInput from './PoppinsTextInput';
import AppButton from './AppButton';

interface JoinGameModalProps {
    isVisible: boolean;
    onHide: () => void;
    onJoinGame: (gameCode: string) => void;
}

const JoinGameModal: React.FC<JoinGameModalProps> = ({
    isVisible,
    onHide,
    onJoinGame,
}) => {
    const [gameCode, setGameCode] = useState("");

    if (!isVisible) return null;

    return (
        <ContainerCol className='absolute w-screen h-screen justify-center items-center'>
            <Animated.View
                entering={FadeIn.duration(100)}
                exiting={FadeOut.duration(100)}
            >
                <ContainerCol className='w-screen h-screen justify-center items-center'>
                    <TouchableOpacity onPress={onHide} className='w-screen h-screen z-[-10] absolute bg-black/50' />

                    <Animated.View
                        entering={FadeInDown.duration(100)}
                        exiting={FadeOutDown.duration(100)}
                    >
                        <ContainerCol className='bg-background p-6 rounded border-2 border-border'>
                            <PoppinsText>Code:</PoppinsText>
                            <PoppinsTextInput
                                placeholder="Enter game code"
                                className="w-full border border-subtle-border p-2"
                                value={gameCode}
                                onChangeText={setGameCode}
                            />
                            <AppButton variant="black" className="h-10 w-20" onPress={() => onJoinGame(gameCode)}>
                                <PoppinsText weight='medium' color='white'>Join</PoppinsText>
                            </AppButton>
                        </ContainerCol>
                    </Animated.View>
                </ContainerCol>
            </Animated.View>
        </ContainerCol>
    );
};

export default JoinGameModal;
