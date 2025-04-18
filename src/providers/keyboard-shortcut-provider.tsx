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

  const normalizeKey = (key: string) => {
    return key.toLowerCase()
      .replace("ctrl", "control")
      .replace("esc", "escape")
      .replace("del", "delete")
      .replace("plus", "+")
      .replace("minus", "-");
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const keys = [];
    if (event.ctrlKey) keys.push("control");
    if (event.altKey) keys.push("alt");
    if (event.shiftKey) keys.push("shift");
    if (event.metaKey) keys.push("meta");
    
    // Ignorar combinações que podem conflitar com o sistema
    if (keys.includes("alt") || keys.includes("meta")) return;
    
    keys.push(event.key.toLowerCase());
    
    const shortcutKey = keys.join("+");
    const handler = shortcutsRef.current[shortcutKey];
    
    if (handler) {
      event.preventDefault();
      handler(event);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const registerShortcut = (key: string, callback: ShortcutHandler) => {
    const normalizedKey = normalizeKey(key);
    shortcutsRef.current[normalizedKey] = callback;
  };

  const unregisterShortcut = (key: string) => {
    const normalizedKey = normalizeKey(key);
    delete shortcutsRef.current[normalizedKey];
  };

  return (
    <KeyboardShortcutContext.Provider value={{ registerShortcut, unregisterShortcut }}>
      {children}
    </KeyboardShortcutContext.Provider>
  );
};

export const useKeyboardShortcut = (key: string, callback: ShortcutHandler) => {
  const context = useContext(KeyboardShortcutContext);

  useEffect(() => {
    if (!context) return;
    context.registerShortcut(key, callback);
    return () => context.unregisterShortcut(key);
  }, [key, callback, context]);
};