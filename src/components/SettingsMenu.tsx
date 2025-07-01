import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from './ui/select';

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <motion.div
            ref={menuRef}
            className="bg-section-light dark:bg-section-dark backdrop-blur-sm w-[96%] max-w-md rounded-xl border border-gray-300/50 dark:border-gray-700/50 shadow-xl shadow-purple-500/10 px-5 py-6 relative flex flex-col gap-5"
            initial={{ y: 32, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 32, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28, duration: 0.22 }}
          >
            <div className="flex flex-col items-center mb-1">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 tracking-tight mb-0.5">Settings</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">App Settings</p>
            </div>
            <div className="space-y-4 w-full">
              {/* Hotkey Settings */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-300">Hotkey</label>
                <div className="flex items-center space-x-2">
                  <div className="bg-gray-100 dark:bg-[#121218] px-2 py-1 rounded text-xs text-gray-800 dark:text-gray-200 border border-gray-300/50 dark:border-gray-600/50">
                    F6
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">(Coming soon)</span>
                </div>
              </div>
              {/* Theme Settings */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-0.5">Theme</label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className={`select-none w-full dark:bg-[#121218] border border-gray-300/50 dark:border-gray-700/50 rounded-lg px-4 py-2.5 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-0 focus:ring-transparent focus:border-transparent transition-all appearance-none cursor-pointer hover:bg-gray-200/80 dark:hover:bg-[#121218]/80 h-[40px]`}>
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent className={'bg-gray-100/90 dark:bg-[#121218]/90 backdrop-blur-md border border-gray-300/50 dark:border-gray-700/50 rounded-lg shadow-xl shadow-purple-500/5 dark:shadow-purple-500/10'}>
                    <SelectItem value="Dark" className="text-gray-800 dark:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-700/20">Dark</SelectItem>
                    <SelectItem value="Light" className="text-gray-800 dark:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-700/20">Light</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Custom Click Keybind */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-300">Custom Click Keybind</label>
                <button
                  className="w-full bg-gray-100 dark:bg-[#121218] border border-gray-300/50 dark:border-gray-600/50 rounded px-3 py-2 text-xs text-gray-800 dark:text-gray-200 hover:bg-gray-200/80 dark:hover:bg-[#121218]/80 transition-all cursor-pointer text-left"
                  onClick={() => setIsCustomKeyModalOpen(true)}
                >
                  {customKey || 'Click to set key'}
                </button>
              </div>
            </div>
            <button
              className="mt-1 w-full py-2 rounded bg-custom-purple text-white font-semibold text-sm shadow hover:bg-custom-purple-hover transition-all duration-200"
              onClick={onClose}
            >
              Done
            </button>
          </motion.div>
          <motion.div
            className="fixed inset-0 bg-black/30 dark:bg-black/40 backdrop-blur-sm -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            aria-hidden="true"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SettingsMenu;