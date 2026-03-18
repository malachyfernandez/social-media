import { useState, useCallback, useEffect, useRef } from 'react';
import { useToast, Toast } from 'heroui-native';

export interface UndoCommand {
  action: () => void;
  undoAction: () => void;
  description: string;
}

export const useUndoRedo = () => {
  const { toast } = useToast();

  const [undoStack, setUndoStack] = useState<UndoCommand[]>([]);
  const [redoStack, setRedoStack] = useState<UndoCommand[]>([]);

  const undoStackRef = useRef<UndoCommand[]>([]);
  const redoStackRef = useRef<UndoCommand[]>([]);

  const syncUndoStack = (next: UndoCommand[]) => {
    undoStackRef.current = next;
    setUndoStack(next);
  };

  const syncRedoStack = (next: UndoCommand[]) => {
    redoStackRef.current = next;
    setRedoStack(next);
  };

  const executeCommand = useCallback((command: UndoCommand) => {
    command.action();

    const nextUndo = [...undoStackRef.current, command];
    syncUndoStack(nextUndo);
    syncRedoStack([]);
  }, []);

  const undo = useCallback(() => {
    const currentUndo = undoStackRef.current;
    if (currentUndo.length === 0) return;

    const command = currentUndo[currentUndo.length - 1];
    command.undoAction();

    syncUndoStack(currentUndo.slice(0, -1));
    syncRedoStack([...redoStackRef.current, command]);

    toast.show({
      component: (props) => (
        <Toast variant="default" {...props}>
          <Toast.Title>Undo: {command.description}</Toast.Title>
          <Toast.Close className="absolute top-0 right-0" />
        </Toast>
      ),
      duration: 1000,
    });
  }, [toast]);

  const redo = useCallback(() => {
    const currentRedo = redoStackRef.current;
    if (currentRedo.length === 0) return;

    const command = currentRedo[currentRedo.length - 1];
    command.action();

    syncRedoStack(currentRedo.slice(0, -1));
    syncUndoStack([...undoStackRef.current, command]);

    toast.show({
      component: (props) => (
        <Toast variant="default" {...props}>
          <Toast.Title>Redo: {command.description}</Toast.Title>
          <Toast.Close className="absolute top-0 right-0" />
        </Toast>
      ),
      duration: 1000,
    });
  }, [toast]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;

      // Ignore if focused in input/textarea/contenteditable
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();

        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [undo, redo]);

  return {
    executeCommand,
    undo,
    redo,
    canUndo: undoStack.length > 0,
    canRedo: redoStack.length > 0,
  };
};
