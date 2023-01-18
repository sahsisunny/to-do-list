import { useState } from "react";
import "./index.css";

function App() {
  const [title, getTitle] = useState(null);

  // Function for adding item
  function addItem(e) {
    if (title !== null) {
      const list = document.querySelector(".list ul");
      const li = document.createElement("li");
      const span = document.createElement("span");
      li.className = null;
      li.onclick = (e) => {
        completeItem(e);
      };
      li.innerHTML = title;
      span.className = "close";
      span.innerHTML = "x";
      span.onclick = (e) => {
        removeItem(e);
      };
      li.appendChild(span);
      list.appendChild(li);
    }
    // after add item clear input field
    document.querySelector(".input-field").value = "";
  }

  // Function for removing item
  function removeItem(e) {
    e.target.parentNode.remove();
  }

  // Function for completing item
  function completeItem(e) {
    e.target.classList.toggle("checked");
  }

  return (
    <div className="main">
      <div className="header">
        <h1>My To Do List</h1>
        <div className="input-area">
          <input
            type="text"
            placeholder="Title..."
            className="input-field"
            onChange={(e) => {
              getTitle(e.target.value);
            }}
          />
          <button
            onClick={(e) => {
              addItem(e);
            }}
          >
            Add
          </button>
        </div>
      </div>
      <div className="list">
        <ul></ul>
      </div>
    </div>
  );
}

export default App;
