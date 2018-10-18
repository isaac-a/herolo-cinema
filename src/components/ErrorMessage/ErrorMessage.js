import React from 'react';

import classes from './ErrorMessage.module.css';

const ErrorMessage = props => (
  <p className={classes.ErrorMessage}>{props.children}</p>
);

export default ErrorMessage;
