import React, {useState} from 'react'


function NewItemForm({ list, onAdd }) {
    const[newItem, setItem] = useState("")

    function handleAdd(event, item) {
        if (!item) {
            window.alert("Find Something To Do!")
            return;
        }
        event.preventDefault();
        const newToDo = [...list]
        newToDo.push(item)
        console.log(newToDo)
        onAdd(newToDo)
        setItem("")
  }
  return (
    <>
    <form className='new-item-form'>
      <label htmlFor='item'>New Item</label>
      <br></br>
      <input 
        type='text' 
        id="item" 
        value={newItem} 
        onChange={(e)=>setItem(e.target.value)}
      />
      <br></br>
      <button onClick={(e)=>handleAdd(e,newItem)}>Add</button>
    </form>
    </>
  )
}

export default NewItemForm