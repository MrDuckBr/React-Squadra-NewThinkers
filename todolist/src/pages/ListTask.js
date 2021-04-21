
import {PageHeader,Form,Input,Button, Row, Col, Table, Space, Popconfirm, message} from 'antd';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaList } from 'react-icons/fa';
import {useHistory} from 'react-router-dom'

const ListTask = () => {
    const [list, setList] = useState([]);
    const history = useHistory();

    async function getLists() {
        const res = await axios.get("http://localhost:3004/lists");
        setList(res.data);
    }

    useEffect(() => {
        getLists();
    }, [])

    async function onDelete(list_id){
        const res = await axios.delete(`http://localhost:3004/lists/${list_id}`);
        if(res.status === 200){
            message.success("Lista Deletada com Sucesso!");
            getLists();
        }
    }

    const columns =[
        {
            title:'Nome', 
            dataIndex: 'name',
            key:'name'

        },
        {
            title: 'Ações',
            dataIndex:'actions',
            key:'actions',
            render: (text, record) =>{
                return (
                <Space>
                <Button onClick={() => history.push(`/list/${record.id}`)} icon={<FaList/>}/>
                <Popconfirm  title="Confirmar Exclusão?" onConfirm={() => onDelete(record.id)} okText="Sim" cancelText="Cancelar">
                <Button icon={<FaTrash/>}/>
                </Popconfirm>
                </Space>
                );
            }

        }

    ]

    const onFinish = async (values) =>{
        const id = new Date();
        await axios.post("http://localhost:3004/lists",{ id,name: values.lista })
        getLists();
    }
    return (
        <>
        <PageHeader  title="Listas: " subTitle="Lista de Tarefas" />
        <Form onFinish={onFinish}>
            <Row>
                <Col sm={20}>
            <Form.Item name="lista" rules={[{required:true, message:"Nome da Lista"}]}>
                <Input/>
            </Form.Item>
            </Col>
            <Col sm={4}>
            <Button htmlType = "submit">Criar</Button>
            </Col>
            </Row>
        </Form>
        
        <Table rowKey="id" dataSource={list} columns = {columns} />
        
        </>
    );
};

export default ListTask;


