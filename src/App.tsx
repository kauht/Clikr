import { ArrowRight, MousePointer2, Settings as SettingsIcon, SwordIcon as Record } from 'lucide-react';
import { useEffect, useState } from 'react';
import "./App.css";


function App() {

  const [intervalUnit1, setIntervalUnit1] = useState('Minutes');
  const [intervalUnit2, setIntervalUnit2] = useState('Milliseconds');

  const [clickType, setClickType] = useState('Left');
  const [positionType, setPositionType] = useState('Current');
  const [customKey, setCustomKey] = useState('');
  const [isCustomKeyModalOpen, setIsCustomKeyModalOpen] = useState(false);
  const [hotkey] = useState('F6');

  return (
    <div data-tauri-drag-region className="h-screen w-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div data-tauri-drag-region className="flex items-center h-8 px-3 bg-gray-800/50 backdrop-blur-sm">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57] hover:opacity-80 transition-opacity"></div>
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:opacity-80 transition-opacity"></div>
          <div className="w-3 h-3 rounded-full bg-[#28C840] hover:opacity-80 transition-opacity"></div>
        </div>
        <div data-tauri-drag-region className="select-none m-auto text-sm font-medium text-gray-200">Auto Clicker</div>
      </div>
      <div data-tauri-drag-region className="pt-4 w-full bg-transparent px-6 py-4">

        <div data-tauri-drag-region className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700/50 mb-4 hover:border-gray-600/50 transition-colors">
          <h3 data-tauri-drag-region className="select-none text-sm font-medium text-gray-200 mb-4 flex items-center">
            <ArrowRight className="h-4 w-4 mr-2 text-purple-500" />
            Click Interval
          </h3>
          <div data-tauri-drag-region className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <input 
                type="text" 
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-2.5 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all" 
                placeholder="0" 
              />
              <select 
                value={intervalUnit1}
                onChange={(e) => setIntervalUnit1(e.target.value)}
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-transparent focus:border-gray-600/50 transition-all appearance-none cursor-pointer"
              >
                <option>Minutes</option>
                <option>Seconds</option>
                <option>Hours</option>
              </select>
            </div>
            <div className="space-y-2">
              <input 
                type="text" 
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-2.5 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all" 
                placeholder="0" 
              />
              <select 
                value={intervalUnit2}
                onChange={(e) => setIntervalUnit2(e.target.value)}
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-transparent focus:border-gray-600/50 transition-all appearance-none cursor-pointer"
              >
                <option>Milliseconds</option>
                <option>Microseconds</option>
              </select>
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
              <div className="relative flex bg-gray-700/50 rounded-lg p-1 w-full">
                <div
                  className="select-none absolute h-[calc(100%-8px)] bg-purple-600 rounded-md transition-all duration-300 shadow-lg shadow-purple-500/20"
                  style={{
                    width: 'calc(33.333% - 6px)',
                    left: `${['Left', 'Middle', 'Right'].indexOf(clickType) * 33.333}%`,
                    top: '4px',
                    transform: `translateX(${['Left', 'Middle', 'Right'].indexOf(clickType) * 3}px)`,
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
                className={`w-full px-4 py-2.5 text-sm rounded-lg transition-all duration-200 ${clickType === 'Custom'
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
            <div data-tauri-drag-region className="space-y-3">
              <div data-tauri-drag-region className="flex space-x-3 relative flex rounded-lg p-1 w-full">
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
              <div data-tauri-drag-region className="grid grid-cols-2 gap-3">
                <div>
                  <input 
                    type="text" 
                    className="select-none w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-2.5 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all" 
                    placeholder="X: 0" 
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    className="select-none w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-2.5 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all" 
                    placeholder="Y: 0" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div data-tauri-drag-region className="flex justify-between items-center bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700/50">
          <div data-tauri-drag-region className="flex space-x-2">
            <button className="bg-gray-700/50 hover:bg-gray-600/50 text-gray-200 p-2 rounded-lg transition-all duration-200 hover:scale-105">
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
            <button className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20">
              Start
            </button>
          </div>
        </div>



      </div>
    </div>
  );
}

export default App;
