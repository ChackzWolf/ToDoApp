//import React, { Component } from 'react'
import "./TodoApp.css";
import { useState } from 'react';



const TodoApp = () => {
    const[input, setInput] = useState('')
    const[inputData,setInputData] = useState([])
    const[editDataIndex,setEditDataIndex] = useState(-1)

    const addTodo = (e) =>{
        e.preventDefault();

        if (input.trim() === '') {
            alert('Please enter a task.');
            return;
        }

        if (inputData.some((task) => task.list.toLowerCase() === input.toLowerCase().trim())) {
            alert('This task already exists in the list.');
            return;
        }

        const maxTaskLength = 100;
        if (input.length > maxTaskLength) {
            alert(`Task cannot exceed ${maxTaskLength} characters.`);
            return;
        }
        
        if(input !== ''){
            setInputData([...inputData,{list: input, id: Date.now(),status: false}])
            setInput('')
        }
        if(editDataIndex >=0 ){
            inputData[editDataIndex] = {list: input,Status:false};
            setInputData(inputData)
            setEditDataIndex(0)
        }
      

    }
    const deleteItem = (index) => {
        const updatedData = [...inputData];
        updatedData.splice(index, 1);
        setInputData(updatedData);
    };
    const completed = (index)=>{
        let complete = inputData.map((input,i)=>{
            if(i === index){
                return ({...input,status:true})
            }
            return input;
        })
        setInputData(complete)

    }
    const onEdit = (index)=>{
        const editData = inputData[index];
        setInput(editData.list)
        setEditDataIndex(index)
    }
    return(

        <div className='todo-container'>
            <form className='input-section' onSubmit={addTodo}>
                <h1>TODO App</h1>
                <div className="input">
                <input type ="text" value={input} placeholder='Add new task' onChange={(event)=>setInput(event.target.value)}></input>
                <button>{editDataIndex > -1 ? 'EDIT':'ADD'}</button>
                </div>
            </form>
            <ul>
                {
                    inputData.map((input,index)=>(
                        <li className="list-item" key={index}>
                            <div id={input.status ? 'list-items' :input.status}>{input.list}</div>
                            <span>
         {input.status ? false: <i className="fa-solid fa-check fa-lg" onClick={()=>completed(index)}></i>}
                                <i className="fa-solid fa-pen-to-square" onClick={()=>onEdit(index)}></i> 
                                <i className="fa-solid fa-trash" onClick={()=>deleteItem(index)} />
                                
                            </span>
                        </li>

                    ))
                }
            </ul>
        </div>
    );
};



 export default TodoApp


