import React, { useEffect, useState } from "react";
import ToDoItem from "./ToDoItem";
import { db } from "../firebase";
import { query,collection, onSnapshot,doc , addDoc, deleteDoc} from "firebase/firestore";
//,updateDoc, doc
function App() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);

  //create todo
  const createTodo = async (e) => {
    e.preventDefault(e);
    if(inputText === '') {
      alert('Please enter a valid todo')
      return
    }
    await addDoc(collection(db, 'toDos'), {
      text: inputText,
      completed: false,
    })
    setInputText("");
  };
  
  // read
  useEffect(()=>{
    const q=query(collection(db,'toDos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = []
      querySnapshot.forEach((doc) => {
        todosArr.push({...doc.data(), id: doc.id})
      });
      setItems(todosArr);
    });
    return () => unsubscribe()
  },[]);
  //update
  // const toggleComplete = async (todo) => {
  //   await updateDoc (doc (db, 'todos', todo.id), {
  //   completed: !todo.completed
  //   }) 
  // }


  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  // function addItem() {
  //   setItems(prevItems => {
  //     return [...prevItems, inputText];
  //   });
  //   setInputText("");
  // }
  //delete
  async function deleteItem(id) {
    // setItems(prevItems => {
    //   return prevItems.filter((item, index) => {
    //     return index !== id;
    //   });
    // });
    await deleteDoc (doc (db, 'toDos', id));
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onChange={handleChange} type="text" value={inputText} />
        <button onClick={createTodo}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {items.map((todoItem, index) => (
            <ToDoItem
              key={index}
              id={todoItem.id}
              text={todoItem.text}
              ondelete={deleteItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
