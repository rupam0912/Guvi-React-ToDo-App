import React, {useState, useRef, useEffect} from "react";
import {nanoid} from "nanoid";
import "./styles.css";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}



const FILTER_MAP = {
  All: () => true,
  Pending: task => !task.completed,
  Completed: task => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);



const App = (props) => {

  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  const addTask = (name,priority) => {
    const newTask = {id: "todo-" + nanoid() , name: name, completed: false, priority: priority};
    setTasks([...tasks, newTask]);
}



  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id){
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName, newPriority) {
    const editedTaskList = tasks.map(task => {
    // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return {...task, name: newName, priority: newPriority}
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
    key={name}
    name={name}
    isPressed={name === filter}
    setFilter={setFilter}
  />
  ));
  

  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map(task => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      priority={task.priority}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));
  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  
  const headingText = `${taskList.length} ${tasksNoun} =>`;
  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  let count = [0,0,0];
  taskList.forEach((task)=> {
    if(task.props.priority === "High")
      count[0]++;
    else if(task.props.priority === "Medium")
      count[1]++;
    else
      count[2]++;
  });

  const countPriority = `HP:${count[0]} MP:${count[1]} LP:${count[2]}`;
 
  return (
    <div className="todoapp stack-large">
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText} {countPriority}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
