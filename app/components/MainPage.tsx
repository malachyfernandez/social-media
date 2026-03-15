import React, { PropsWithChildren, useState } from 'react';

import { useUserVariable } from 'hooks/useUserVariable';
import { useSyncUserData } from 'hooks/useSyncUserData';
import Column from './layout/Column';
import { useClerk } from '@clerk/clerk-expo';
import { Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInLeft, FadeInRight, FadeInUp, FadeOut, FadeOutDown, FadeOutRight } from 'react-native-reanimated';
import AppButton from './ui/AppButton';
import JoinGameButton from './ui/JoinGameButton';
import Row from './layout/Row';
import PoppinsText from './ui/PoppinsText';
import { UserIcon } from './icons/UserIcon';
import { SadEmoji } from './icons/SadEmoji';
import PoppinsTextInput from './ui/PoppinsTextInput';
import JoinGameModal from './ui/JoinGameModal';
import GameList from './GameList';
import TopSiteBar from './TopSiteBar';
import NoGames from './NoGames';
import { useUserListSet } from 'hooks/useUserListSet';
import { useUserListGet } from 'hooks/useUserListGet';
import prettyLog from 'utils/prettyLog';
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

    
    const userId = userData.value.userId  || "";




    useSyncUserData(userData.value, setUserData);

    const { signOut } = useClerk();

    const [gamesTheyJoined, setGamesTheyJoined] = useUserVariable<string[]>({
        key: "gamesTheyJoined",
        defaultValue: [],
    });



    const hasJoinedAGame = (gamesTheyJoined?.value.length ? true : false);
    const isGamesLoading = gamesTheyJoined?.state.isSyncing;

    const [isModalShowing, setIsModalShowing] = useState(false);

    const [gameCode, setGameCode] = useState("");

    const showModal = () => {
        setIsModalShowing(true);
    }

    const hideModal = () => {
        setIsModalShowing(false);
    }

    const joinGame = (gameId: string) => {
        setGamesTheyJoined([...gamesTheyJoined.value, gameId]);
        hideModal();
    }

    const generateGameId = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    const addNewGame = () => {
        const newGameId = generateGameId();

        setUserListItem({
            key: "games",
            itemId: newGameId,
            value: {
                id: newGameId,
                name: "Game 1",
                description: "Description 1",
            },
            filterKey: "id",
        });
    }

    const setUserListItem = useUserListSet();

    const getMyGames = useUserListGet({
        key: "games",
        userIds: [userId],
    })

    prettyLog(getMyGames)

    return (
        <View className='justify-between w-full h-full'>

            <TopSiteBar />

            {/* main content */}
            <Column className='flex-1 h-full'>
                <Column className='flex-1 h-full'>
                    {!isGamesLoading && (

                        hasJoinedAGame ? (
                            <Animated.View
                                entering={FadeInDown.duration(600)}
                                exiting={FadeOutDown.duration(600)}
                            >
                                <ScrollView>
                                    <GameList
                                        gamesTheyJoined={gamesTheyJoined.value}
                                        setGamesTheyJoined={setGamesTheyJoined}
                                    />
                                </ScrollView>
                            </Animated.View>
                        ) : (
                            <Column className='items-center justify-center flex-1'>
                                <Animated.View
                                    entering={FadeInDown.duration(600)}
                                    exiting={FadeOutDown.duration(600)}
                                >
                                    <NoGames showModal={showModal} />
                                </Animated.View>
                            </Column>

                        )
                    )}

                </Column>

                {/* bottom bar */}
                <Column>
                    <Row className='p-6 border-t border-subtle-border justify-between'>
                        <AppButton variant="outline" className="h-12 w-48" onPress={addNewGame}>
                            <PoppinsText weight='medium' className='group-hover:text-white'>New WolffsPoint</PoppinsText>
                        </AppButton>

                        {hasJoinedAGame && (
                            <Animated.View
                                entering={FadeInRight.duration(100)}
                                exiting={FadeOutRight.duration(100)}
                            >
                                <JoinGameButton onPress={showModal} />
                            </Animated.View>
                        )}
                    </Row>
                </Column>
            </Column>

            {/* modal */}
            <JoinGameModal
                isVisible={isModalShowing}
                onHide={hideModal}
                onJoinGame={joinGame}
            />



        </View >
    );
};

export default MainPage;
