import { getCurrentWindow } from '@tauri-apps/api/window';

const NavBar = () => {
  return (
    <div data-tauri-drag-region className="flex items-center h-8 px-3 bg-section-light/50 dark:bg-section-dark/50">
      <div className="absolute flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-red-600 transition duration-300 hover:opacity-70 transition-opacity" onClick={() => getCurrentWindow().close()}/>
        <div className="w-3 h-3 rounded-full bg-yellow-600 transition duration-300 hover:opacity-70 transition-opacity" onClick={() => getCurrentWindow().minimize()}/>
        <div className="w-3 h-3 rounded-full bg-green-600 transition duration-300 hover:opacity-70 transition-opacity" onClick={() => getCurrentWindow().toggleMaximize()}/>
      </div>
      <div data-tauri-drag-region className="select-none flex-1 text-center text-sm font-medium text-gray-800 dark:text-gray-200">
        {'Auto Clicker'}
      </div>
    </div>
  );
};

export default NavBar;