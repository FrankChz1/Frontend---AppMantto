import React, { useState } from 'react';

function ColorSlider({ 
  label = 'Temperature', 
  min = 0, 
  max = 100, 
  defaultValue = 30, 
  color = '#FF5000',
  unit = '°C', 
  onValueChange 
}) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e) => {
    const newValue = Math.max(min, Math.min(max, Number(e.target.value)));
    setValue(newValue);
    onValueChange?.(newValue);
  };

  const getBackgroundStyle = () => {
    const percentage = ((value - min) / (max - min)) * 100;
    return {
      background: `linear-gradient(to right, ${color} ${percentage}%, #e5e7eb ${percentage}%)`
    };
  };

  return (
    <div className="w-full mx-auto border-2 border-gray-200 rounded-lg p-4">
      <label 
        htmlFor="color-slider" 
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <div className="flex items-center space-x-4">
        <input
          id="color-slider"
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          className="flex-1 h-2 rounded-lg appearance-none cursor-pointer 
                   focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={getBackgroundStyle()}
          aria-label={label}
        />
        <input
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          className="w-16 p-1 text-center border border-gray-300 rounded 
                   focus:outline-none focus:ring-2"
          aria-label={`${label} value`}
        />
      </div>
    </div>
  );
}

export default ColorSlider;