import React, { Component } from "react";

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
      this.setState({ todoItems: newTodoItems, inputValue: "" });
      this.updateTodoLocalStorage(newTodoItems);
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

    return (
      <div className="left-container">
        <div className="container todo-container">
          <div className="heading">
            <h2>Todo list</h2>
          </div>
          <div className="todo-add">
            <input
              type="text"
              className="todo-input"
              value={inputValue}
              onChange={this.handleInputChange}
              onKeyDown={this.handleInputKeyDown}
            />
            <button className="todo-btn" onClick={this.addTodo}>
              <i className="fa-regular fa-paper-plane"></i>
            </button>
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
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default TodoList;
