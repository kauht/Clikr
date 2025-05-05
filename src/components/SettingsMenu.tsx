import { useEffect, useRef } from 'react';

interface SettingsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  customKey?: string;
  setIsCustomKeyModalOpen: (isOpen: boolean) => void;
  theme: string;
  setTheme: (theme: string) => void;
}

const SettingsMenu = ({ isOpen, onClose, customKey, setIsCustomKeyModalOpen, theme, setTheme }: SettingsMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 dark:bg-black/20 backdrop-blur-sm z-50">
      <div
        ref={menuRef}
        className="
          bg-white dark:bg-[#1e1e2a] backdrop-blur-md
          w-[90%] max-w-md
          rounded-xl
          border border-gray-200/50 dark:border-gray-700/50
          shadow-xl shadow-purple-500/5
          p-6
          transform transition-all duration-200
          animate-in fade-in slide-in-from-bottom-4
        "
      >
        <div className="flex justify-center items-center mb-6">
          <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">Settings</h2>
        </div>

        <div className="space-y-6">
          {/* Hotkey Settings */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Hotkey</label>
            <div className="flex items-center space-x-2">
              <div className="bg-gray-100 dark:bg-[#121218] px-3 py-1.5 rounded-md text-sm text-gray-800 dark:text-gray-200 border border-gray-300/50 dark:border-gray-600/50">
                F6
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">(Coming soon)</span>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Theme</label>
            <select 
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full bg-gray-100 dark:bg-[#121218] border border-gray-300/50 dark:border-gray-600/50 rounded-lg px-4 py-2.5 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-transparent focus:border-gray-300/50 dark:focus:border-gray-600/50 transition-all appearance-none cursor-pointer hover:bg-gray-200/80 dark:hover:bg-[#121218]/80"
            >
              <option>System</option>
              <option>Dark</option>
              <option>Light</option>
            </select>
          </div>

          {/* Custom Click Keybind */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Custom Click Keybind</label>
            <button
              className="w-full bg-gray-100 dark:bg-[#121218] border border-gray-300/50 dark:border-gray-600/50 rounded-lg px-4 py-2.5 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-200/80 dark:hover:bg-[#121218]/80 transition-all cursor-pointer text-left"
              onClick={() => setIsCustomKeyModalOpen(true)}
            >
              {customKey || 'Click to set key'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;