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
    fetch("http://127.0.0.1:5000/todolist").then(response =>
      response.json().then(
        data => setList(data)));
  }, [])
  /** Local Storage
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(toDoList))}
    , [toDoList]
  )**/
  const listItems = toDoList.map((list) => {
    return(<li>
      <input type='checkbox' id="item"/>
      <label htmlFor='item'>{list[1]}</label>
      <button onClick={(e)=> handleDelete(e, toDoList.indexOf(list))} className='btn btn-danger'>Delete</button>
      </li>)
  });
  
  function handleDelete(event, idx) {
    event.preventDefault();
    const newToDo = [...toDoList]
    const delItem = newToDo[idx]
    newToDo.splice(idx, 1)
    console.log(delItem)
    fetch("http://127.0.0.1:5000/del_item", {
          method:"POST",
          body:JSON.stringify({"item_no" : delItem[0], "item": delItem[1]}),
          headers: {'Content-type': 'application/json; charset=UTF-8'},
          }).then(console.log("item deleted"))
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