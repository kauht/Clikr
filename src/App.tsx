import { getCurrentWindow } from '@tauri-apps/api/window';
import { ArrowRight, MousePointer2, Settings as SettingsIcon, SwordIcon as Record } from 'lucide-react';
import { useState, useEffect } from 'react';
import "./App.css";
import KInput from './components/kInput';
import KSelect from './components/kSelect';
import SettingsMenu from './components/SettingsMenu';

function App() {
  // Theme
  const [theme, setTheme] = useState('System');

  // Disable Keybinds
  useEffect(() => {
    const handleMouseEvents = (e: MouseEvent) => {
      if (e.button === 3 || e.button === 4 || e.type === 'contextmenu') {
        e.preventDefault();
      }
    };

    const handleKeyboardEvents = (e: KeyboardEvent) => {
      const { key, ctrlKey, shiftKey } = e;
      const isBlockedFKey = key.startsWith('F') && key !== 'F6';
      const isCtrlR = ctrlKey && key === 'r';
      const isBlockedCtrlShiftKey = ctrlKey && shiftKey && 'IJCK'.includes(key);

      if (isBlockedFKey || isCtrlR || isBlockedCtrlShiftKey) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleMouseEvents);
    document.addEventListener('mousedown', handleMouseEvents);
    document.addEventListener('keydown', handleKeyboardEvents);

    return () => {
      document.removeEventListener('contextmenu', handleMouseEvents);
      document.removeEventListener('mousedown', handleMouseEvents);
      document.removeEventListener('keydown', handleKeyboardEvents);
    };
  }, []);

  // Handle Theme
  useEffect(() => {
    const handleSystemThemeChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (theme === 'System') {
        document.documentElement.classList.toggle('dark', e.matches);
      }
    };

    if (theme === 'System') {
      const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      handleSystemThemeChange(darkModeMediaQuery);
      darkModeMediaQuery.addEventListener('change', handleSystemThemeChange);
      return () => darkModeMediaQuery.removeEventListener('change', handleSystemThemeChange);
    } else {
      document.documentElement.classList.toggle('dark', theme === 'Dark');
    }
  }, [theme]);

  // Intervals
  const [intervalUnit1, setIntervalUnit1] = useState('Minutes');
  const [intervalUnit2, setIntervalUnit2] = useState('Milliseconds');
  const [interval1, setInterval1] = useState('');
  const [interval2, setInterval2] = useState('');

  // Cursor Position
  const [positionX, setPositionX] = useState('');
  const [positionY, setPositionY] = useState('');

  // Click Options
  const [clickType, setClickType] = useState('Left');
  const [positionType, setPositionType] = useState('Current');
  const [customKey] = useState('');
  const [, setIsCustomKeyModalOpen] = useState(false);

  // App State
  const [isRunning, setIsRunning] = useState(false);
  const [hotkey] = useState('F6');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="h-screen w-screen bg-background-light dark:bg-background-dark backdrop-blur relative overflow-hidden">


      {/* Nav Bar Section */}
      <div data-tauri-drag-region className="flex items-center h-8 px-3 bg-section-light/50 dark:bg-section-dark/50 bg-opacity-100 backdrop-blur-sm">
        <div className="absolute flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57] hover:opacity-80 transition-opacity" onClick={() => {
            getCurrentWindow().close();
          }}></div>
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:opacity-80 transition-opacity" onClick={() => {
            getCurrentWindow().minimize();
          }}></div>
          <div className="w-3 h-3 rounded-full bg-[#28C840] hover:opacity-80 transition-opacity" onClick={() => {
            getCurrentWindow().toggleMaximize();
          }}></div>
        </div>
        <div data-tauri-drag-region className="select-none flex-1 text-center text-sm font-medium text-gray-800 dark:text-gray-200">Auto Clicker</div>
      </div>
      <div className="pt-4 w-full bg-transparent px-6 py-4">


        {/* Click Interval Section */}
        <div data-tauri-drag-region className="bg-section-light dark:bg-section-dark backdrop-blur-sm p-6 rounded-lg border border-gray-300/50 dark:border-gray-700/50 mb-4 hover:border-gray-400/50 dark:hover:border-gray-600/50 transition-colors">
          <h3 data-tauri-drag-region className="select-none text-sm font-medium text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <ArrowRight className="h-4 w-4 mr-2 text-purple-500" />
            Click Interval
          </h3>
          <div data-tauri-drag-region className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <KInput value={interval1} onChange={setInterval1} placeholder="0" />
              <KSelect
                value={intervalUnit1}
                onChange={setIntervalUnit1}
                options={['Minutes', 'Seconds', 'Hours']}
              />
            </div>
            <div className="space-y-2">
              <KInput value={interval2} onChange={setInterval2} placeholder="0" />
              <KSelect
                value={intervalUnit2}
                onChange={setIntervalUnit2}
                options={['Milliseconds', 'Microseconds']}
              />
            </div>
          </div>
        </div>
        <div data-tauri-drag-region className="grid grid-cols-2 gap-6 mb-6">


          {/* Click Options Section */}
          <div data-tauri-drag-region className="bg-section-light dark:bg-section-dark backdrop-blur-sm p-6 rounded-lg border border-gray-300/50 dark:border-gray-700/50 hover:border-gray-400/50 dark:hover:border-gray-600/50 transition-colors">
            <h3 data-tauri-drag-region className="select-none text-sm font-medium text-gray-800 dark:text-gray-200 mb-4 flex items-center">
              <MousePointer2 className="h-4 w-4 mr-2 text-purple-500" />
              Click Options
            </h3>
            <div className="space-y-2">
              <div className="relative flex bg-interactive-light dark:bg-interactive-dark rounded-lg p-1 w-full overflow-hidden">
                <div
                  className="absolute inset-0 bg-custom-purple/10 dark:bg-custom-purple/5 transition-all duration-300"
                  style={{
                    transform: clickType === 'Custom' ? 'translateX(-100%)' : `translateX(${['Left', 'Middle', 'Right'].indexOf(clickType) * 33.333}%)`
                  }}
                />
                <div
                  className="absolute inset-1 bg-custom-purple rounded-md transition-all duration-300 shadow-lg shadow-custom-purple/20"
                  style={{
                    width: 'calc(33.333% - 2.8px)',
                    transform: clickType === 'Custom' ? 'translateX(-100%)' : `translateX(${['Left', 'Middle', 'Right'].indexOf(clickType) * 100}%)`
                  }}
                />
                {['Left', 'Middle', 'Right'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setClickType(type)}
                    className={`relative z-10 select-none flex-1 px-4 py-2 text-sm font-medium transition-all duration-200
                      ${clickType === type
                        ? 'text-white transform scale-105'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200'
                      }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  setClickType('Custom');
                  setIsCustomKeyModalOpen(true);
                }}
                className={`select-none w-full px-4 py-2.5 text-sm rounded-lg transition-all duration-200 ${clickType === 'Custom'
                  ? 'bg-custom-purple hover:bg-custom-purple-hover text-white shadow-lg shadow-custom-purple/20'
                  : 'bg-gray-100 dark:bg-[#121218] text-gray-800 dark:text-gray-300 hover:bg-gray-200/80 dark:hover:bg-[#121218]/50 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
              >
                {customKey ? `Key: ${customKey}` : 'Custom'}
              </button>
            </div>
          </div>

          {/* Cursor Position Section */}
          <div data-tauri-drag-region className="bg-section-light dark:bg-section-dark backdrop-blur-sm p-6 rounded-lg border border-gray-300/50 dark:border-gray-700/50 hover:border-gray-400/50 dark:hover:border-gray-600/50 transition-colors">
            <h3 data-tauri-drag-region className="select-none text-sm font-medium text-gray-800 dark:text-gray-200 mb-4 flex items-center">
              <MousePointer2 className="h-4 w-4 mr-2 text-purple-500" />
              Cursor Position
            </h3>
            <div data-tauri-drag-region className="select-none space-y-3">
              <div data-tauri-drag-region className="flex space-x-3 p-1">
                {['Current', 'Choose Position'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setPositionType(type)}
                    className={`px-2 py-2.5 text-sm rounded-lg transition-all duration-200 hover:scale-105 flex-1 ${positionType === type
                      ? 'bg-custom-purple hover:bg-custom-purple-hover text-white shadow-lg shadow-custom-purple/20'
                      : 'bg-gray-100 dark:bg-[#121218] text-gray-800 dark:text-gray-300 hover:bg-gray-200/80 dark:hover:bg-[#121218]/50 hover:text-gray-900 dark:hover:text-gray-200'
                      }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <div data-tauri-drag-region className="flex space-x-3 p-1 ">
                <div>
                  <KInput value={positionX} onChange={setPositionX} placeholder="X: 0" />
                </div>
                <div>
                  <KInput value={positionY} onChange={setPositionY} placeholder="Y: 0" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div data-tauri-drag-region className="flex justify-between items-center bg-section-light/50 dark:bg-section-dark/50 backdrop-blur-sm rounded-lg p-3 border border-gray-300/50 dark:border-gray-700/50">
          <div data-tauri-drag-region className="flex space-x-2">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="bg-interactive-light/50 dark:bg-interactive-dark/50 hover:bg-interactive-light/70 dark:hover:bg-interactive-dark/70 text-gray-800 dark:text-gray-200 p-2 rounded-lg transition-all duration-200 hover:scale-105"
            >
              <SettingsIcon className="h-5 w-5" />
            </button>
            <button className="bg-interactive-light/50 dark:bg-interactive-dark/50 hover:bg-interactive-light/70 dark:hover:bg-interactive-dark/70 text-gray-800 dark:text-gray-200 p-2 rounded-lg transition-all duration-200 hover:scale-105">
              <Record className="h-5 w-5" />
            </button>
          </div>

          <div data-tauri-drag-region className="flex items-center space-x-3">
            <span className="select-none text-xs text-gray-600 dark:text-gray-300 bg-interactive-light dark:bg-interactive-dark px-3 py-1.5 border-2 border-gray-300/50 dark:border-gray-800/50 rounded-md font-medium border-width: 1px">
              {hotkey} to Start/Stop
            </span>
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`
                select-none relative overflow-hidden
                ${isRunning ? 'bg-red-600 hover:bg-red-500' : 'bg-custom-purple hover:bg-custom-purple-hover'}
                text-white px-8 py-2 rounded-lg font-medium text-sm
                transition-all duration-300 ease-out
                transform hover:scale-105 active:scale-95
                hover:shadow-xl ${isRunning ? 'hover:shadow-red-500/20' : 'hover:shadow-custom-purple/20'}
                before:absolute before:inset-0
                before:bg-gradient-to-r
                ${isRunning
                  ? 'before:from-red-500/0 before:via-red-300/5 before:to-red-500/0'
                  : 'before:from-custom-purple/0 before:via-custom-purple/10 before:to-custom-purple/0'}
                before:translate-x-[-200%] hover:before:translate-x-[200%]
                before:transition-transform before:duration-1000 before:ease-out
                ${isRunning ? 'animate-[pulse_2s_ease-in-out_infinite]' : ''}
              `}
            >
              <span className="relative z-10 inline-flex items-center"> {isRunning ? 'Stop' : 'Start'} </span>
            </button>
          </div>
        </div>

        {/* Blur Decorations */}
        {/*Top Left*/}
        <div className="pointer-events-none absolute -top-6 -left-12 w-40 h-40 bg-purple-600 dark:bg-pink-600 rounded-full filter blur-[100px] opacity-25 dark:opacity-20"></div>
        <div className="pointer-events-none absolute -top-6 -left-12 w-60 h-60 bg-purple-400 dark:bg-pink-400 rounded-full filter blur-[200px] opacity-25 dark:opacity-20"></div>
        {/*Bottom Right*/}
        <div className="pointer-events-none absolute -bottom-5 -right-14 w-40 h-40 bg-purple-600 dark:bg-pink-600 rounded-full filter blur-[75px] opacity-20 dark:opacity-10"></div>
        <div className="pointer-events-none absolute -bottom-5 -right-14 w-60 h-60 bg-purple-700 dark:bg-pink-700 rounded-full filter blur-[150px] opacity-20 dark:opacity-10"></div>
        
      </div>
      <SettingsMenu
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        customKey={customKey}
        setIsCustomKeyModalOpen={setIsCustomKeyModalOpen}
        theme={theme}
        setTheme={setTheme}
      />

    </div>
  );
}

export default App;
