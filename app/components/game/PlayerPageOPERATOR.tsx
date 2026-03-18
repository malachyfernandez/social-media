import React, { useState } from 'react';
import PoppinsText from '../ui/text/PoppinsText';
import { useUserList } from 'hooks/useUserList';
import Column from '../layout/Column';
import PlayerTable from './PlayerTable';
import { UserTableItem } from 'types/playerTable';
import AppButton from '../ui/buttons/AppButton';






interface PlayerPageOPERATORProps {
    currentUserId: string;
    gameId: string;
}


const PlayerPageOPERATOR = ({ currentUserId, gameId }: PlayerPageOPERATORProps) => {
    const [startingDate] = useUserList({
        key: "startingDate",
        itemId: gameId,
        privacy: "PUBLIC",
        defaultValue: "Unset",
    });

    const [userTable, setUserTable] = useUserList<UserTableItem[]>({
        key: "userTable",
        itemId: gameId,
        privacy: "PUBLIC",
    });

    const users = userTable?.value ?? [];





    const [doSync, setDoSync] = useState(false);


    const addUser = () => {
        const newUser: UserTableItem = {
            realName: "John Doe3",
            email: "john.doe@example.com",
            userId: "NOT-JOINED",
            role: "player",
            playerData: { livingState: "alive", extraColumns: ["Testing"] },
            days: [{ vote: "", action: "", extraColumns: [""] }]
        };
        setUserTable([...users, newUser]);
        setDoSync(true);
    };



    return (


        <Column>
            {/* if startingDate.value === "Unset" show dialog */}

            <>
                <PoppinsText>startingDate: {startingDate.value}</PoppinsText>
                {/*<PoppinsText>realDaysPerInGameDay: {realDaysPerInGameDay.value}</PoppinsText>
                    <ChangeDateInfo gameId={gameId} isGettingStarted={false} /> */}

                <PlayerTable gameId={gameId} doSync={doSync} setDoSync={setDoSync} />
                <AppButton variant="black" className='w-40 h-12' onPress={addUser}>
                    <PoppinsText weight='bold' className='text-white text-xl'>+</PoppinsText>
                    <PoppinsText weight='bold' className='text-white'>Add Player</PoppinsText>
                </AppButton>
            </>

        </Column>
    );
};

export default PlayerPageOPERATOR;
function syncAllColumnsToTitles() {
    throw new Error('Function not implemented.');
}

