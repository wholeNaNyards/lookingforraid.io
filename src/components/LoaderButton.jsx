import React from 'react';
import { Button } from 'react-bootstrap';
import './LoaderButton.css';

const LoaderButton = ({
  isLoading,
  text,
  loadingText,
  className = '',
  disabled = false,
  ...props
}) => (
  <Button className={`LoaderButton ${className}`} disabled={disabled || isLoading} {...props}>
    {!isLoading ? text : loadingText}
  </Button>
);

export default LoaderButton;
