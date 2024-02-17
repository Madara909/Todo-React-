import React, { useEffect, useState } from "react";
import ToDoItem from "./ToDoItem";
import { auth, db } from "../firebase";
import { useNavigate } from 'react-router-dom';
import { query,collection, onSnapshot,doc,updateDoc , addDoc, deleteDoc} from "firebase/firestore";
import { signOut } from "firebase/auth";

//, doc
function ToDolist({isAuthenticated, setIsAuthenticated}) {
    const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);
  const navigate=useNavigate();
  if(!isAuthenticated){
    navigate("/");
  }

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
  const toggleComplete = async (todo) => {
    await updateDoc (doc (db, 'toDos', todo.id), {
    completed: !todo.completed
    }) 
  }


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
  const handelsignout=()=>{
    signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
      setIsAuthenticated(false);
  };

  return (
    <div>
    <button onClick={handelsignout}>
          <span>signOut</span>
        </button>
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
              completed={todoItem.completed}
              ondelete={deleteItem}
              toggleComplete={toggleComplete}

            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ToDolist
