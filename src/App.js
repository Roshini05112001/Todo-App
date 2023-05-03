import React,{useEffect, useState} from 'react';
import './App.css';
import {AiOutlineDelete} from 'react-icons/ai'
import {BsCheckLg} from 'react-icons/bs'

function App() {
  const [isCompleteScreen , setIsCompleteScreen] = useState(false);
  const [allTodos , setallTodos] = useState([]);
  const [newTittle , setnewTittle] = useState("");
  const [newDescription , setnewDescription] = useState("");
  const [completedTodos , setnewCompletedTodo] = useState([]);

  const handleAddTodo = ()=>{
    let newTodoItem ={
      tittle:newTittle,
      description:newDescription 
  }   

     let updateTodoArr = [...allTodos];
     updateTodoArr.push(newTodoItem);
     setallTodos(updateTodoArr);
     localStorage.setItem('todolist',JSON.stringify(updateTodoArr))

     setnewTittle("");
     setnewDescription("");
  };

  const handleDeleteTodo = (index)=>{
    let reducedTodo = [...allTodos]
    reducedTodo.splice(index , 1)

    localStorage.setItem('todolist',JSON.stringify(reducedTodo))
    setallTodos(reducedTodo)
  }

  const handleDeleteCompletedTodo = (index)=>{
    let reducedTodo = [...completedTodos]
    reducedTodo.splice(index , 1)

    localStorage.setItem('completedTodos',JSON.stringify(reducedTodo))
    setnewCompletedTodo(reducedTodo)

  }

  const handleCompleteTodo = (index) => {
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    let hh = date.getHours();
    let minutes = date.getMinutes();
    let ss = date.getSeconds();
    let completedOn =
      dd + '-' + mm + '-' + yyyy + ' at ' + hh + ':' + minutes + ':' + ss;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    }
    let updatedCompletedArr = [...completedTodos]
    updatedCompletedArr.push(filteredItem)
    setnewCompletedTodo(updatedCompletedArr)
    handleDeleteTodo(index)
    localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArr))

  }




  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'))
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'))
    if(savedTodo){
      setallTodos(savedTodo);
    }
    if(savedCompletedTodo){
      setnewCompletedTodo(savedCompletedTodo)
    }
  },[])




  return (
    <div className='App'>
      <h1>My Todos</h1>
      <div className='todo-wrapper'>

        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Tittle:</label>
            <input type='text' value={newTittle} onChange={(e)=>setnewTittle(e.target.value)} placeholder="What's the Tittle?"/> 
          </div>
          <div className='todo-input-item'>
            <label>Description:</label>
            <input type='text' value={newDescription} onChange={(e)=>setnewDescription(e.target.value)} placeholder="What's the Description?"/> 
          </div>
          <div className='todo-input-item'>
            <button type='button' onClick={handleAddTodo} className='primaryBtn'>Add</button>
          </div>
        </div>

        <div className='btn-area'>
          <button className={`secondaryBtn ${isCompleteScreen===false && 'active'}`} onClick={()=> setIsCompleteScreen(false)}>Todo</button>
          <button className={`secondaryBtn ${isCompleteScreen===true && 'active'}`} onClick={()=> setIsCompleteScreen(true)}>Completed</button>
        </div>

        <div className='todo-list'>
          { isCompleteScreen===false && allTodos.map((item,index)=>{
            return(
              <div className='todo-list-item' key={index}>
                <div>
                   <h3>{item.tittle}</h3>
                   <p>{item.description}</p>
                </div>
                <div>
                   <AiOutlineDelete className='icon' onClick={()=>handleDeleteTodo(index)}/>
                   <BsCheckLg className='check-icon' onClick={()=>handleCompleteTodo(index)}/>
                </div>
               </div> 
            )})}

           { isCompleteScreen===true && completedTodos.map((item,index)=>{
            return(
              <div className='todo-list-item' key={index}>
                <div>
                   <h3>{item.tittle}</h3>
                   <p>{item.description}</p>
                   <p><small>Completed on:{item.completedOn}</small></p>
                </div>
                <div>
                   <AiOutlineDelete className='icon' onClick={()=>handleDeleteCompletedTodo(index)}/>
                   {/* <BsCheckLg className='check-icon' onClick={()=>handleCompleteTodo(index)}/> */}
                </div>
               </div> 
            )})}
           
          
        </div>

      </div>
    </div>
  );
}

export default App;
