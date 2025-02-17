import { useState, useImperativeHandle, forwardRef, ReactNode } from 'react';
import PropTypes from 'prop-types';

// Define the props interface
interface TogglableProps {
  buttonLabel: string; // Label for the toggle button
  children: ReactNode; // Content to be shown/hidden
}

// Define the ref interface for useImperativeHandle
export interface TogglableRef {
  toggleVisibility: () => void; // Exposed method to toggle visibility
}

const Togglable = forwardRef<TogglableRef, TogglableProps>((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  // Expose the toggleVisibility method via ref
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel:PropTypes.string.isRequired
}

export default Togglable;