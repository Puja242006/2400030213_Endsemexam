import React, { useState } from 'react'

const Todo = () => {
    const[task,settask]=useState('');
    const[tasks,settasks]=useState([]);
    const addtask=()=>{
        if(task!==''){
            settasks([...tasks,task])
            settask('');
        }
    }
     const markComplete = (index) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: true } : t
    );
    settasks(updatedTasks);
  };

  const markIncomplete = (index) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: false } : t
    );
    settasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    settasks(updatedTasks);
  };
  return (
    <div>
        <fieldset>
       <h1 style={{backgroundColor:"blue"}}>EMPLOYEE TO DO LIST</h1>
       <form action="">
        <input type="text" value={task} onChange={e=>settask(e.target.value)} placeholder="Enter a task" /> <br></br> <br></br>
        <input type="button" onClick={addtask} value="ADD"  style={{ backgroundColor: "yellowgreen" }} />&nbsp;
        <ol>
  {tasks.map((t, index) => (
    <li key={index}>
      <span style={{ textDecoration: t.completed ? "line-through" : "none" }}>
        {t.name}   {/* ✅ this shows the text you entered */}
      </span>
      <button onClick={() => markComplete(index)}>Complete</button>
      <button onClick={() => markIncomplete(index)}>Incomplete</button>
      <button onClick={() => deleteTask(index)}>Delete</button>
    </li>
  ))}
</ol>

        
 

       </form>
       </fieldset>
    </div>
  )
}

export default Todo