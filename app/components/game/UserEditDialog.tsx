import React, { useState } from 'react';
import ConvexDialog from '../ui/dialog/ConvexDialog';
import Column from '../layout/Column';
import AppButton from '../ui/buttons/AppButton';
import PoppinsText from '../ui/text/PoppinsText';
import PoppinsTextInput from '../ui/forms/PoppinsTextInput';
import DialogHeader from '../ui/dialog/DialogHeader';
import { View } from 'react-native';
import { useUserList } from 'hooks/useUserList';
import { RoleTableItem } from 'types/roleTable';
import { UserTableItem } from 'types/playerTable';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../ui/select';

interface UserEditDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    userIndex: number;
    currentRealName: string;
    currentEmail: string;
    currentRole: string;
    onPress: () => void;
    gameId: string;
}

const UserEditDialog = ({
    isOpen,
    onOpenChange,
    userIndex,
    currentRealName,
    currentEmail,
    currentRole,
    onPress,
    gameId
}: UserEditDialogProps) => {
    const [realName, setRealName] = useState(currentRealName || '');
    const [email, setEmail] = useState(currentEmail || '');
    const [role, setRole] = useState(currentRole || '');

    // Use the same userList as PlayerTable - this is the cloud variable benefit!
    const [userTable, setUserTable] = useUserList<UserTableItem[]>({
        key: "userTable",
        itemId: gameId,
        privacy: "PUBLIC",
    });

    const users = userTable?.value ?? [];

    const [roleTable, setRoleTable] = useUserList<RoleTableItem[]>({
        key: "roleTable",
        itemId: gameId,
        privacy: "PUBLIC",
    });

    const roleOptions = (roleTable?.value ?? [])
        .filter((roleItem) => roleItem.role.trim().length > 0 && roleItem.isVisible !== false)
        .map((roleItem) => ({
            value: roleItem.role,
            label: roleItem.role,
        }));

    const selectedRoleOption = role ? { value: role, label: role } : undefined;

    const handleRoleChange = (option?: { value: string; label: string }) => {
        setRole(option?.value ?? '');
    };

    const handleSubmit = () => {
        // Local functions using the same cloud variable as PlayerTable
        const updatedUsers = [...users];
        if (userIndex >= 0 && userIndex < updatedUsers.length) {
            updatedUsers[userIndex] = {
                ...updatedUsers[userIndex],
                realName: realName.trim(),
                email: email.trim(),
                role: role.trim()
            };
            setUserTable(updatedUsers);
        }
        
        onOpenChange(false);
    };

    const handleCancel = () => {
        setRealName(currentRealName || '');
        setEmail(currentEmail || '');
        setRole(currentRole || '');
        onOpenChange(false);
    };

    // HERE

    return (
        <ConvexDialog.Root isOpen={isOpen} onOpenChange={onOpenChange}>
            <ConvexDialog.Trigger asChild>
                <View>
                    {/* This will be replaced by the actual pressable in UserRow */}
                </View>
            </ConvexDialog.Trigger>
            <ConvexDialog.Portal>
                <ConvexDialog.Overlay />

                <ConvexDialog.Content>
                    <ConvexDialog.Close iconProps={{ color: 'rgb(246, 238, 219)' }} className="w-10 h-10 bg-accent-hover absolute right-4 top-4 z-10" />

                    <Column>
                        <DialogHeader
                            text={`Edit User`}
                            subtext={`Set the user details`}
                        />
                        <Column gap={2}>
                            <PoppinsText weight='medium'>Real Name</PoppinsText>
                            <PoppinsTextInput
                                placeholder="Enter real name..."
                                className="w-full border border-subtle-border p-2"
                                value={realName}
                                onChangeText={setRealName}
                            />

                            <PoppinsText weight='medium'>Email</PoppinsText>
                            <PoppinsTextInput
                                placeholder="Enter email..."
                                className="w-full border border-subtle-border p-2"
                                value={email}
                                onChangeText={setEmail}
                            />

                            <PoppinsText weight='medium'>Role</PoppinsText>
                            <Select
                                value={selectedRoleOption}
                                onValueChange={handleRoleChange}
                                defaultValue={selectedRoleOption}
                            >
                                <SelectTrigger className='w-full bg-white'>
                                    {/* <SelectValue placeholder='Select a role' className='text-text' /> */}
                                    <PoppinsText varient="default" weight='medium'>
                                        {`${selectedRoleOption ? selectedRoleOption.label : 'Select a role'}`}
                                    </PoppinsText>
                                </SelectTrigger>
                                <SelectContent className='w-full bg-primary-accent'>
                                    <SelectGroup>
                                        {/* <SelectLabel className='text-text'>Available Roles</SelectLabel> */}
                                        {roleOptions.length ? (
                                            roleOptions.map((roleOption) => (
                                                <SelectItem
                                                    key={roleOption.value}
                                                    value={roleOption.value}
                                                    label={roleOption.label}
                                                    className='!bg-primary-accent hover:!bg-accent-hover focus:!bg-accent-hover active:!bg-accent-hover text-text'
                                                />

                                            ))
                                        ) : (
                                            <View className='px-4 py-4'>
                                                <PoppinsText varient='subtext' className='text-center opacity-60' color='black'>
                                                    No roles available
                                                </PoppinsText>
                                            </View>
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Column>

                        <Column gap={2}>
                            <AppButton className='w-34 h-10' variant='black' onPress={handleSubmit}>
                                <PoppinsText color='white' weight='medium'>Save</PoppinsText>
                            </AppButton>
                            <AppButton className='w-34 h-10' variant='outline-alt' onPress={handleCancel}>
                                <PoppinsText color='black' weight='medium'>Cancel</PoppinsText>
                            </AppButton>
                        </Column>
                    </Column>
                </ConvexDialog.Content>
            </ConvexDialog.Portal>
        </ConvexDialog.Root>
    );
};

export default UserEditDialog;
