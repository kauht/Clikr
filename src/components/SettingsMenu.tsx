import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from './ui/select';
import { Check, ChevronDown } from 'lucide-react';
import { invoke } from '@tauri-apps/api/core';
import { createPortal } from 'react-dom';

interface SettingsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  customKey?: string;
  setIsCustomKeyModalOpen: (isOpen: boolean) => void;
  theme: string;
  setTheme: (theme: string) => void;
  hotkey: string;
  setHotkey: (key: string) => void;
}

const SettingsMenu = ({ isOpen, onClose, customKey, setIsCustomKeyModalOpen, theme, setTheme, hotkey, setHotkey }: SettingsMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isHotkeyModalOpen, setIsHotkeyModalOpen] = useState(false);

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

  useEffect(() => {
    if (!isHotkeyModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      setHotkey(e.key);
      invoke('set_hotkey', { key: e.key });
      setIsHotkeyModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHotkeyModalOpen]);

  return createPortal(
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
            className="bg-section-light dark:bg-section-dark bg-gradient-to-br from-purple-100/60 via-white/80 to-pink-100/60 dark:from-[#181825]/80 dark:via-[#232336]/90 dark:to-[#2a1936]/80 backdrop-blur-sm w-[96%] max-w-xs rounded-xl border border-gray-300/50 dark:border-gray-700/50 shadow-xl shadow-purple-500/10 px-3 py-4 relative flex flex-col gap-3"
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
              <div className="rounded-lg bg-interactive-light/60 dark:bg-interactive-dark/60 border border-gray-300/40 dark:border-gray-700/40 shadow-sm px-4 py-3 flex flex-col gap-1 mb-2">
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-200 mb-1">Hotkey</label>
                <button
                  className="w-full bg-gray-100 dark:bg-[#121218] border border-gray-300/50 dark:border-gray-600/50 rounded px-2 py-1 text-xs text-gray-800 dark:text-gray-200 hover:bg-gray-200/80 dark:hover:bg-[#121218]/80 transition-all cursor-pointer text-left font-mono tracking-wider"
                  onClick={() => setIsHotkeyModalOpen(true)}
                >
                  {hotkey}
                </button>
                {isHotkeyModalOpen && (
                  <div className="mt-2 text-xs text-center text-gray-600 dark:text-gray-300">Press a key...</div>
                )}
                  </div>
              {/* Custom Click Keybind */}
              <div className="rounded-lg bg-interactive-light/60 dark:bg-interactive-dark/60 border border-gray-300/40 dark:border-gray-700/40 shadow-sm px-4 py-3 flex flex-col gap-1 mb-2">
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-200 mb-1">Custom Click Keybind</label>
                <button
                  className="w-full bg-gray-100 dark:bg-[#121218] border border-gray-300/50 dark:border-gray-600/50 rounded px-3 py-2 text-xs text-gray-800 dark:text-gray-200 hover:bg-gray-200/80 dark:hover:bg-[#121218]/80 transition-all cursor-pointer text-left font-mono tracking-wider"
                  onClick={() => setIsCustomKeyModalOpen(true)}
                >
                  {customKey || 'Click to set key'}
                </button>
              </div>
              {/* Theme Settings */}
              <div className="rounded-lg bg-interactive-light/60 dark:bg-interactive-dark/60 border border-gray-300/40 dark:border-gray-700/40 shadow-sm px-4 py-3 flex flex-col gap-1 mb-2">
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-200 mb-1">Theme</label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className={`select-none w-full dark:bg-[#121218] border border-gray-300/50 dark:border-gray-700/50 rounded-lg px-3 py-2 text-xs text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-0 focus:ring-transparent focus:border-transparent transition-all appearance-none cursor-pointer hover:bg-gray-200/80 dark:hover:bg-[#121218]/80 h-[32px]`}>
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent className={'bg-gray-100/90 dark:bg-[#121218]/90 backdrop-blur-md border border-gray-300/50 dark:border-gray-700/50 rounded-lg shadow-xl shadow-purple-500/5 dark:shadow-purple-500/10'}>
                    <SelectItem value="Dark" className="text-gray-800 dark:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-700/20">Dark</SelectItem>
                    <SelectItem value="Light" className="text-gray-800 dark:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-700/20">Light</SelectItem>
                  </SelectContent>
                </Select>
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
    </AnimatePresence>,
    document.body
  );
};

interface LogsModalProps {
  isOpen: boolean;
  onClose: () => void;
  logs: string[];
}

export const LogsModal = ({ isOpen, onClose, logs }: LogsModalProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);
  // Filtering logic
  const filterOptions = ['Start', 'Stop', 'Custom Key', 'Interval'];
  const [selectedTypes, setSelectedTypes] = useState<string[]>(filterOptions);
  // Filtering logic: show logs that match any selected type
  const filteredLogs = logs.filter(log => {
    if (selectedTypes.length === 0) return false;
    return selectedTypes.some(type => {
      if (type === 'Start') return log.toLowerCase().includes('started clicking');
      if (type === 'Stop') return log.toLowerCase().includes('stopped clicking');
      if (type === 'Custom Key') return log.toLowerCase().includes('custom key');
      if (type === 'Interval') return log.toLowerCase().includes('interval');
      return false;
    });
  });

  // Multi-select handler
  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  // Popover state for filter
  const [showFilterPopover, setShowFilterPopover] = useState(false);
  // Close popover on outside click
  useEffect(() => {
    if (!showFilterPopover) return;
    const handleClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.relative.w-40')) {
        setShowFilterPopover(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showFilterPopover]);

  return createPortal(
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
            className="bg-section-light dark:bg-section-dark bg-gradient-to-br from-purple-100/60 via-white/80 to-pink-100/60 dark:from-[#181825]/80 dark:via-[#232336]/90 dark:to-[#2a1936]/80 backdrop-blur-sm w-[96%] max-w-sm rounded-xl border border-gray-300/50 dark:border-gray-700/50 shadow-xl shadow-purple-500/10 px-4 py-4 relative flex flex-col gap-4"
            initial={{ y: 32, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 32, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28, duration: 0.22 }}
          >
            <div className="flex flex-col items-center mb-1">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 tracking-tight mb-0.5">Logs</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Recent Activity</p>
            </div>
           <div className="flex items-center justify-between mb-2">
             <label className="text-xs font-medium text-gray-600 dark:text-gray-300">Filter:</label>
             <div className="relative w-40 ml-2">
               <button
                 className={`select-none w-full flex items-center justify-between dark:bg-[#121218] border border-gray-300/50 dark:border-gray-700/50 rounded-lg px-3 py-2 text-xs text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-0 focus:ring-transparent focus:border-transparent transition-all appearance-none cursor-pointer hover:bg-gray-200/80 dark:hover:bg-[#121218]/80 h-[32px]`}
                 onClick={() => setShowFilterPopover(v => !v)}
                 type="button"
               >
                 <span className="truncate">
                   {selectedTypes.length === filterOptions.length
                     ? 'All selected'
                     : selectedTypes.length === 0
                       ? 'None selected'
                       : selectedTypes.join(', ')}
                 </span>
                 <ChevronDown className="w-4 h-4 ml-2" />
               </button>
               {showFilterPopover && (
                 <div className="absolute z-50 mt-1 left-0 w-full bg-gray-100/90 dark:bg-[#121218]/90 border border-gray-300/50 dark:border-gray-700/50 rounded-lg shadow-xl shadow-purple-500/10 py-2 px-2 flex flex-col gap-1 max-h-48 overflow-y-auto"
                      style={{ minWidth: '10rem' }}
                 >
                   {filterOptions.map(opt => (
                     <button
                       key={opt}
                       type="button"
                       onClick={() => toggleType(opt)}
                       className="flex flex-row-reverse items-center justify-between gap-2 px-2 py-1 rounded hover:bg-gray-200/50 dark:hover:bg-gray-700/20 cursor-pointer select-none text-xs text-gray-800 dark:text-gray-200 w-full"
                     >
                       {selectedTypes.includes(opt) ? (
                         <Check className="w-4 h-4 text-white bg-custom-purple rounded" />
                       ) : (
                         <span className="w-4 h-4" />
                       )}
                       <span>{opt}</span>
                     </button>
                   ))}
                 </div>
               )}
             </div>
           </div>
            <div className="rounded-lg bg-interactive-light/60 dark:bg-interactive-dark/60 border border-gray-300/40 dark:border-gray-700/40 shadow-sm px-4 py-3 flex-1 overflow-y-auto max-h-72 min-h-[120px] text-xs text-gray-700 dark:text-gray-200 font-mono tracking-tight scrollbar-thin scrollbar-thumb-purple-300/60 scrollbar-thumb-rounded-md scrollbar-track-transparent dark:scrollbar-thumb-purple-900/40"
                 style={{ scrollbarColor: '#a78bfa #0000', scrollbarWidth: 'thin' }}
            >
              {filteredLogs.length === 0 ? (
                <div className="text-center text-gray-400 dark:text-gray-500">No logs yet.</div>
              ) : (
                <ul className="space-y-1">
                  {filteredLogs.map((log, idx) => (
                    <li key={idx}>{log}</li>
                  ))}
                </ul>
              )}
              <div ref={logsEndRef} />
            </div>
            <button
              className="mt-1 w-full py-2 rounded bg-custom-purple text-white font-semibold text-sm shadow hover:bg-custom-purple-hover transition-all duration-200"
              onClick={onClose}
            >
              Close
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
    </AnimatePresence>,
    document.body
  );
};

export default SettingsMenu;