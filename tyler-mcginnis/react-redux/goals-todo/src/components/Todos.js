import React from 'react';
import { connect } from 'react-redux';

import {
  handleAddTodo,
  handleDeleteTodo,
  handleToggleTodo
} from '../actions/todos';

import List from './List';

class Todos extends React.Component {
  onToggle = (id) => {
    this.props.dispatch(handleToggleTodo(id));
  }
  
  onRemove = (todo) => {
    this.props.dispatch(handleDeleteTodo(todo));
  }
  
  addItem = (e) => {
    e.preventDefault();

    this.props.dispatch(handleAddTodo(
      this.input.value,
      () => this.input.value = ''
    ));
  }

  render() {
    return (
      <div>
        <h1>Todo List</h1>
        <input 
          type='text'
          placeholder='Add Todo'
          ref={(input) => this.input = input}
        />
        <button onClick={this.addItem}>Add Todo</button>
        <List
          items={this.props.todos}
          removeItem={this.onRemove}
          toggleItem={this.onToggle}
        />
      </div>
    )
  }
}

export default connect((state) => ({
  todos: state.todos,
}))(Todos);
