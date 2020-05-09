import PropTypes from 'prop-types';
import React from 'react';

export const OptionPicker = ({ name, options, onChange, selected }) => {
  return (
    <div>
      <label htmlFor={name.toLowerCase()}>
        <span>{name}</span>
        <select
          onChange={onChange}
          value={selected}
          id={name.toLowerCase()}
          className="form-select"
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
