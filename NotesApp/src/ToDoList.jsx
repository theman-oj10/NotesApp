import React, { useState, useEffect } from 'react'
import NewItemForm from './NewItemForm';

function ToDoList() {
  const[toDoList, setList] = useState(
    () => {
        const localValue = localStorage.getItem("ITEMS")
        if (localValue == null) {
            return [];
        } else {
            return JSON.parse(localValue);
        }
    }
  );
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(toDoList))}
    , [toDoList]
  )
  const listItems = toDoList.map((list) => {
    return(<li>
      <input type='checkbox' id="item"/>
      <label htmlFor='item'>{list}</label>
      <button onClick={(e)=> handleDelete(e, toDoList.indexOf(list))} className='btn btn-danger'>Delete</button>
      </li>)
  });

  function handleDelete(event, idx) {
    event.preventDefault();
    const newToDo = [...toDoList]
    newToDo.splice(idx, 1)
    console.log(newToDo)
    setList(newToDo)
  }

  

  return (
  <>
    <NewItemForm list= {toDoList} onAdd={setList}/>
    <h1>Todo List</h1>
    <ol className='list'>
      {listItems}
    </ol>
  </>)
}
export default ToDoList