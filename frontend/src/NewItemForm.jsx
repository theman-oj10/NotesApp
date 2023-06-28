import React, {useState} from 'react'


function NewItemForm({ list, onAdd }) {
    const[newItem, setItem] = useState("")
    let serial_no = 0;
    function handleAdd(event, item) {
        if (!item) {
            window.alert("Find Something To Do!")
            return;
        }
        event.preventDefault();
        const newToDo = [...list]
        // storing the item as an array of item_no, item
        const itemObj = [serial_no, item]
        newToDo.push(itemObj)
        console.log(item)
        fetch("http://127.0.0.1:5000/add_item", {
          method:"POST",
          body:JSON.stringify({"item_no" : serial_no, "item": item}),
          headers: {'Content-type': 'application/json; charset=UTF-8'},
          }).then(console.log("item added"))
        serial_no++
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