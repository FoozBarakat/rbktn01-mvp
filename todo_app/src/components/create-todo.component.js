import React, { Component } from 'react';
import axios from 'axios';

class CreateTodo extends Component {

  constructor(props) {
    super(props);

    this.onChanageTodoDescription = this.onChanageTodoDescription.bind(this);
    this.onChanageTodoResponsible = this.onChanageTodoResponsible.bind(this);
    this.onChanageTodoPriority = this.onChanageTodoPriority.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      todo_descripition: '',
      todo_responsible: '',
      todo_priority: '',
      todo_completed: false
    }
  }

  onChanageTodoDescription(event) {
    this.setState({
      todo_descripition: event.target.value
    });
  }

  onChanageTodoResponsible(event) {
    this.setState({
      todo_responsible: event.target.value
    });
  }

  onChanageTodoPriority(event) {
    this.setState({
      todo_priority: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();

    const newTodo = {
      todo_descripition: this.state.todo_descripition,
      todo_responsible: this.state.todo_responsible,
      todo_priority: this.state.todo_priority,
      todo_completed: this.state.todo_completed
    };

    axios.post('http://localhost:4000/todos/add', newTodo)
      .then(res => console.log(res.data));

    this.setState({
      todo_descripition: '',
      todo_responsible: '',
      todo_priority: '',
      todo_completed: false
    });
  }

  render() {
    return (
      <div style={{ marginTop: 40 }}>
        <h3>Create New Todo</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Description: </label>
            <input type="text" className="form-control" value={this.state.todo_descripition} onChange={this.onChanageTodoDescription} />
          </div>
          <div className="form-group">
            <label>Responsible: </label>
            <input type="text" className="form-control" value={this.state.todo_responsible} onChange={this.onChanageTodoResponsible} />
          </div>
          <div className="form-group">
            <label>Priority: </label>
            <br></br>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="priorityOptions" id="priorityLow" value="Low" checked={this.state.todo_priority === 'Low'} onChange={this.onChanageTodoPriority} />
              <label className="form-check-label">Low</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="priorityOptions" id="priorityMedium" value="Medium" checked={this.state.todo_priority === 'Medium'} onChange={this.onChanageTodoPriority} />
              <label className="form-check-label">Medium</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="priorityOptions" id="priorityHigh" value="High" checked={this.state.todo_priority === 'High'} onChange={this.onChanageTodoPriority} />
              <label className="form-check-label">High</label>
            </div>
          </div>
          <div className="form-group">
            <input type="submit" value="Create Todo" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}

export default CreateTodo;