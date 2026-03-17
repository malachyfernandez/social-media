import React, { PropsWithChildren, useState } from 'react';
import { Button } from 'heroui-native/button';
import { Dialog } from 'heroui-native/dialog';
import { View } from 'react-native';
import Column from './layout/Column';
import PoppinsText from './ui/text/PoppinsText';
import { useUserVariable } from 'hooks/useUserVariable';
import { useUserListGet } from 'hooks/useUserListGet';
import { useUserListSet } from 'hooks/useUserListSet';
import { GameInfo } from 'types/games';
import TopSiteBar from './layout/TopSiteBar';
import ChooseGamePicker from './game/ChooseGamePicker';
import GamePage from './game/GamePage';
import PoppinsTextInput from './ui/forms/PoppinsTextInput';
import JoinHandler from './ui/forms/JoinHandler';



type FontWeight = 'regular' | 'medium' | 'bold';

interface MainPageProps extends PropsWithChildren {
    className?: string;
}

const MainPage: React.FC<MainPageProps> = ({
    className = '',
}) => {
    const [isHeroDialogOpen, setIsHeroDialogOpen] = useState(false);

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

    const userId = userData.value.userId || "";

    const myGames = useUserListGet<GameInfo>({
        key: "games",
        userIds: [userId],
    });

    const [activeGameId, setActiveGameId] = useUserVariable<string>({
        key: "activeGameId",
        defaultValue: "",
    });

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
            privacy: "PUBLIC",
        });
    }

    const setUserListItem = useUserListSet();
    const isInAGame = activeGameId.value !== "";

    return (

        <View className=' justify-between w-full h-full'>
            <View className='absolute right-4 top-20 z-10'>
                {/* <Dialog isOpen={isHeroDialogOpen} onOpenChange={setIsHeroDialogOpen}>
                    <Dialog.Trigger asChild>
                        <Button>Open HeroUI Dialog</Button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                        <Dialog.Overlay className='bg-black/20' />
                        
                        <Dialog.Content className='bg-background rounded border-2 border-border'>

                            <Dialog.Close className='w-10 h-10 bg-accent-hover absolute right-4 top-4 z-10' iconProps={{ color: 'background' }} />

                            <Column>
                                <DialogHeader
                                    text="Join a Game"
                                    subtext="Enter a game code to join."
                                />

                                
                                <PoppinsTextInput
                                    placeholder="Enter game code"
                                    className="w-full border border-subtle-border p-2"
                                    value={gameCode}
                                    onChangeText={setGameCode}
                                />
                                <JoinHandler onJoin={handleJoin} gameCode={gameCode} />
                                <PoppinsText varient='subtext'>
                                    This dialog was opened from a HeroUI Native button inside `MainPage.tsx`.
                                </PoppinsText>
                            </Column>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog> */}
            </View>

            <TopSiteBar isInAGame={isInAGame} setActiveGameId={setActiveGameId} />
            {!isInAGame ? (
                <ChooseGamePicker
                    activeGameId={activeGameId.value}
                    setActiveGameId={setActiveGameId}
                    myGames={myGames}
                    addNewGame={addNewGame}
                />
            ) : (
                <GamePage
                    gameId={activeGameId.value}
                    currentUserId={userId}
                />
            )}
        </View>
    );
};

export default MainPage;
