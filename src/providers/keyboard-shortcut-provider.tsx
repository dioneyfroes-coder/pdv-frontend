import { createContext, useContext, useEffect, useRef } from "react";

type ShortcutHandler = (event: KeyboardEvent) => void;

interface ShortcutMap {
  [key: string]: ShortcutHandler;
}

const KeyboardShortcutContext = createContext<{
  registerShortcut: (key: string, callback: ShortcutHandler) => void;
  unregisterShortcut: (key: string) => void;
} | null>(null);

export const KeyboardShortcutProvider = ({ children }: { children: React.ReactNode }) => {
  const shortcutsRef = useRef<ShortcutMap>({});

  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    if (shortcutsRef.current[key]) {
      event.preventDefault();
      shortcutsRef.current[key](event);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const registerShortcut = (key: string, callback: ShortcutHandler) => {
    shortcutsRef.current[key.toLowerCase()] = callback;
  };

  const unregisterShortcut = (key: string) => {
    delete shortcutsRef.current[key.toLowerCase()];
  };

  return (
    <KeyboardShortcutContext.Provider value={{ registerShortcut, unregisterShortcut }}>
      {children}
    </KeyboardShortcutContext.Provider>
  );
};

// Hook para uso nos componentes
export const useKeyboardShortcut = (key: string, callback: ShortcutHandler) => {
  const context = useContext(KeyboardShortcutContext);

  useEffect(() => {
    if (!context) return;
    context.registerShortcut(key, callback);
    return () => context.unregisterShortcut(key);
  }, [key, callback]);
};
