import React from 'react';
import NavBar from './components/NavBar';
import { ArrowRight, MousePointer2, Settings as SettingsIcon, SwordIcon as Record } from 'lucide-react';
import { useState, useEffect } from 'react';
import "./App.css";
import KInput from './components/kInput';
import KSelect from './components/kSelect';
import SettingsMenu from './components/SettingsMenu';
import ClickTypeSelector from './components/ClickTypeSelector';
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "./components/ui/select"
import { invoke } from '@tauri-apps/api/core';


function App() {
  const [theme, setTheme] = useState('Dark'); // Default Theme
  const [intervalUnit1, setIntervalUnit1] = useState('Minutes');
  const [intervalUnit2, setIntervalUnit2] = useState('Milliseconds');
  const [interval1, setInterval1] = useState('');
  const [interval2, setInterval2] = useState('');
  const [positionX, setPositionX] = useState('');
  const [positionY, setPositionY] = useState('');
  const [clickType, setClickType] = useState('Left');
  const [positionType, setPositionType] = useState('Current');
  const [customKey] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [hotkey] = useState('F6');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCustomKeyModalOpen, setIsCustomKeyModalOpen] = useState(false);

  useEffect(() => {
    const handleMouseEvents = (e: MouseEvent) => {
      if (e.button === 3 || e.button === 4 || e.type === 'contextmenu') e.preventDefault();
    };

    const handleKeyboardEvents = (e: KeyboardEvent) => {
      const { key, ctrlKey, shiftKey } = e;
      if ((key.startsWith('F') && key !== 'F6') || (ctrlKey && key === 'r') || (ctrlKey && shiftKey && 'IJCK'.includes(key))) {
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

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'Dark');
  }, [theme]);

  useEffect(() => {
    set_interval();
  }, [interval1, interval2, intervalUnit1, intervalUnit2]);

  useEffect(() => {
    invoke('get_status').then((status: any) => {
      setIsRunning(status.clicking);
    });
  }, []);

  function calculate_micros() {
    var micros = 0;
    const interval1Num = parseFloat(interval1) || 0;
    const interval2Num = parseFloat(interval2) || 0;
    
    switch (intervalUnit1) {
      case 'Minutes':
        micros += interval1Num * 60000000;
        break;
      case 'Seconds':
        micros += interval1Num * 1000000;
        break;
      case 'Hours':
        micros += interval1Num * 3600000000;
        break;
      case 'Milliseconds':
        micros += interval1Num * 1000;
        break;
      case 'Microseconds':
        micros += interval1Num;
        break;
      default:
        break;
    }
    switch (intervalUnit2) {
      case 'Minutes':
        micros += interval2Num * 60000000;
        break;
      case 'Seconds':
        micros += interval2Num * 1000000;
        break;
      case 'Hours':
        micros += interval2Num * 3600000000;
        break;
      case 'Milliseconds':
        micros += interval2Num * 1000;
        break;
      case 'Microseconds':
        micros += interval2Num;
        break;
      default:
        break;
    }
    
    return micros;
  }

  function set_interval() {
    const micros = calculate_micros();
    invoke('set_interval', { micros });
  }

  // Handle Start/Stop button
  async function handleStartStop() {
    if (!isRunning) {
        await invoke('start');
        setIsRunning(true);
      } else {
        await invoke('stop');
        setIsRunning(false);
      }
  }

  // Handle click type change (UI only, no backend)
  function handleClickTypeChange(type: string) {
    setClickType(type);
  }

  return (
    <div className="h-screen w-screen bg-background-light dark:bg-background-dark backdrop-blur relative overflow-hidden">
      <NavBar/>
      <div className="select-none pt-4 w-full bg-transparent px-6 py-4">

        {/* Click Interval Section */}
        <div className="bg-section-light dark:bg-section-dark backdrop-blur-sm p-6 rounded-lg border border-gray-300/50 dark:border-gray-700/50 mb-4 hover:border-gray-400/50 dark:hover:border-gray-600/50 transition-colors">
          <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <ArrowRight className="size-4 mr-2 text-purple-500"/>
            Click Interval
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <KInput value={interval1} onChange={setInterval1}/>
              <Select value={intervalUnit1} onValueChange={setIntervalUnit1}>
                <SelectTrigger className={`select-none w-full bg-gray-100 dark:bg-[#121218] border border-gray-300/50 dark:border-gray-700/50 rounded-lg px-4 py-2.5 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-0 focus:ring-transparent dark:focus:ring-transparent focus:border-transparent dark:focus:border-transparent transition-all appearance-none cursor-pointer hover:bg-gray-200/80 dark:hover:bg-[#121218]/80 h-[40px]`}>
                  <SelectValue placeholder="Theme"/>
                </SelectTrigger>
                <SelectContent className={'bg-gray-100/90 dark:bg-[#121218]/90 backdrop-blur-md border border-gray-300/50 dark:border-gray-700/50 rounded-lg shadow-xl shadow-purple-500/5 dark:shadow-purple-500/10'}>
                  <SelectItem value="Minutes" className="text-gray-800 dark:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-700/20">Minutes</SelectItem>
                  <SelectItem value="Seconds" className="text-gray-800 dark:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-700/20">Seconds</SelectItem>
                  <SelectItem value="Hours" className="text-gray-800 dark:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-700/20">Hours</SelectItem>
                  <SelectItem value="Milliseconds" className="text-gray-800 dark:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-700/20">Milliseconds</SelectItem>
                  <SelectItem value="Microseconds" className="text-gray-800 dark:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-700/20">Microseconds</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <KInput value={interval2} onChange={setInterval2}/>
              <Select value={intervalUnit2} onValueChange={setIntervalUnit2}>
                <SelectTrigger className={`select-none w-full bg-gray-100 dark:bg-[#121218] border border-gray-300/50 dark:border-gray-700/50 rounded-lg px-4 py-2.5 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-0 focus:ring-transparent dark:focus:ring-transparent focus:border-transparent dark:focus:border-transparent transition-all appearance-none cursor-pointer hover:bg-gray-200/80 dark:hover:bg-[#121218]/80 h-[40px]`}>
                  <SelectValue placeholder="Theme"/>
                </SelectTrigger>
                <SelectContent className={'bg-gray-100/90 dark:bg-[#121218]/90 backdrop-blur-md border border-gray-300/50 dark:border-gray-700/50 rounded-lg shadow-xl shadow-purple-500/5 dark:shadow-purple-500/10'}>
                  <SelectItem value="Minutes" className="text-gray-800 dark:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-700/20">Minutes</SelectItem>
                  <SelectItem value="Seconds" className="text-gray-800 dark:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-700/20">Seconds</SelectItem>
                  <SelectItem value="Hours" className="text-gray-800 dark:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-700/20">Hours</SelectItem>
                  <SelectItem value="Milliseconds" className="text-gray-800 dark:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-700/20">Milliseconds</SelectItem>
                  <SelectItem value="Microseconds" className="text-gray-800 dark:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-700/20">Microseconds</SelectItem>
                </SelectContent>
              </Select>
              

              

            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 mb-6">
          
          {/* Click Options Section */}
          <div className="bg-section-light dark:bg-section-dark backdrop-blur-sm p-6 rounded-lg border border-gray-300/50 dark:border-gray-700/50 hover:border-gray-400/50 dark:hover:border-gray-600/50 transition-colors">
            <h3 className="select-none text-sm font-medium text-gray-800 dark:text-gray-200 mb-4 flex items-center">
              <MousePointer2 className="size-4 mr-2 text-purple-500" />
              Click Options
            </h3>

            <ClickTypeSelector value={clickType} onChange={setClickType} onCustomClick={() => setIsCustomKeyModalOpen(true)} customKey={customKey}/>
          </div>

          {/* Cursor Position Section */}
          <div className="bg-section-light dark:bg-section-dark backdrop-blur-sm p-6 rounded-lg border border-gray-300/50 dark:border-gray-700/50 hover:border-gray-400/50 dark:hover:border-gray-600/50 transition-colors">
            <h3 className="select-none text-sm font-medium text-gray-800 dark:text-gray-200 mb-4 flex items-center">
              <MousePointer2 className="size-4 mr-2 text-purple-500" />
              Cursor Position
            </h3>

            <div className="select-none space-y-3">
              <div className="flex space-x-3 p-1">
                {['Current', 'Choose Position'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setPositionType(type)}
                    className={`px-2 py-2.5 text-sm rounded-lg transition-all duration-200 hover:scale-105 flex-1 ${positionType === type
                      ? 'bg-custom-purple hover:bg-custom-purple-hover text-white shadow-lg shadow-custom-purple/20'
                      : 'bg-gray-100 dark:bg-[#121218] text-gray-800 dark:text-gray-300 hover:bg-gray-200/80 dark:hover:bg-[#121218]/50 hover:text-gray-900 dark:hover:text-gray-200'
                      }`}>
                    {type}
                  </button>
                ))}
              </div>
              <div className="flex space-x-3 p-1">
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
        <div className="flex justify-between items-center bg-section-light/50 dark:bg-section-dark/50 backdrop-blur-sm rounded-lg p-3 border border-gray-300/50 dark:border-gray-700/50">
          <div className="flex space-x-2">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="bg-interactive-light/50 dark:bg-interactive-dark/50 hover:bg-interactive-light/70 dark:hover:bg-interactive-dark/70 text-gray-800 dark:text-gray-200 p-2 rounded-lg transition-all duration-200 hover:scale-105">
              <SettingsIcon className="h-5 w-5" />
            </button>
            <button className="bg-interactive-light/50 dark:bg-interactive-dark/50 hover:bg-interactive-light/70 dark:hover:bg-interactive-dark/70 text-gray-800 dark:text-gray-200 p-2 rounded-lg transition-all duration-200 hover:scale-105">
              <Record className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <span className="select-none text-xs text-gray-600 dark:text-gray-300 bg-interactive-light dark:bg-interactive-dark px-3 py-1.5 border border-gray-300/50 dark:border-gray-800/50 rounded-md font-medium">
              {hotkey} to Start/Stop
            </span>
            <button
              onClick={handleStartStop}
              className={`select-none relative overflow-hidden text-white px-8 py-2 rounded-lg font-medium text-sm transition-all duration-300 ease-out hover:scale-105 active:scale-95 hover:shadow-xl
                ${isRunning ? 'bg-red-600 hover:bg-red-500 hover:shadow-red-500/20 animate-[pulse_2s_ease-in-out_infinite]' : 'bg-custom-purple hover:bg-custom-purple-hover hover:shadow-custom-purple/20'}
                before:absolute before:inset-0 before:bg-gradient-to-r before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000 before:ease-out
                ${isRunning ? 'before:from-red-500/0 before:via-red-300/5 before:to-red-500/0' : 'before:from-custom-purple/0 before:via-custom-purple/10 before:to-custom-purple/0'}`}>
              <span className="relative z-10 inline-flex items-center"> {isRunning ? 'Stop' : 'Start'} </span>
            </button>
          </div>
        </div>

        {/* Blur Decorations */}
        <div className="pointer-events-none absolute -top-6 -left-12 w-40 h-40 bg-purple-600 dark:bg-pink-600 rounded-full filter blur-[100px] opacity-30 dark:opacity-20"></div>
        <div className="pointer-events-none absolute -bottom-5 -right-14 w-40 h-40 bg-purple-600 dark:bg-pink-600 rounded-full filter blur-[75px] opacity-30 dark:opacity-10"></div>
        
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