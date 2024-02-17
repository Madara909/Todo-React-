import React,{useState} from "react";
import { MdDeleteOutline } from "react-icons/md";

function ToDoItem(props) {
  let [isDone, setIsDone]=useState(false);
  function handleClick(){
    setIsDone( prev =>{
        return !prev;
    });
}
  return (
    <div className="listItems">
    <div onClick={handleClick}>
      <li style={{textDecoration: isDone?"line-through":"none"}}>{props.text}</li>
    </div>
    <div className="marg" onClick={() => {
        props.ondelete(props.id);
      }}> 
      <MdDeleteOutline />
      </div>
    </div>
    
  );
}

export default ToDoItem;
