import React from 'react';
import { Dialog } from 'heroui-native/dialog';
import { ConvexReactClient } from 'convex/react';
import { ConvexProvider } from 'convex/react';

// Create a singleton Convex client for all dialogs
const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!);

// Wrapper component that provides Convex context to Dialog content
const ConvexDialogContent = ({ children }: { children: React.ReactNode }) => {
    return (
        <ConvexProvider client={convex}>
            {children}
        </ConvexProvider>
    );
};

// Enhanced Dialog components with Convex context
export const ConvexDialog = {
    Root: Dialog,
    Trigger: Dialog.Trigger,
    Portal: Dialog.Portal,
    Overlay: Dialog.Overlay,
    Content: ({ children, ...props }: any) => (
        <ConvexDialogContent>
            <Dialog.Content {...props}>
                {children}
            </Dialog.Content>
        </ConvexDialogContent>
    ),
    Close: Dialog.Close,
    Title: Dialog.Title,
    Description: Dialog.Description,
};
