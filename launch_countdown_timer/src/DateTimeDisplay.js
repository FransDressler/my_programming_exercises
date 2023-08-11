import React, { useState, useEffect } from 'react';

const DateTimeDisplay = ({ value, type }) => {
  const [hasSlipAnimation, setHasSlipAnimation] = useState(false);

  useEffect(() => {
    // Function to add the animation class
    const addSlipAnimation = () => {
      setHasSlipAnimation(true);

      // Remove the animation class after a certain duration (e.g., 1 second)
      setTimeout(() => {
        setHasSlipAnimation(false);
      }, 500); // 1 second (1000 milliseconds)
    };

    // Call the function when the value changes
    if (value !== null) {
      addSlipAnimation();
    }
  }, [value]);

  return (
    <div className='countdown'>
        <div class={`counter ${hasSlipAnimation ? '' : ''}`}>
          {/* <div className="date-number">{value}</div> */}
          <div class="sheet" data-target={value}>
            <div class={`up ${hasSlipAnimation ? 'animation-flip' : ''}`}>
              <span><div>{value}</div></span>
            </div>
            <div class="down">
              <span><div>{value}</div></span>
            </div>
          </div>
      </div>
      <span className="type">{type}</span>
    </div>
  );
};

export default DateTimeDisplay;

