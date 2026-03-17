import React, { useEffect } from 'react';
import PoppinsText from '../ui/text/PoppinsText';
import { useUserList } from 'hooks/useUserList';
import Column from '../layout/Column';
import AppButton from '../ui/buttons/AppButton';
import prettyLog from 'utils/prettyLog';
import ChangeDateInfo from './ChangeDateInfo';
import Row from '../layout/Row';



interface OperatorsPlayerPageProps {
    currentUserId: string;
    gameId: string;
}

type PlayerData = {
    livingState: 'alive' | 'dead';
    extraColumns?: string[];
};

type DayData = {
    votes?: string[];
    actions?: string[];
    extraColumns?: string[];
};

type UserTableItem = {
    userId: string;
    role: string;
    playerData: PlayerData;
    days: DayData[];
};

type PlayerTableItem = {
    email: string;
    role: string;
};

const OperatorsPlayerPage = ({ currentUserId, gameId }: OperatorsPlayerPageProps) => {

    const [playerTable, setPlayerTable] = useUserList<PlayerTableItem[]>({
        key: "playerTable",
        itemId: gameId,
        defaultValue: [],
        privacy: "PUBLIC",
    });

    const [userTable, setUserTable] = useUserList<UserTableItem[]>({
        key: "userTable",
        itemId: gameId,
        defaultValue: [],
        privacy: "PUBLIC",
    });
    const users = userTable?.value ?? [];

    const addUser = () => {
        // setUserTable([...users, { realName: "John Doe", email: "john.doe@example.com", role: "player", playerData: { livingState: "alive", extraColumns: [] } }]);
    };

    const [startingDate, setStartingDate] = useUserList({
        key: "startingDate",
        itemId: gameId,
        privacy: "PUBLIC",
        defaultValue: "Unset",
    });

    const [realDaysPerInGameDay, setRealDaysPerInGameDay] = useUserList({
        key: "realDaysPerInGameDay",
        itemId: gameId,
        privacy: "PUBLIC",
        defaultValue: "2",
    });

    let isNoStartingDate = false;

    if (!startingDate.state.isSyncing) {
        isNoStartingDate = (startingDate.value === "Unset");
    }






    const isUsersEmpty = users.length === 0;


    // prettyLog(users);


    return (
        <Column>
            {/* if startingDate.value === "Unset" show dialog */}
            {isNoStartingDate ? (
                <Row className='justify-center w-full'>
                    <ChangeDateInfo gameId={gameId} isGettingStarted={true} />
                </Row>
            ) : (
                <>
                <PoppinsText>Day:1</PoppinsText>
                <PoppinsText>startingDate: {startingDate.value}</PoppinsText>
                <PoppinsText>realDaysPerInGameDay: {realDaysPerInGameDay.value}</PoppinsText>
                    <ChangeDateInfo gameId={gameId} isGettingStarted={false} />

                    {users.map((user, index) => (
                        <PoppinsText key={index}>{user.userId || 'Unnamed player'}</PoppinsText>
                    ))}
                    <AppButton variant="black" className='w-12 h-12'>
                        <PoppinsText weight='bold' className='text-white text-2xl'>+</PoppinsText>
                    </AppButton>
                </>
            )}
        </Column>
    );
};

export default OperatorsPlayerPage;
