import { useState } from 'react';

interface ClickTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  onCustomClick: () => void;
  customKey?: string;
}

const ClickTypeSelector = ({ value, onChange, onCustomClick, customKey }: ClickTypeSelectorProps) => {
  return (
    <div className="space-y-2">
      <div className="relative flex bg-interactive-light dark:bg-interactive-dark rounded-lg p-1 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-transparent dark:bg-transparent"
          style={{
            transform: value === 'Custom' ? 'translateX(-100%)' : `translateX(${['Left', 'Middle', 'Right'].indexOf(value) * 33.333}%)`
          }}
        />
        <div
          className="absolute inset-1 bg-custom-purple rounded-md transition-all duration-300 shadow-lg shadow-custom-purple/20"
          style={{
            width: 'calc(33.333% - 2.8px)',
            transform: value === 'Custom' ? '' : `translateX(${['Left', 'Middle', 'Right'].indexOf(value) * 100}%)`
          }}
        />
        {['Left', 'Middle', 'Right'].map((type) => (
          <button
            key={type}
            onClick={() => onChange(type)}
            className={`relative z-10 select-none flex-1 px-4 py-2 text-sm font-medium transition-all duration-200
              ${value === type
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
          onChange('Custom');
          onCustomClick();
        }}
        className={`select-none w-full px-4 py-2.5 text-sm rounded-lg transition-all duration-200 ${value === 'Custom'
          ? 'bg-custom-purple hover:bg-custom-purple-hover text-white shadow-lg shadow-custom-purple/20'
          : 'bg-gray-100 dark:bg-[#121218] text-gray-800 dark:text-gray-300 hover:bg-gray-200/80 dark:hover:bg-[#121218]/50 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
      >
        {customKey ? `Key: ${customKey}` : 'Custom'}
      </button>
    </div>
  );
};

export default ClickTypeSelector;