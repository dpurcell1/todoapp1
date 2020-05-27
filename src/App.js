import React, { Component } from "react";
import todosList from "./todos.json";

class App extends Component {
  constructor(props) {
    super(props) 
      
    this.state = {
      todos: todosList,
    };
  } 
  render() {
    return (
      <section className = "todoapp">
        <header className = "header">
          <h1>todos</h1>
          <input 
            onKeyPress = {this.addTodo} 
            className = "new-todo" 
            placeholder = "What needs to be done?" 
            autoFocus 
          />
        </header>
        <TodoList 
          todos = {this.state.todos} 
          toggle = {this.toggle} 
          destroy = {this.destroy} 
        />
        <footer className = "footer">
          <span className = "todo-count">
            <strong>0</strong> item(s) left
          </span>
          <button 
            onClick = {this.clearCompleted} 
            className = "clear-completed">Clear completed
          </button>
        </footer>
      </section>
    );
  }  
  
  addTodo = (event) => {    
    if (event.key === "Enter") {       
      let newTodo = {
        "userId": 1,
        "id": Math.random() * 25619,
        "title": event.target.value,
        "completed": false
      }      
      let allTodos = this.state.todos.slice()
      allTodos.push(newTodo); 
      this.setState((state) => {
        return {
          ...state,
          todos: allTodos
        }         
      })
    }       
  }
  
  toggle = (id) => {         
    let newTodos = this.state.todos.map((todo) =>{
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        }
      }
      return todo;
    }) 
    this.setState((state) => {
      return {
        ...state,
        todos: newTodos
      }
    })
  }

  destroy = (id) => {    
    let newTodos = []
    this.state.todos.map((todo) => {
      if(todo.id !== id) {
        let newItem = todo;
        newTodos.push(newItem)
      }
    })
    this.setState((state) => {
      return {
        ...state,
        todos: newTodos
      }
    })
  }  

  clearCompleted = () => {
    let newTodos = []
    this.state.todos.map((todo) => { 
      if (!todo.completed) {
        let newItem = todo;
        newTodos.push(newItem); 
      }
    })
      this.setState((state) => {
        return {
          ...state,
          todos: newTodos
        }
      })   
  }
}

class TodoItem extends Component {
  render() {
    return (
      <li className = {this.props.completed ? "completed" : ""}>
        <div className = "view">
          <input 
            onClick = {this.props.toggle} 
            className = "toggle" type = "checkbox" 
            checked = {this.props.completed} 
          />
          <label>{this.props.title}</label>
          <button 
            onClick = {this.props.destroy} 
            className = "destroy">            
          </button>
        </div>
      </li>
    );
  }
}

class TodoList extends Component {  
  render() {
    return (
      <section className = "main">
        <ul className = "todo-list">
          {this.props.todos.map((todo) => (
            <TodoItem 
              title = {todo.title} 
              completed = {todo.completed} 
              toggle = {event => this.props.toggle(todo.id)}
              destroy = {event => this.props.destroy(todo.id)} 
            />
          ))}
        </ul>
      </section>
    );
  }
}

export default App;
