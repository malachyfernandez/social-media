import React from 'react';
import Column from '../../layout/Column';
import PoppinsText from '../text/PoppinsText';

interface DialogHeaderProps {
    text: string;
    subtext?: string;
    className?: string;
}

const DialogHeader = ({ text, subtext, className }: DialogHeaderProps) => {
    return (
        <Column className={`mb-4 ${className || ''}`}>
            <PoppinsText weight='bold' className='text-xl text-center'>
                {text}
            </PoppinsText>
            {subtext && (
                <PoppinsText className='text-sm text-center opacity-70'>
                    {subtext}
                </PoppinsText>
            )}
        </Column>
    );
};

export default DialogHeader;
