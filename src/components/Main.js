import React, { Component, useEffect, useRef, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import icon from "../images/favicon-32x32.png";
import day from "../images/sunny-day.png";
import night from "../images/icon-moon.svg";
import backimage from "../images/bg-desktop-dark.jpg";
import "./your-component.css";
import './Alert.css'
export default function Main(props) {
  const [input, setInput] = useState("");
  const [edit,setEdit] = useState({
    id:"",
    data:""
  })
  const [notes, setNotes] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [active, setActive] = useState(false);
  const [modal,setModal] = useState(false);
  function getMinId() {
    let min = 1000;
    notes.map((note) => {
      if (note.id < min) {
        min = note.id;
      }
    });
    return min;
  }
  function handleKey(e) {
    if (e.key == "Enter") {
      if (input.length === 0) {
        alert("Note is empty");
        return;
      }
      const note = {
        id: idRef.current,
        data: input,
        showCross: false,
        completed: false,
      };
      setNotes((prevNotes) => [...prevNotes, note]);
      // setInput('');
    }
    idRef.current++;
  }
  function handleMode() {
    props.setNight((prevNight) => !prevNight);
  }

  function updateALL() {
    setActive(false);
    setCompleted(false);
  }

  function updateActive() {
    setActive(true);
    setCompleted(false);
  }
  function updateCompleted() {
    setActive(false);
    setCompleted(true);
  }
  const idRef = useRef(1);

  function deleteCompleted() {
    const updatedNotes = notes.filter((note) => note.completed == false);
    setNotes(updatedNotes);
  }

  function handleDelete(id) {
    if(id == edit.id){
      setModal(false)
    }
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  }

  function handleCompleted(id) {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        if (note.completed == true) {
          return { ...note, completed: false };
        } else {
          return { ...note, completed: true };
        }
      } else {
        return note;
      }
    });
    setNotes(updatedNotes);
  }

  function handleMouseEnter(id) {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, showCross: true };
      }
      return { ...note, showCross: false };
    });
    setNotes(updatedNotes);
  }

  function handleMouseLeave(id) {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, showCross: false };
      }
      return note;
    });
    setNotes(updatedNotes);
  }
  function getMinIdActive() {
    let min = 10000;
    notes.map((note) => {
      if (!note.completed && note.id < min) {
        min = note.id;
      }
    });
    return min;
  }
  function getMinIdCompleted() {
    let min = 10000;
    notes.map((note) => {
      if (note.completed && note.id < min) {
        min = note.id;
      }
    });
    return min;
  }
  function handleEdit(id,data){
    setModal(true)
    setEdit(prevEdit =>{
      return{
        ...prevEdit,
        id:id,
        data:data
      }
    })
  }
  useEffect(()=>{
    console.log(modal,edit)
  },[edit])
  const displayActive = notes.map((note) => {
    if (!note.completed) {
      let styles;
      let crossStyle;
      let min = getMinIdActive();
      note.id === min
        ? (styles = { borderRadius: "15px 15px 0px 0px" })
        : (styles = {});
      if (note.showCross === false) {
        crossStyle = { display: "none" };
      }
      return (
        <div
          className={
            props.night
              ? "flex items-center p-4 cursor-pointer bg-very-dark-saturated-blue border-b border-gray-700 border-t hover:scale-y-105 transition ease-linear"
              : "flex items-center p-4 cursor-pointer day border-b border-gray-300 border-t  hover:scale-y-105 transition ease-linear"
          }
          style={styles}
          onMouseEnter={() => handleMouseEnter(note.id)}
          onMouseLeave={() => handleMouseLeave(note.id)}
          
        >
          <input
            type="checkbox"
            className="cursor-pointer h-8 w-8 mr-8"
            onChange={() => handleCompleted(note.id)}
            checked={note.completed}
          />
          <span className="text-gray-400"onClick = {() => handleEdit(note.id,note.data)}>{note.data}</span>
          <div
            style={crossStyle}
            className="ml-auto h-8 text-gray-300"
            onClick={() => handleDelete(note.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      );
    }
  });

  const displayCompleted = notes.map((note) => {
    if (note.completed) {
      let styles;
      let crossStyle;
      let min = getMinIdCompleted();
      note.id === min
        ? (styles = { borderRadius: "15px 15px 0px 0px" })
        : (styles = {});
      if (note.showCross === false) {
        crossStyle = { display: "none" };
      }
      return (
        <div
          className={
            props.night
              ? "flex items-center p-4 cursor-pointer bg-very-dark-saturated-blue   hover:scale-y-105 transition ease-linear border-b border-gray-700 border-t"
              : "flex items-center p-4 cursor-pointer day  hover:scale-y-105 transition ease-linear border-b border-gray-300 border-t "
          }
          style={styles}
          onMouseEnter={() => handleMouseEnter(note.id)}
          onMouseLeave={() => handleMouseLeave(note.id)}
        >
          
          <input
            type="checkbox"
            className="cursor-pointer h-8 w-8 mr-8"
            onChange={() => handleCompleted(note.id)}
            checked={note.completed}
          />
          <span className="text-gray-400" onClick = {() => handleEdit(note.id,note.data)}>{note.data}</span>
          <div
            style={crossStyle}
            className="ml-auto h-8 text-gray-300"
            onClick={() => handleDelete(note.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      );
    }
  });

  const displayNotes = notes.map((note) => {
    let styles;
    let crossStyle;
    let min = getMinId();
    note.id === min
      ? (styles = { borderRadius: "15px 15px 0px 0px" })
      : (styles = {});
    if (note.showCross === false) {
      crossStyle = { display: "none" };
    }
    return (
      <div
        className={
          props.night
            ? "flex items-center p-4 cursor-pointer bg-very-dark-saturated-blue border-b border-gray-700 border-t hover:scale-y-105 transition ease-linear "
            : "flex items-center p-4 cursor-pointer day border-b border-gray-300 border-t hover:scale-y-105 transition ease-linear"
        }
        style={styles}
        onMouseEnter={() => handleMouseEnter(note.id)}
        onMouseLeave={() => handleMouseLeave(note.id)}
        
      >
        <input
          type="checkbox"
          className="cursor-pointer h-8 w-8 mr-8"
          onChange={() => handleCompleted(note.id)}
          checked={note.completed}
        />
        <span className="text-gray-400"onClick = {() => handleEdit(note.id,note.data)}>{note.data}</span>
        <div
          style={crossStyle}
          className={
            props.night
              ? "ml-auto h-8 text-gray-300 flex items-center"
              : "ml-auto h-8 flex items-center text-gray-400"
          }
          onClick={() => handleDelete(note.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    );
  });
  function handleInput(e) {
    setInput(e.target.value);
  }
  function createNewForm(e) {
    if (input.length == 0) {
      setTimeout(() => {
        e.target.checked = false;
        alert("Note is empty");
      }, 200);
      return;
    }
    if (e.target.checked) {
      const note = {
        id: idRef.current,
        data: input,
        showCross: false,
        completed: false,
      };

      setNotes((prevNotes) => {
        return [...prevNotes, note];
      });
      setTimeout(() => {
        setInput("");
        e.target.checked = false;
        idRef.current++;
      }, 500);
    }
  }
  function handleEditClick(){
    setNotes(prevNotes =>{
      return prevNotes.map(prevNote =>{
        if(prevNote.id == edit.id){
          return{
            ...prevNote,
            data:edit.data
          }
        }else{
          return prevNote
        }
      })
    })
    setModal(false)
  }
  function handleEditChange(e){
    setEdit(prevEdit =>{
      return {
        ...prevEdit,
        data:e.target.value 
      }
    })
  }
  let clickedStyle = { color: "#4169E1" };
  let dis;
  if (!completed && !active) {
    dis = displayNotes;
  } else if (!active && completed) {
    dis = displayCompleted;
  } else {
    dis = displayActive;
  }
  useEffect(() => {});
  return (
    <main className="min-h-screen relative" style={{ minWidth: "60vh" } }>
      <div className="grif grid-cols-1">
        <div className="nav pt-16 flex items-center justify-between">
          <h1
            className="font-bold text-2xl text-white"
            style={!props.night ? { color: "#282c34" } : {}}
          >
            T O D O
          </h1>
          <img
            src={props.night ? night : day}
            onClick={handleMode}
            className="cursor-pointer h-8"
            style={!props.night ? { color: "black" } : {}}
          />
        </div>
        <div
          className={
            props.night
              ? "mt-8 flex items-center justify-between p-4 bg-very-dark-saturated-blue rounded-lg mb-6 "
              : "mt-8 flex items-center justify-between p-4 day rounded-lg mb-6"
          }
        >
          <input
            type="checkbox"
            className="cursor-pointer h-8 w-8"
            onChange={createNewForm}
          />
          <input
            type="text"
            placeholder="Create a new note..."
            className={
              props.night
                ? "w-10/12 h-8 bg-transparent focus: outline-none text-white text-md"
                : "w-10/12 h-8 bg-transparent focus: outline-none text-black text-md"
            }
            value={input}
            name="note"
            onChange={handleInput}
            onKeyPress={handleKey}
          />
        </div>
        <div>
        <TransitionGroup>
          {dis != null && dis.map((note,index) => {
            return (
              
              <CSSTransition
                key={index}
                timeout={500}
                classNames="your-component"
              >
                <div>{note}</div>
              </CSSTransition>
            );
          })}
          </TransitionGroup>
        </div>

        <footer
          className={
            props.night
              ? "flex justify-between items center bg-very-dark-saturated-blue p-4  text-gray-400 font-semibold text-sm rounded-t-none rounded-b-lg"
              : "flex justify-between items center day p-4  text-gray-400 font-semibold text-sm rounded-t-none rounded-b-lg"
          }
        >
          <span>{notes.length} items left</span>
          <span className="flex gap-2">
            <button
              style={!completed && !active ? clickedStyle : {}}
              className="cursor-pointer hover:text-blue-400 transition ease-linear hover:scale-110 font-semibold"
              onClick={updateALL}
            >
              All
            </button>
            <button
              style={active && !completed ? clickedStyle : {}}
              className="cursor-pointer hover:text-blue-400 transition ease-linear hover:scale-110 font-semibold"
              onClick={updateActive}
            >
              Active
            </button>
            <button
              style={!active && completed ? clickedStyle : {}}
              className="cursor-pointer hover:text-blue-400 transition ease-linear hover:scale-110 font-semibold"
              onClick={updateCompleted}
            >
              Completed
            </button>
          </span>
          <span
            onClick={deleteCompleted}
            className="cursor-pointer hover:text-blue-400 transition ease-linear hover:scale-110"
          >
            Clear Completed
          </span>
        </footer>
      </div>
      <CSSTransition
      in = {modal}
      timeout = {300}
      classNames = "Alert"
      unmountOnExit
      >
        <div className="flex flex-col items-center bg-white ml-2 font-semibold gap-2 rounded-xl absolute w-full -top-16 -left-2">
          <span className="text-lg mt-2">Edit Text</span>
          <input type="text" className = "focus:outline-none border focus:ring-blue-900 px-2 py-0.5 text-gray-800 font-semibold bg-gray-200 rounded-lg w-3/5" placeholder="edit text..." value={edit.data} onChange = {handleEditChange} />
          <button className="  mb-2 px-2 py-0.5 rounded-md bg-gray-300 hover:bg-gray-200 transition ease-linear" onClick={handleEditClick}>Edit</button>
        </div>
      </CSSTransition>
    </main>
  );
}
