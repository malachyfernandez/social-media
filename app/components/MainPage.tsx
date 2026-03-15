import React, { PropsWithChildren, useState } from 'react';

import { useUserVariable } from 'hooks/useUserVariable';
import { useSyncUserData } from 'hooks/useSyncUserData';
import ContainerCol from './layout/ContainerCol';
import { useClerk } from '@clerk/clerk-expo';
import { Text, TextInput, TouchableOpacity, View, ScrollView, Animated } from 'react-native';
import AppButton from './ui/AppButton';
import JoinGameButton from './ui/JoinGameButton';
import ContainerRow from './layout/ContainerRow';
import PoppinsText from './ui/PoppinsText';
import { UserIcon } from './icons/UserIcon';
import { SadEmoji } from './icons/SadEmoji';
import PoppinsTextInput from './ui/PoppinsTextInput';
// import { AnimatedView } from 'react-native-reanimated/lib/typescript/component/View';



type FontWeight = 'regular' | 'medium' | 'bold';

interface MainPageProps extends PropsWithChildren {
    className?: string;
}

const MainPage = ({
    className = '',
}: MainPageProps) => {


    interface UserData {
        email?: string;
        name?: string;
        userId?: string
    };

    const [userData, setUserData] = useUserVariable<UserData>({
        key: "userData",
        defaultValue: {},
        privacy: "PUBLIC",
        searchKeys: ["name"],
    });




    useSyncUserData(userData.value, setUserData);

    const { signOut } = useClerk();

    const [gamesTheyJoined, setGamesTheyJoined] = useUserVariable<string[]>({
        key: "gamesTheyJoined",
        defaultValue: [],
    });

    const hasJoinedAGame = (gamesTheyJoined?.value.length ? true : false);

    const [isModalShowing, setIsModalShowing] = useState(false);

    const [gameCode, setGameCode] = useState("");

    const showModal = () => {
        setIsModalShowing(true)
    }

    const hideModal = () => {
        setIsModalShowing(false)
    }

    const joinGame = (gameId: string) => {
        setGamesTheyJoined([...gamesTheyJoined.value, gameId])
        hideModal()
    }

    return (
        <View className='justify-between w-full h-full'>

            <ContainerCol>



                <ContainerRow className='justify-between items-center p-6'>
                    <PoppinsText weight='bold' className='text-lg'>WolffsPoint</PoppinsText>
                    <AppButton variant="outline" className="h-14 w-14" onPress={() => signOut()}>
                        <UserIcon size={24} className='group-hover:text-white' />
                    </AppButton>
                </ContainerRow>


            </ContainerCol>
            <ContainerCol className='flex-1 h-full'>
                <ContainerCol className='flex-1 h-full'>
                    {hasJoinedAGame ? (
                        <ScrollView>
                            <ContainerCol className='p-6 '>
                                <PoppinsText weight='bold'>My Games</PoppinsText>
                                {gamesTheyJoined.value.map((game) => (
                                    <ContainerCol>
                                        <PoppinsText>{game}</PoppinsText>
                                        {/* nutton to remove game */}
                                        <AppButton variant="green" className="h-12 w-40" onPress={() => setGamesTheyJoined(gamesTheyJoined.value.filter((g) => g !== game))}>
                                            <PoppinsText weight='medium' color="white">Leave</PoppinsText>
                                        </AppButton>
                                    </ContainerCol>
                                ))}
                            </ContainerCol>
                        </ScrollView>
                    ) : (
                        <ContainerCol className='w-full items-center h-full justify-center'>
                            <SadEmoji size={100} lineWidth={1} />
                            <PoppinsText >You dont have any games right now</PoppinsText>
                            <JoinGameButton onPress={showModal} />
                        </ContainerCol>
                    )}





                </ContainerCol>
                <ContainerCol>
                    <ContainerRow className='p-6 border-t border-subtle-border justify-between'>
                        <AppButton variant="outline" className="h-12 w-40" onPress={signOut}>
                            <PoppinsText weight='medium' className='group-hover:text-white'>New WolffsPoint</PoppinsText>
                        </AppButton>

                        {hasJoinedAGame && (
                            <JoinGameButton onPress={showModal} />
                        )}
                    </ContainerRow>
                </ContainerCol>
            </ContainerCol>

            {isModalShowing && (
                <Animated.View>
                    <ContainerCol className='absolute w-full h-full bg-black/50 justify-center items-center' >
                        <TouchableOpacity onPress={hideModal} className='w-full h-full z-[-10] absolute' />
                        <ContainerCol className='bg-background p-6 rounded border-2 border-border'>
                            <PoppinsText>Code:</PoppinsText>
                            <PoppinsTextInput
                                placeholder="Enter game code"
                                className="w-full border border-subtle-border p-2"
                                value={gameCode}
                                onChangeText={setGameCode}
                            />
                            <AppButton variant="black" className="h-10 w-20" onPress={() => joinGame(gameCode)}>
                                <PoppinsText weight='medium' color='white'>Join</PoppinsText>
                            </AppButton>
                        </ContainerCol>
                    </ContainerCol>
                </Animated.View>
            )}



        </View >
    );
};

export default MainPage;
