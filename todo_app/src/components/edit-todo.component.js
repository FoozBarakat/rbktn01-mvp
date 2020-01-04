import React, { Component } from 'react';
import axios from 'axios';

class EditTodo extends Component {
  constructor(props) {
    super(props);

    this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
    this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
    this.onChanageTodoPriority = this.onChanageTodoPriority.bind(this);
    this.onChanageTodoCompleted = this.onChanageTodoCompleted.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      todo_descripition: '',
      todo_responsible: '',
      todo_priority: '',
      todo_completed: false
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/todos/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          todo_descripition: res.data.todo_descripition,
          todo_responsible: res.data.todo_responsible,
          todo_priority: res.data.todo_priority,
          todo_completed: res.data.todo_completed
        })
      })
      .catch(err => {
        console.log('erroe: ', err);
      })
  }

  onChangeTodoDescription(event) {
    this.setState({
      todo_descripition: event.target.value
    });
  }

  onChangeTodoResponsible(event) {
    this.setState({
      todo_responsible: event.target.value
    });
  }

  onChanageTodoPriority(event) {
    this.setState({
      todo_priority: event.target.value
    });
  }

  onChanageTodoCompleted(event) {
    this.setState({
      todo_completed: !this.state.todo_completed
    });
  }

  onSubmit(event) {
    event.preventDefault();

    const obj = {
      todo_descripition: this.state.todo_descripition,
      todo_responsible: this.state.todo_responsible,
      todo_priority: this.state.todo_priority,
      todo_completed: this.state.todo_completed
    };

    axios.post('http://localhost:4000/todos/update/' + this.props.match.params.id, obj)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log('error: ', err);
      });

    this.props.history.push('/');

  }

  render() {
    return (
      <div style={{ marginTop: 40 }}>
        <h3>Update Todo</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Description: </label>
            <input type="text" className="form-control" value={this.state.todo_descripition} onChange={this.onChangeTodoDescription} />
          </div>
          <div className="form-group">
            <label>Responsible: </label>
            <input type="text" className="form-control" value={this.state.todo_responsible} onChange={this.onChangeTodoResponsible} />
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
            <br /><br />
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="completedCheckBox" name="completedCheckBox" onChange={this.onChanageTodoCompleted} checked={this.state.todo_completed} value={this.state.todo_completed} />
              <label className="form-check-label" htmlFor="completedCheckbox">Completed</label>
            </div>
            <br />
          </div>
          <div className="form-group">
            <input type="submit" value="Update Todo" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}

export default EditTodo;