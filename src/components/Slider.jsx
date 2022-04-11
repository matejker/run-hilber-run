import React from 'react';

const Slider = ({min, max, step, stateChanger, pathChanger, getPath, coordinates, value, curveType}) => {
  return <input
    type="range"
    min={ min }
    max={ max }
    step={step}
    value={ value }
    onChange={(e) => (stateChanger(e.target.value), pathChanger(getPath(coordinates, curveType, e.target.value))) }
 />;
};

export default Slider;