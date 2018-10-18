import React from 'react';

import classes from './DeleteDialog.module.css';

const DeleteDialog = props => (
  <div className={classes.DeleteDialog}>
    <h3>Are you sure you want to delete this movie?</h3>
    <div>
      <button className={classes.Yes} onClick={props.confirm}>
        Yes
      </button>
      <button className={classes.No} onClick={props.cancel}>
        No
      </button>
    </div>
  </div>
);

export default DeleteDialog;
