import { Input, Form, Button, Row, Col, Divider} from 'antd';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from "react";
import { FaRegCheckSquare, FaRegSquare } from "react-icons/fa";
import {useParams, useLocation} from 'react-router-dom';
const endpoint = "http://localhost:3004";


const Task = () =>{
  const params = useParams();
  const location = useLocation();
  const [list, setList] = useState([]);
  const [Lista, setLista] = useState({});
  const [listFilter, setListFilter] = useState([]);
  const [isEditing , setIsEditing] = useState([]);
  const [isOnlyPending, setIsOnlyPending] = useState(false);

  async function onSubmit(values) {

    
    const task = {
      id: new Date(),
      list_id: params.id,
      name: values.task,
      status: "pendente",
    };
    await axios.post(`${endpoint}/tasks`,task);
    getTasks(params.id);
  }


  async function getTasks(id){
    const res = await axios.get(`http://localhost:3004/tasks?list_id=${id}`)
    if(res.status === 200){
      setList(res.data);
    }
  }


  async function getLista(id){
    const res = await axios.get(`http://localhost:3004/lists/${id}`);
    console.log(res.data)
    if(res.status === 200){
      setLista(res.data);
    }
  }




  async function toggle(item) {
    item.status = item.status === "pendente" ? "feito" : "pendente";
    await axios.put(`${endpoint}/tasks/${item.id}`,item);
    getTasks(params.id)
  }

  async function filter() {
    let url = `${endpoint}/tasks`
    if(isOnlyPending){
      url = url + `?status=pendente&list_id=${params.id}`
    }

    const response = await axios.get(url);
    if(response.status === 200) setList(response.data);
    console.log(response.data)
    setIsOnlyPending(!isOnlyPending)

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

  useEffect(() =>{
    if(params.id){
      getTasks(params.id);
      getLista(params.id);
    }
  },[location]);
  
    return (
        <div className="App">
          <h1>{Lista && Lista.name}</h1>
          <Divider/>
          <div id="todoList" >ToDo List</div>
          <Form onFinish={onSubmit}>
            <Row>
              <Col sm={20}>
            <Form.Item name="task">
            <Input  id= "task"/>
            </Form.Item>
            </Col>
            <Col sm={4}>
            <Button htmlType="submit">Adicionar</Button>
            </Col>
            </Row>
          </Form>
          {isOnlyPending ? <button onClick={filter}>Pendentes</button> : <button onClick={filter}>Todas</button>}
          <ul>
            
            {list.map((item, index) => {
              return (
                <li style={item.status === "feito" ? { textDecoration: "line-through" } : {}} key={index}>
                  
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


export default Task;