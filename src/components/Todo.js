import React, { useState, useRef, useEffect } from "react";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}


const Todo = (props) => {

  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState(props.name);
  const [newPriority, setNewPriority] = useState(props.priority);
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);
  const wasEditing = usePrevious(isEditing);

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handlePriority(e){
    setNewPriority(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName, newPriority);
    setNewName("");
    setEditing(false);
  }

  const prio = `[${props.priority}]`;

    const editingTemplate = (
      <form className="stack-small" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="todo-label" htmlFor={props.id}>
            Modify the task {props.name}
          </label>
          <input 
          id={props.id} 
          className="todo-text" 
          type="text" 
          value={newName} 
          onChange={handleChange} 
          ref={editFieldRef}
          required
          />
          <br/>
          <br/>
         <select
        value={newPriority}
        className="select__lg"
        name="priority"
        id="priority"
        onChange = {handlePriority}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

        </div>
        <div className="btn-group">
          <button type="button" className="btn todo-cancel" onClick={()=> setEditing(false)}>
            Cancel
            <span className="visually-hidden">renaming {props.name}</span>
          </button>
          <button type="submit" className="btn btn__primary todo-edit">
            Save
            <span className="visually-hidden">new description for {props.name}</span>
          </button>
        </div>
      </form>
    );
    const viewTemplate = (
      <div className="stack-small">
        <div className="c-cb">
            <input
              id={props.id}
              type="checkbox"
              defaultChecked={props.completed}
              onChange={() => props.toggleTaskCompleted(props.id)}
            />
            <label className="todo-label" htmlFor={props.id}>
              {props.name} <strong>{prio}</strong>
            </label>
          </div>
          <div className="btn-group">
            <button 
            type="button" 
            className="btn" 
            onClick = {()=> setEditing(true)}
           ref={editButtonRef}
            >
              Edit <span className="visually-hidden">{props.name} </span>
            </button>
            <button
              type="button"
              className="btn btn__danger"
              onClick={() => {
                alert("Task Deleted!")
                return props.deleteTask(props.id);
              }
            }
            >
              Delete <span className="visually-hidden">{props.name}</span>
            </button>
          </div>
      </div>
    );
    
    useEffect(() => {
      if (!wasEditing && isEditing) {
        editFieldRef.current.focus();
      }
      if (wasEditing && !isEditing) {
        editButtonRef.current.focus();
      }
    }, [wasEditing, isEditing]);
    
    return (<li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>);
}

export default Todo;