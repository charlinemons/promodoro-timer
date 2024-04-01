// import React, { Component } from "react";
// import "./ToDo.css";
// import { GoPlus } from "react-icons/go";

// class TodoList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       todoItems: JSON.parse(localStorage.getItem("todoItems")) || [],
//       inputValue: "Add new task",
//     };
//   }

//   toggleTodoDone = (index) => {
//     const todoItems = [...this.state.todoItems];
//     todoItems[index].done = !todoItems[index].done;
//     this.setState({ todoItems });
//     this.updateTodoLocalStorage(todoItems);
//   };

//   confirmTodoDelete = (index) => {
//     const confirmation = window.confirm(
//       "Are you sure you want to delete this task?"
//     );
//     if (confirmation) {
//       const todoItems = [...this.state.todoItems];
//       todoItems.splice(index, 1);
//       this.setState({ todoItems });
//       this.updateTodoLocalStorage(todoItems);
//     }
//   };

//   addTodo = () => {
//     const { inputValue, todoItems } = this.state;
//     const todoText = inputValue.trim();
//     if (todoText) {
//       const newTodoItems = [...todoItems, { text: todoText, done: false }];
//       this.setState({ todoItems: newTodoItems, inputValue: "Add new task" });
//       this.updateTodoLocalStorage(newTodoItems);
//     }
//   };

//   refreshTodoList = () => {
//     const confirmation = window.confirm(
//       "Are you sure you want to refresh the list?"
//     );
//     if (confirmation) {
//       this.setState({ todoItems: [] });
//       localStorage.removeItem("todoItems");
//     }
//   };

//   updateTodoLocalStorage = (todoItems) => {
//     localStorage.setItem("todoItems", JSON.stringify(todoItems));
//   };

//   handleInputChange = (e) => {
//     this.setState({ inputValue: e.target.value });
//   };

//   handleInputKeyDown = (e) => {
//     if (e.key === "Enter") {
//       this.addTodo();
//     }
//   };

//   render() {
//     const { todoItems, inputValue } = this.state;
//     const remainingTasks = todoItems.filter((item) => !item.done);
//     const numTasks = remainingTasks.length;

//     let message;
//     if (numTasks === 0) {
//       message = "All tasks are done! Good job :)";
//     } else if (numTasks > 8) {
//       message = `(No pressure, but you have ${numTasks} tasks to complete)`;
//     } else if (numTasks > 3) {
//       message = `(You have ${numTasks} tasks to complete)`;
//     } else {
//       message = `(You have ${numTasks} tasks to complete; almost done, let's go!)`;
//     }

//     return (
//       <div className="ToDo">
//         <div className="todo-heading">
//           <h2>Today's to-do</h2>
//           <small>{message}</small>
//         </div>
//         <div className="todo-add">
//           <div className="input-container">
//             <div className="value-container">
//               <button className="add-task-button" onClick={this.addTodo}>
//                 <GoPlus />
//               </button>
//               <input
//                 type="text"
//                 className="todo-input"
//                 value={inputValue === "Add new task" ? "" : inputValue}
//                 onChange={this.handleInputChange}
//                 onKeyDown={this.handleInputKeyDown}
//                 onFocus={() => {
//                   if (inputValue === "Add new task") {
//                     this.setState({ inputValue: "" });
//                   }
//                 }}
//                 onBlur={() => {
//                   if (inputValue.trim() === "") {
//                     this.setState({ inputValue: "Add new task" });
//                   }
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="todo-list" id="todo">
//           <ul>
//             {todoItems.map((item, index) => (
//               <li
//                 key={index}
//                 className={item.done ? "list-item done" : "list-item"}
//                 onClick={() => this.toggleTodoDone(index)}
//                 onContextMenu={(e) => {
//                   e.preventDefault();
//                   this.confirmTodoDelete(index);
//                 }}
//               >
//                 {item.text}
//               </li>
//             ))}
//           </ul>
//         </div>
//         <button className="refresh-button" onClick={this.refreshTodoList}>
//           clear
//         </button>
//       </div>
//     );
//   }
// }

// export default TodoList;

import React, { Component } from "react";
import "./ToDo.css";
import { GoPlus } from "react-icons/go";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItems: JSON.parse(localStorage.getItem("todoItems")) || [],
      inputValue: "Add new task",
    };
  }

  toggleTodoDone = (index) => {
    const todoItems = [...this.state.todoItems];
    todoItems[index].done = !todoItems[index].done;
    this.setState({ todoItems });
    this.updateTodoLocalStorage(todoItems);
  };

  confirmTodoDelete = (index) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmation) {
      const todoItems = [...this.state.todoItems];
      todoItems.splice(index, 1);
      this.setState({ todoItems });
      this.updateTodoLocalStorage(todoItems);
    }
  };

  addTodo = () => {
    const { inputValue, todoItems } = this.state;
    const todoText = inputValue.trim();
    if (todoText) {
      const newTodoItems = [...todoItems, { text: todoText, done: false }];
      this.setState({ todoItems: newTodoItems, inputValue: "Add new task" });
      this.updateTodoLocalStorage(newTodoItems);
    }
  };

  refreshTodoList = () => {
    const confirmation = window.confirm(
      "Are you sure you want to refresh the list?"
    );
    if (confirmation) {
      this.setState({ todoItems: [] });
      localStorage.removeItem("todoItems");
    }
  };

  updateTodoLocalStorage = (todoItems) => {
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      this.addTodo();
    }
  };

  render() {
    const { todoItems, inputValue } = this.state;
    const remainingTasks = todoItems.filter((item) => !item.done);
    const numTasks = remainingTasks.length;

    let message;
    if (numTasks === 0) {
      message = "All tasks are done! Good job :)";
    } else if (numTasks > 8) {
      message = `(No pressure, but you have ${numTasks} tasks to complete)`;
    } else if (numTasks > 3) {
      message = `(You have ${numTasks} tasks to complete)`;
    } else {
      message = `(You have ${numTasks} tasks to complete; almost done, let's go!)`;
    }

    return (
      <div className="ToDo">
        <div className="todo-heading">
          <h2>Today's to-do</h2>
          <small>{message}</small>
        </div>
        <div className="todo-add">
          <div className="input-container">
            <div className="value-container">
              <button className="add-task-button" onClick={this.addTodo}>
                <GoPlus />
              </button>
              <input
                type="text"
                className="todo-input"
                value={inputValue === "Add new task" ? "" : inputValue}
                onChange={this.handleInputChange}
                onKeyDown={this.handleInputKeyDown}
                onFocus={() => {
                  if (inputValue === "Add new task") {
                    this.setState({ inputValue: "" });
                  }
                }}
                onBlur={() => {
                  if (inputValue.trim() === "") {
                    this.setState({ inputValue: "Add new task" });
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className="todo-list" id="todo">
          <ul>
            {todoItems.map((item, index) => (
              <li
                key={index}
                className={item.done ? "list-item done" : "list-item"}
                onClick={() => this.toggleTodoDone(index)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  this.confirmTodoDelete(index);
                }}
              >
                {/* <span
                  className="bullet-point"
                  style={{ color: `hsl(${index * 40}, 70%, 50%)` }}
                >
                  &bull;
                </span>{" "} */}
                {item.text}
              </li>
            ))}
          </ul>
        </div>
        <button className="refresh-button" onClick={this.refreshTodoList}>
          clear
        </button>
      </div>
    );
  }
}

export default TodoList;
