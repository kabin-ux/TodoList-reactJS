import React, { useEffect, useState } from 'react';
import './style.css';

// get data from localStorage
const getLocalData = () => {
  const lists = localStorage.getItem('mytodolist');
  if(lists){
    return JSON.parse(lists);
  }
    return [];
};

const Todo = () => {
  const [inputValue,setInputValue] = useState('');
  const [items, setItems] = useState(getLocalData());
  const [isEdit, setIsEdit] = useState('');
  const [toggleButton, setToggleButton] = useState(false);

  //add item
  const addItem = () => {
    if(!inputValue) {
      alert("Please enter some value..");
    } else if(inputValue && toggleButton){
        setItems(items.map((currentElement) => {
          if (currentElement.id === isEdit ){
            return {...currentElement, name: inputValue};
          }
          return currentElement;
        }));
        setInputValue('')
        setToggleButton(false);
        setIsEdit();
    } 
    else{
        const myNewInputValue = {
          id: new Date().getTime().toString(),
          name : inputValue
        }

        setItems([...items, myNewInputValue]);
        setInputValue('');
    };
  };

  //edit item
  const editItem = (index) => {
    const editedItems = items.find((currentElement) => {
      return currentElement.id === index;
    });
    setInputValue(editedItems.name);
    setIsEdit(index);
    setToggleButton(true);
  };

  //delete item
  const deleteItem = (index) => {
    const updatedItems = items.filter((currentElement) => {
      return currentElement.id !== index;
    });
    setItems(updatedItems);
  };

  //add localStorage
  useEffect(() => {
    localStorage.setItem('mytodolist',JSON.stringify(items));
  }, [items]);
    
  return (
    <>
      <div className='main-div'>
        <div className='child-div'>
          <h1>To-Do List</h1>
          
          {/* add section */}
          <div className='add-items'>
            <input type = 'text' placeholder='Add your tasks...✍️' value={inputValue} onChange={(e) => setInputValue(e.target.value)} className='todo-input' />
            {toggleButton ? (
              <i class="fa fa-edit" onClick={addItem}></i>
            ) :(
              <i class="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>

          {/* show section */}
          <div className='show-items'>
            {items.map((currentElement) => {
              return (
                <div className='each-item'>
                  <h3>{currentElement.name}</h3>
                  <div className='icons'>
                    <i class="fa fa-edit add-btn" onClick={() => editItem(currentElement.id)} aria-hidden="true"></i>
                    <i class="fa fa-trash" onClick={() => deleteItem(currentElement.id)} aria-hidden="true"></i>
                  </div>
                </div>
              );
            })}      
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
