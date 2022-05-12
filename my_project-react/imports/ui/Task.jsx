import { Meteor } from 'meteor/meteor';
import React, { Fragment, useState } from 'react';

export const Task = ({ task, onCheckboxClick, onDeleteClick }) => {

  // task description
  const [TaskD, setTaskD] = useState(task.Task_d);

  // show description
  const [showd, setshowd] = useState(false);


  const handleUnFocus = e => {
    e.preventDefault();
    console.log(!TaskD, "in unfocus")
    if (!TaskD) return;

    Meteor.call('tasks.update',TaskD);

  };

  console.log(TaskD)
  return (
    <Fragment>
      <li>
        <input
          type="checkbox"
          checked={!!task.isChecked}
          onClick={() => onCheckboxClick(task)}
          readOnly
        />
        <span>{task.text}</span>
        <button onClick={ () => onDeleteClick(task) }>&times;</button>
      </li>

      {/* This div is the "container" for the check box and text description" */}
      
      <button className={showd ? "upsidedown specialButton":"specialButton"} onClick={()=>{setshowd(!showd)}}>{showd ? "^":">"}</button>
      {showd ?
      <input
        type="text"
        placeholder="Type to add new tasks"
        value={TaskD}
        onChange={(e) => setTaskD(e.target.value)}
        onBlur={(e) => handleUnFocus(e)}
      />
      : <Fragment/>
      }
        
      
    </Fragment>
    
  );
};