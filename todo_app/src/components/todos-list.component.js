import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => {
  return (
    <tr>
      <td className={props.todo.todo_completed ? 'completed' : ''}>
        {props.todo.todo_descripition}
      </td>
      <td className={props.todo.todo_completed ? 'completed' : ''}>
        {props.todo.todo_responsible}
      </td>
      <td className={props.todo.todo_completed ? 'completed' : ''}>
        {props.todo.todo_priority}
      </td>
      <td>
        <Link to={"/edit/" + props.todo._id}>Edit</Link>
      </td>
    </tr>
  )
}
class TodosList extends Component {
  constructor(props) {
    super(props);
    this.todoList = this.todoList.bind(this);
    this.state = { todos: [] };

  }

  componentDidMount() {
    axios.get('http://localhost:4000/todos')
      .then(res => {
        this.setState({ todos: res.data })
      })
      .catch((err) => {
        console.log('error: ', err);
      });
  }

  todoList() {
    return this.state.todos.map((currentTodo, i) => {
      return <Todo todo={currentTodo} key={i} />
    });
  }

  componentDidUpdate() {
    axios.get('http://localhost:4000/todos')
      .then(res => {
        this.setState({ todos: res.data })
      })
      .catch((err) => {
        console.log('error: ', err);
      });
  }

  render() {
    return (
      <div style={{ marginTop: 40 }}>
        <h3>Todos List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Responsible</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.todoList()}
          </tbody>
        </table>
      </div>
    )
  }
}

export default TodosList;