import { useEffect, useRef } from 'react';

interface SettingsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  customKey?: string;
  setIsCustomKeyModalOpen: (isOpen: boolean) => void;
}

const SettingsMenu = ({ isOpen, onClose, customKey, setIsCustomKeyModalOpen }: SettingsMenuProps) => {
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
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
      <div
        ref={menuRef}
        className="
          bg-gray-800/90 backdrop-blur-md
          w-[90%] max-w-md
          rounded-xl
          border border-gray-700/50
          shadow-xl shadow-purple-500/5
          p-6
          transform transition-all duration-200
          animate-in fade-in slide-in-from-bottom-4
        "
      >
        <div className="flex justify-center items-center mb-6">
          <h2 className="text-lg font-medium text-gray-200">Settings</h2>
        </div>

        <div className="space-y-6">
          {/* Hotkey Settings */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Hotkey</label>
            <div className="flex items-center space-x-2">
              <div className="bg-gray-700/50 px-3 py-1.5 rounded-md text-sm text-gray-200 border border-gray-600/50">
                F6
              </div>
              <span className="text-sm text-gray-400">(Coming soon)</span>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Theme</label>
            <select className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-transparent focus:border-gray-600/50 transition-all appearance-none cursor-pointer">
              <option>System</option>
              <option>Dark</option>
              <option>Light</option>
            </select>
          </div>

          {/* Custom Click Keybind */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Custom Click Keybind</label>
            <button
              className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-2.5 text-sm text-gray-200 hover:bg-gray-600/50 transition-all cursor-pointer text-left"
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