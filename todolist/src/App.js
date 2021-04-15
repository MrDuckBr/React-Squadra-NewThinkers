import { useState } from "react";
import { FaRegCheckSquare, FaRegSquare } from "react-icons/fa";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [listFilter, setListFilter] = useState([]);
  const [isEditing , setIsEditing] = useState([]);
  const [isOnlyPending, setIsOnlyPending] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    console.log(e.target.task.value);
    const task = {
      id: new Date(),
      name: e.target.task.value,
      status: "pendente",
    };
    setList([...list, task]);
    setListFilter([...list, task]);
    document.getElementById("task").value = "";
  }

  function toggle(item) {
    
    const newList = list.map((t) => {
      if (t.id === item.id){
        if(t.status === "feito"){
          t.status = "pendente";
        }else if(t.status === "pendente"){
          t.status = "feito";
        }
      }
      console.log(t.status);
      return t;
    });
    setList(newList);
  }

  function filter() {
    const listToFilter = listFilter.filter((item) => {
      return !isOnlyPending ? item.status === "pendente" : true;
    });
    setList(listToFilter);
    setIsOnlyPending(!isOnlyPending);
  }


  function save(newName, item) {
    const newList = list.map((t) => {
      if (t.id === item.id) {
        t.name = newName;
        t.status = "pendente";
      }
      return t;
    });
    setList(newList);
    setIsEditing("");
  }

  function onKeyDown(e,item){
    if (e.charCode === 13 || e.keyCode === 13) save(e.target.value, item);
  }
  
  function onBlur(e, item) {
    save(e.target.value, item);
  }
  
  

  return (
    <div className="App">
      <div id="todoList" >ToDo List</div>
      <form onSubmit={onSubmit}>
        <input name="task" id= "task"/>
        <button type="submit">Adicionar</button>
        
      </form>
      {isOnlyPending ? <button onClick={filter}>Concluidas</button> : <button onClick={filter}>Pendentes</button>}
      <ul>
        
        {list.map((item, index) => {
          return (
            <li style={item.status === "feito" ? { textDecoration: "line-through", backgroundColor: "green" } : {backgroundColor: "red"}} key={index}>
              
              <span>
                {
                isEditing === item.id ?(
                  <input defaultValue={item.name} onBlur={(e)=> onBlur(e,item)} onKeyDown={(e) => onKeyDown(e,item)}></input>
                ):(
                  <b id="itens" onClick = {() => setIsEditing(item.id)}>{item.name}</b>
                
                )}
                </span>
              
              <button onClick={() => toggle(item)}>
                {item.status === "feito" ? 
                  <FaRegCheckSquare /> : 
                  <FaRegSquare />}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
