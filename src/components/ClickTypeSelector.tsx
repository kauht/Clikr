import React, { useState } from 'react';
import { Button } from './ui/button';

const clickTypePositions = { Left: 0, Middle: 1, Right: 2 };

interface ClickTypeSelectorProps {
  value: string;
  onChange: (type: string) => void;
}

const ClickTypeSelector = ({ value, onChange }: ClickTypeSelectorProps) => {
  const [showHighlight, setShowHighlight] = useState(true);
  const [highlightWithTransition, setHighlightWithTransition] = useState(true);

  const highlightStyle = {
    width: 'calc(33.333% - 2.8px)',
    transform: `translateX(${clickTypePositions[value as keyof typeof clickTypePositions] * 100}%)`,
  };

  function handleTypeClick(type: 'Left' | 'Middle' | 'Right' | 'Custom') {
    if (value === 'Custom') {
      setHighlightWithTransition(false);
      onChange(type);
      setTimeout(() => {
        setShowHighlight(true);
        setHighlightWithTransition(true);
      }, 10);
    } else {
      onChange(type);
      setShowHighlight(true);
      setHighlightWithTransition(true);
    }
  }

  function handleCustomClick() {
    setShowHighlight(false);
    onChange('Custom');
  }

  const defaultBtn = 'relative z-10 flex-1 px-4 py-2.5 h-[42px] text-sm font-medium';
  const selectedBtn = 'text-white scale-105';
  const unselectedBtn = 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200';

  return (
    <div className="space-y-2">
      <div className="relative flex bg-interactive-light dark:bg-interactive-dark rounded-lg p-1 w-full overflow-hidden h-[42px] items-center">
        <div className={`absolute inset-1 bg-custom-purple rounded-md shadow-lg shadow-custom-purple/20 ${showHighlight ? 'opacity-100' : 'opacity-0'}${highlightWithTransition ? ' transition-all duration-300' : ''}`} style={highlightStyle}/>
        <Button onClick={() => handleTypeClick('Left')} className={`${defaultBtn} ${value === 'Left' ? selectedBtn : unselectedBtn}`}>Left</Button>
        <Button onClick={() => handleTypeClick('Middle')} className={`${defaultBtn} ${value === 'Middle' ? selectedBtn : unselectedBtn}`}>Middle</Button>
        <Button onClick={() => handleTypeClick('Right')} className={`${defaultBtn} ${value === 'Right' ? selectedBtn : unselectedBtn}`}>Right</Button>
      </div>
      <Button
        onClick={handleCustomClick}
        className={`clikr-btn ${value === 'Custom' ? 'clikr-btn-selected' : 'clikr-btn-unselected'}`}
      >
        Custom
      </Button>
    </div>
  );
};

export default ClickTypeSelector;