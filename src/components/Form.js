import React, { useState, useRef, useEffect } from "react";

const Form = props => {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("High");
  const mainFocus = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    props.addTask(name,priority);
    setName("");
    alert("Task Added!")
  }

  function handleChange(e) {
    setName(e.target.value);
  }
  function handlePriority(e) {
    setPriority(e.target.value);
  }

  useEffect(() => mainFocus.current.focus(), []);

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
        ref={mainFocus}
        required
      />
      <h3 className="label-wrapper">
        <label htmlFor="priority" className="label__lg">
          Choose priority
        </label>
      </h3>
      <select
        value={priority}
        className="select__lg"
        name="priority"
        id="priority"
        onChange = {handlePriority}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );

};

export default Form;
