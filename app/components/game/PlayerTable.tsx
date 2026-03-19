import React, { useEffect, useState } from 'react';
import PoppinsText from '../ui/text/PoppinsText';
import { useUserList } from 'hooks/useUserList';
import Column from '../layout/Column';
import AppButton from '../ui/buttons/AppButton';
import Row from '../layout/Row';
import UserRow from './UserRow';
import TitleRow from './TitleRow';
import { useUndoRedo } from 'hooks/useUndoRedo';
import { PlayerData, DayData, UserTableItem, UserTableTitle, UserTableColumnVisibility } from 'types/playerTable';

interface PlayerTableProps {
    gameId: string;
    doSync: boolean;
    setDoSync: (value: boolean) => void;
    isBeingEdited: boolean;
    setIsBeingEdited: (value: boolean) => void;
    className?: string;
    dayDatesArray: Date[];
}

const PlayerTable = ({ gameId, doSync, setDoSync, isBeingEdited, setIsBeingEdited, className, dayDatesArray }: PlayerTableProps) => {
    const { executeCommand } = useUndoRedo();
    const [editingRow, setEditingRow] = useState<'title' | number | null>(null);

    const handleRowEditStart = (rowType: 'title' | number) => {
        setEditingRow(rowType);
        setIsBeingEdited(true);
    };

    const handleRowEditEnd = () => {
        setEditingRow(null);
        setIsBeingEdited(false);
    };

    const [userTable, setUserTable] = useUserList<UserTableItem[]>({
        key: "userTable",
        itemId: gameId,
        privacy: "PUBLIC",
    });

    const users = userTable?.value ?? [];

    const [userTableTitle, setUserTableTitle] = useUserList<UserTableTitle>({
        key: "userTableTitle",
        itemId: gameId,
        privacy: "PUBLIC",
    });

    const [userTableColumnVisibility, setUserTableColumnVisibility] = useUserList<UserTableColumnVisibility>({
        key: "userTableColumnVisibility",
        itemId: gameId,
        privacy: "PUBLIC",
    });

    useEffect(() => {
        if (!doSync) return;

        syncAllColumnsToTitles();
        setDoSync(false);
    }, [doSync]);


    const syncAllColumnsToTitles = () => {
        const currentTitles = userTableTitle?.value ?? { extraUserColumns: [], extraDayColumns: [] };
        const currentVisibility = userTableColumnVisibility?.value ?? { extraUserColumns: [], extraDayColumns: [] };

        // Sync extraUserColumns visibility to match titles length
        const targetUserLength = currentTitles.extraUserColumns.length;
        const currentUserVisibility = currentVisibility.extraUserColumns;
        const syncedUserVisibility = Array(targetUserLength).fill(true).map((_, index) =>
            currentUserVisibility[index] ?? true
        );

        // Sync extraDayColumns visibility to match titles length
        const targetDayLength = currentTitles.extraDayColumns.length;
        const currentDayVisibility = currentVisibility.extraDayColumns;
        const syncedDayVisibility = Array(targetDayLength).fill(true).map((_, index) =>
            currentDayVisibility[index] ?? true
        );

        // Update visibility
        const updatedVisibility = {
            extraUserColumns: syncedUserVisibility,
            extraDayColumns: syncedDayVisibility
        };
        setUserTableColumnVisibility(updatedVisibility);

        // Sync user table rows to match titles length and ensure all users have correct number of days
        const targetDaysLength = dayDatesArray.length;
        const updatedUsers = users.map(user => {
            const userExtraColumns = user.playerData.extraColumns || [];
            const syncedUserExtraColumns = Array(targetUserLength).fill("").map((_, index) =>
                userExtraColumns[index] ?? ""
            );

            // Ensure user has the correct number of days
            const currentDays = user.days || [];
            const syncedDays = Array(targetDaysLength).fill(null).map((_, index) => {
                const existingDay = currentDays[index];
                const dayExtraColumns = existingDay?.extraColumns || [];
                const syncedDayExtraColumns = Array(targetDayLength).fill("").map((_, colIndex) =>
                    dayExtraColumns[colIndex] ?? ""
                );

                return {
                    vote: existingDay?.vote || "",
                    action: existingDay?.action || "",
                    extraColumns: syncedDayExtraColumns
                };
            });

            return {
                ...user,
                playerData: {
                    ...user.playerData,
                    extraColumns: syncedUserExtraColumns
                },
                days: syncedDays
            };
        });

        setUserTable(updatedUsers);

        return { updatedVisibility, updatedUsers };
    };



    const setLivingState = (userIndex: number, newLivingState: 'alive' | 'dead') => {
        const updatedUsers = [...users];
        if (userIndex >= 0 && userIndex < updatedUsers.length) {
            updatedUsers[userIndex] = {
                ...updatedUsers[userIndex],
                playerData: {
                    ...updatedUsers[userIndex].playerData,
                    livingState: newLivingState
                }
            };
            setUserTable(updatedUsers);
        }
    };

    const UNDOABLEsetLivingState = (userIndex: number, newLivingState: 'alive' | 'dead') => {
        const oldLivingState = users[userIndex]?.playerData.livingState;

        executeCommand({
            action: () => setLivingState(userIndex, newLivingState),
            undoAction: () => setLivingState(userIndex, oldLivingState),
            description: "Change Living State"
        });
    };

    const setExtraColumnValue = (userIndex: number, extraColumnIndex: number, newExtraColumnValue: string) => {
        const updatedUsers = [...users];
        if (userIndex >= 0 && userIndex < updatedUsers.length) {
            const currentExtraColumns = updatedUsers[userIndex].playerData.extraColumns || [];
            const updatedExtraColumns = [...currentExtraColumns];
            updatedExtraColumns[extraColumnIndex] = newExtraColumnValue;

            updatedUsers[userIndex] = {
                ...updatedUsers[userIndex],
                playerData: {
                    ...updatedUsers[userIndex].playerData,
                    extraColumns: updatedExtraColumns
                }
            };
            setUserTable(updatedUsers);
        }
    };

    const UNDOABLEsetExtraColumnValue = (userIndex: number, extraColumnIndex: number, newExtraColumnValue: string) => {
        const oldValue = users[userIndex]?.playerData.extraColumns?.[extraColumnIndex] || "";

        executeCommand({
            action: () => setExtraColumnValue(userIndex, extraColumnIndex, newExtraColumnValue),
            undoAction: () => setExtraColumnValue(userIndex, extraColumnIndex, oldValue),
            description: "Set Column Value"
        });
    };

    const setColumnTitle = (columnIndex: number, newTitle: string) => {
        const currentTitles = userTableTitle?.value ?? { extraUserColumns: [], extraDayColumns: [] };
        const updatedExtraUserColumns = [...currentTitles.extraUserColumns];
        updatedExtraUserColumns[columnIndex] = newTitle;

        const updatedTitles = {
            ...currentTitles,
            extraUserColumns: updatedExtraUserColumns
        };
        setUserTableTitle(updatedTitles);
    };

    const UNDOABLEsetColumnTitle = (columnIndex: number, newTitle: string) => {
        const currentTitles = userTableTitle?.value ?? { extraUserColumns: [], extraDayColumns: [] };
        const oldTitle = currentTitles.extraUserColumns[columnIndex] || "";

        executeCommand({
            action: () => setColumnTitle(columnIndex, newTitle),
            undoAction: () => setColumnTitle(columnIndex, oldTitle),
            description: "Set Column Title"
        });
    };

    const addColumn = (title?: string, values?: string[], index?: number | "Last") => {
        // Add new column title
        const currentTitles = userTableTitle?.value ?? { extraUserColumns: [], extraDayColumns: [] };
        const newTitle = title ?? `Column ${currentTitles.extraUserColumns.length + 1}`;

        // ALWAYS add to the end
        const updatedTitles = {
            ...currentTitles,
            extraUserColumns: [
                ...currentTitles.extraUserColumns,
                newTitle
            ]
        };
        setUserTableTitle(updatedTitles);

        // Add new column value to each user at the end
        const updatedUsers = users.map((user, userIndex) => ({
            ...user,
            playerData: {
                ...user.playerData,
                extraColumns: [
                    ...(user.playerData.extraColumns || []),
                    values?.[userIndex] ?? ""
                ]
            }
        }));
        setUserTable(updatedUsers);

        // Add visibility for new column (default to visible)
        const currentVisibility = userTableColumnVisibility?.value ?? { extraUserColumns: [], extraDayColumns: [] };
        const updatedVisibility = {
            ...currentVisibility,
            extraUserColumns: [
                ...currentVisibility.extraUserColumns,
                true
            ]
        };
        setUserTableColumnVisibility(updatedVisibility);
    };

    const UNDOABLEaddColumn = () => {
        executeCommand({
            action: () => addColumn(),
            undoAction: () => {
                const currentTitles = userTableTitle?.value ?? { extraUserColumns: [], extraDayColumns: [] };
                setColumnVisibility(currentTitles.extraUserColumns.length, false);
            },
            description: "Add Column"
        });
    };

    const setColumnVisibility = (columnIndex: number, visibility: boolean) => {
        // Update column visibility
        const currentVisibility = userTableColumnVisibility?.value ?? { extraUserColumns: [], extraDayColumns: [] };
        const updatedVisibility = {
            ...currentVisibility,
            extraUserColumns: currentVisibility.extraUserColumns.map((v, index) =>
                index === columnIndex ? visibility : v
            )
        };
        setUserTableColumnVisibility(updatedVisibility);
    };

    const UNDOABLEsetColumnVisibility = (columnIndex: number, visibility: boolean) => {
        const currentVisibility = userTableColumnVisibility?.value ?? { extraUserColumns: [], extraDayColumns: [] };
        const oldVisibility = currentVisibility.extraUserColumns[columnIndex] ?? true;

        executeCommand({
            action: () => setColumnVisibility(columnIndex, visibility),
            undoAction: () => setColumnVisibility(columnIndex, oldVisibility),
            description: visibility ? "Show Column" : "Hide Column"
        });
    };

    return (
        <Column gap={0}>
            <Row gap={0}>
                <Column gap={0} className={`border-border border-2 rounded w-min ${className || ''}`}>
                    <TitleRow
                        userTableTitle={userTableTitle?.value}
                        userTableColumnVisibility={userTableColumnVisibility?.value}
                        setColumnTitle={UNDOABLEsetColumnTitle}
                        setColumnVisibility={UNDOABLEsetColumnVisibility}
                        onEditStart={() => handleRowEditStart('title')}
                        onEditEnd={handleRowEditEnd}
                        isEditing={editingRow === 'title'}
                    />

                    {users.map((user, index) => (
                        <UserRow
                            key={index}
                            user={user}
                            index={index}
                            isLast={index === users.length - 1}
                            setLivingState={UNDOABLEsetLivingState}
                            setExtraColumnValue={UNDOABLEsetExtraColumnValue}
                            userTableColumnVisibility={userTableColumnVisibility?.value}
                            onEditStart={() => handleRowEditStart(index)}
                            onEditEnd={handleRowEditEnd}
                            isEditing={editingRow === index}
                        />
                    ))}
                </Column>
                <Row className='w-12 h-12 bg-light items-center justify-center -z-10'>
                    <AppButton variant="green" className='w-8 max-h-8 ' onPress={UNDOABLEaddColumn}>
                        <PoppinsText weight='bold' color='white' className='text-xl mt-[-0.1rem] '>+</PoppinsText>
                    </AppButton>
                </Row>

            </Row>

        </Column>
    );
};

export default PlayerTable;
