import PropTypes from 'prop-types';
import * as React from 'react';

export const OptionPicker = ({ name, options, onChange, selected }) => {
  if (options.length <= 1) return null;
  return (
    <div>
      <label htmlFor={name.toLowerCase()}>
        <span className="block font-bold">{name}</span>
        <select
          onChange={onChange}
          value={selected}
          id={name.toLowerCase()}
          className="mt-1 border-gray-300 rounded-md shadow-sm focus:border-transparent focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          {options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

OptionPicker.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.any,
  selected: PropTypes.any,
};
