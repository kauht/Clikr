import { getCurrentWindow } from '@tauri-apps/api/window';
import { ArrowRight, MousePointer2, Settings as SettingsIcon, SwordIcon as Record, AppWindow } from 'lucide-react';
import { useEffect, useState } from 'react';
import "./App.css";
import KInput from './components/kInput';
import KSelect from './components/kSelect';
import SettingsMenu from './components/SettingsMenu';

function App() {

  const [intervalUnit1, setIntervalUnit1] = useState('Minutes');
  const [intervalUnit2, setIntervalUnit2] = useState('Milliseconds');
  const [interval1, setInterval1] = useState('');
  const [interval2, setInterval2] = useState('');
  const [positionX, setPositionX] = useState('');
  const [positionY, setPositionY] = useState('');

  const [clickType, setClickType] = useState('Left');
  const [positionType, setPositionType] = useState('Current');
  const [customKey, setCustomKey] = useState('');
  const [isCustomKeyModalOpen, setIsCustomKeyModalOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [hotkey] = useState('F6');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div data-tauri-drag-region className="h-screen w-screen bg-gradient-to-b from-gray-900 to-gray-800">


      {/* Nav Bar Section */}
      <div data-tauri-drag-region className="flex items-center h-8 px-3 bg-gray-800/50 backdrop-blur-sm">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57] hover:opacity-80 transition-opacity" onClick={() => {
            getCurrentWindow().close();
          }}></div>
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:opacity-80 transition-opacity" onClick={() => {
            getCurrentWindow().minimize();
          }}></div>
          <div className="w-3 h-3 rounded-full bg-[#28C840] hover:opacity-80 transition-opacity" onClick={() => {
            getCurrentWindow().maximize();
          }}></div>
        </div>
        <div data-tauri-drag-region className="select-none m-auto text-sm font-medium text-gray-200 ">Auto Clicker</div>
      </div>
      <div data-tauri-drag-region className="pt-4 w-full bg-transparent px-6 py-4">


        {/* Click Interval Section */}
        <div data-tauri-drag-region className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700/50 mb-4 hover:border-gray-600/50 transition-colors">
          <h3 data-tauri-drag-region className="select-none text-sm font-medium text-gray-200 mb-4 flex items-center">
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
          <div data-tauri-drag-region className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700/50 hover:border-gray-600/50 transition-colors">
            <h3 data-tauri-drag-region className="select-none text-sm font-medium text-gray-200 mb-4 flex items-center">
              <MousePointer2 className="h-4 w-4 mr-2 text-purple-500" />
              Click Options
            </h3>
            <div className="space-y-2">
              <div className="relative flex bg-gray-700/50 rounded-lg p-1.5 w-full">
                <div
                  className="select-none absolute h-[calc(100%-12px)] bg-purple-600 rounded-md transition-all duration-300 shadow-lg shadow-purple-500/20"
                  style={{
                    width: 'calc(33.333% - 8px)',
                    left: `calc(${['Left', 'Middle', 'Right'].indexOf(clickType)} * 33.333% + 4px)`,
                    top: '6px',
                    transform: 'none',
                    display: clickType === 'Custom' ? 'none' : 'block'
                  }}
                />
                {['Left', 'Middle', 'Right'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setClickType(type)}
                    className={`select-none flex-1 px-4 py-2 text-sm transition-all duration-200 relative z-10 ${clickType === type
                      ? 'text-white'
                      : 'text-gray-300 hover:text-gray-200'
                      }`}
                  >
                    {type}
                  </button>
                ))}
              </div >
              <button
                onClick={() => {
                  setClickType('Custom');
                  setIsCustomKeyModalOpen(true);
                }}
                className={`select-none w-full px-4 py-2.5 text-sm rounded-lg transition-all duration-200 ${clickType === 'Custom'
                  ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-gray-200'
                  }`}
              >
                {customKey ? `Key: ${customKey}` : 'Custom'}
              </button>
            </div>
          </div>

          {/* Cursor Position Section */}
          <div data-tauri-drag-region className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700/50 hover:border-gray-600/50 transition-colors">
            <h3 data-tauri-drag-region className="select-none text-sm font-medium text-gray-200 mb-4 flex items-center">
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
                      ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-gray-200'
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
        <div data-tauri-drag-region className="flex justify-between items-center bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700/50">
          <div data-tauri-drag-region className="flex space-x-2">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="bg-gray-700/50 hover:bg-gray-600/50 text-gray-200 p-2 rounded-lg transition-all duration-200 hover:scale-105"
            >
              <SettingsIcon className="h-5 w-5" />
            </button>
            <button className="bg-gray-700/50 hover:bg-gray-600/50 text-gray-200 p-2 rounded-lg transition-all duration-200 hover:scale-105">
              <Record className="h-5 w-5" />
            </button>
          </div>

          <div data-tauri-drag-region className="flex items-center space-x-3">
            <span className="select-none text-xs text-gray-300 bg-gray-700/50 px-3 py-1.5 border-2 border-gray-700 rounded-md font-medium border-width: 1px">
              {hotkey} to Start/Stop
            </span>
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`
                select-none relative overflow-hidden
                ${isRunning ? 'bg-red-600 hover:bg-red-500' : 'bg-purple-600 hover:bg-purple-500'}
                text-white px-8 py-2 rounded-lg font-medium text-sm
                transition-all duration-300 ease-out
                transform hover:scale-105 active:scale-95
                hover:shadow-xl ${isRunning ? 'hover:shadow-red-500/20' : 'hover:shadow-purple-500/30'}
                before:absolute before:inset-0
                before:bg-gradient-to-r
                ${isRunning
                  ? 'before:from-red-500/0 before:via-red-300/5 before:to-red-500/0'
                  : 'before:from-purple-500/0 before:via-purple-300/10 before:to-purple-500/0'}
                before:translate-x-[-200%] hover:before:translate-x-[200%]
                before:transition-transform before:duration-1000 before:ease-out
                ${isRunning ? 'animate-[pulse_2s_ease-in-out_infinite]' : ''}
              `}
            >
              <span className="relative z-10 inline-flex items-center"> {isRunning ? 'Stop' : 'Start'} </span>
            </button>
          </div>
        </div>



      </div>
      <SettingsMenu
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        customKey={customKey}
        setIsCustomKeyModalOpen={setIsCustomKeyModalOpen}
      />
    </div>
  );
}

export default App;
