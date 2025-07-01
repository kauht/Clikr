import React, { useState } from 'react';
import { Button } from './ui/button';

const clickTypePositions = { Left: 0, Middle: 1, Right: 2 };

const ClickTypeSelector = () => {
  const [selectedType, setSelectedType] = useState<'Left' | 'Middle' | 'Right' | 'Custom'>('Left');
  const [showHighlight, setShowHighlight] = useState(true);
  const [highlightWithTransition, setHighlightWithTransition] = useState(true);

  const highlightStyle = {
    width: 'calc(33.333% - 2.8px)',
    transform: `translateX(${clickTypePositions[selectedType as keyof typeof clickTypePositions] * 100}%)`,
  };

  function handleTypeClick(type: 'Left' | 'Middle' | 'Right') {
    if (selectedType === 'Custom') {
      setHighlightWithTransition(false);
      setSelectedType(type);
      setTimeout(() => {
        setShowHighlight(true);
        setHighlightWithTransition(true);
      }, 10);
    } else {
      setSelectedType(type);
      setShowHighlight(true);
      setHighlightWithTransition(true);
    }
  }

  function handleCustomClick() {
    setShowHighlight(false);
    setSelectedType('Custom');
  }

  const defaultBtn = 'relative z-10 flex-1 px-4 py-2.5 h-[42px] text-sm font-medium';
  const selectedBtn = 'text-white scale-105';
  const unselectedBtn = 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200';

  return (
    <div className="space-y-2">
      <div className="relative flex bg-interactive-light dark:bg-interactive-dark rounded-lg p-1 w-full overflow-hidden h-[42px] items-center">
        <div className={`absolute inset-1 bg-custom-purple rounded-md shadow-lg shadow-custom-purple/20 ${showHighlight ? 'opacity-100' : 'opacity-0'}${highlightWithTransition ? ' transition-all duration-300' : ''}`} style={highlightStyle}/>
        <Button onClick={() => handleTypeClick('Left')} className={`${defaultBtn} ${selectedType === 'Left' ? selectedBtn : unselectedBtn}`}>Left</Button>
        <Button onClick={() => handleTypeClick('Middle')} className={`${defaultBtn} ${selectedType === 'Middle' ? selectedBtn : unselectedBtn}`}>Middle</Button>
        <Button onClick={() => handleTypeClick('Right')} className={`${defaultBtn} ${selectedType === 'Right' ? selectedBtn : unselectedBtn}`}>Right</Button>
      </div>
      <Button
        onClick={handleCustomClick}
        className={`clikr-btn ${selectedType === 'Custom' ? 'clikr-btn-selected' : 'clikr-btn-unselected'}`}
      >
        Custom
      </Button>
    </div>
  );
};

export default ClickTypeSelector; 