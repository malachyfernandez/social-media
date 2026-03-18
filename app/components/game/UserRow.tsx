import React, { useState } from 'react';
import PoppinsText from '../ui/text/PoppinsText';
import InlineEditableText from '../ui/forms/InlineEditableText';
import Column from '../layout/Column';
import Row from '../layout/Row';
import CustomCheckbox from '../ui/CustomCheckbox';
import Animated, { FadeInLeft, FadeInRight, FadeOutDown, FadeOutLeft, FadeOutRight, Easing, FadeInDown, FadeOutUp } from 'react-native-reanimated';

interface UserRowProps {
    user: {
        realName: string;
        email: string;
        userId: string | "NOT-JOINED";
        role: string;
        playerData: {
            livingState: 'alive' | 'dead';
            extraColumns?: string[];
        };
        days: Array<{
            votes?: string[];
            actions?: string[];
            extraColumns?: string[];
        }>;
    };
    index: number;
    isLast: boolean;
    setLivingState: (userIndex: number, newLivingState: 'alive' | 'dead') => void;
    setExtraColumnValue?: (userIndex: number, columnIndex: number, newValue: string) => void;
    userTableColumnVisibility?: {
        extraUserColumns: boolean[];
        extraDayColumns: boolean[];
    };
    onEditStart?: () => void;
    onEditEnd?: () => void;
    isEditing?: boolean;
}


const UserRow = ({ user, index, isLast, setLivingState, setExtraColumnValue, userTableColumnVisibility, onEditStart, onEditEnd, isEditing }: UserRowProps) => {
    const [editingColumns, setEditingColumns] = useState<Record<number, boolean>>({});

    const toggleLivingState = () => {
        const newLivingState = user.playerData.livingState === 'alive' ? 'dead' : 'alive';
        setLivingState(index, newLivingState);
    };

    const isDead = user.playerData.livingState === 'dead';

    const handleColumnEditStart = (columnIndex: number) => {
        setEditingColumns(prev => ({ ...prev, [columnIndex]: true }));
        onEditStart?.();
    };

    const handleColumnEditEnd = (columnIndex: number) => {
        setEditingColumns(prev => ({ ...prev, [columnIndex]: false }));
        onEditEnd?.();
    };

    return (
        <Row gap={0} className={` h-12 w-min ${isEditing ? 'z-50' : ''}`}>
            <Column className={`w-12 h-full border border-subtle-border items-center justify-center ${isLast ? 'rounded-bl-lg' : ''}`}>
                <CustomCheckbox checked={isDead} onChange={toggleLivingState} />
            </Column>
            <Column gap={0} className='w-28 h-full border border-subtle-border items-center justify-center'>
                {/* <InlineEditableText
                    value={user.realName || ''}
                    onChange={(newValue) => }}
                    placeholder='Unnamed player'
                    className='mb-[-4px] w-20 text-center text-nowrap overflow-hidden'
                    weight='medium'
                /> */}
                <PoppinsText weight='medium'>{user.realName || 'No Name'}</PoppinsText>
                <PoppinsText varient='subtext'>{user.role || 'No role'}</PoppinsText>
            </Column>

            {user.playerData.extraColumns?.map((column, columnIndex) => {
                if (!userTableColumnVisibility?.extraUserColumns[columnIndex]) return null;

                const visibleColumns = user.playerData.extraColumns?.filter((_, idx) => userTableColumnVisibility?.extraUserColumns[idx]) || [];
                const visibleIndex = visibleColumns.indexOf(column);
                const isLastVisibleColumn = visibleIndex === visibleColumns.length - 1;

                return (
                    <Animated.View
                        className={`${editingColumns[columnIndex] ? 'z-50' : ''}`}
                        key={columnIndex}
                        entering={
                            FadeInDown.duration(100).easing(Easing.ease)
                        }
                        exiting={
                            FadeOutUp.duration(100).easing(Easing.ease)
                        }
                    >
                        <Column className={`w-28 h-full border border-subtle-border items-center justify-center ${isLast && isLastVisibleColumn ? 'rounded-br-lg' : ''} `}>
                            <InlineEditableText
                                value={column}
                                onChange={(newValue) => setExtraColumnValue?.(index, columnIndex, newValue)}
                                placeholder='UNSET'
                                className='w-20 text-center text-nowrap overflow-hidden'
                                weight='medium'
                                onEditStart={() => handleColumnEditStart(columnIndex)}
                                onEditEnd={() => handleColumnEditEnd(columnIndex)}
                            />
                        </Column>
                    </Animated.View>
                );
            })}
        </Row>
    );
};

export default UserRow;
