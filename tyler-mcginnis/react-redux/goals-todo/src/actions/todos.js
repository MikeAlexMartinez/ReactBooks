import API from 'goals-todos-api';

// Constants
export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

// Action Creators
function addTodo (todo) {
  return {
    type: ADD_TODO,
    todo
  }
}

function removeTodo (id) {
  return {
    type: REMOVE_TODO,
    id
  }
}

function toggleTodo (id) {
  return {
    type: TOGGLE_TODO,
    id
  }
}

// Asyncronize functions
export function handleDeleteTodo (todo) {
  return (dispatch) => {  
    dispatch(removeTodo(todo.id))
    return API.deleteTodo(todo.id)
      .catch(() => {
        dispatch(addTodo(todo));
        alert('An error occurred. Try again.');
      });
  }
}

export function handleAddTodo (name, cb) {
  return (dispatch) => {
    return API.saveTodo(name)
      .then((todo) => {
        dispatch(addTodo(todo));
        cb();
      })
      .catch(() => {
        alert('An error occurred');
      });
  }
}

export function handleToggleTodo (id) {
  return (dispatch) => {
    dispatch(toggleTodo(id));

    return API.saveTodoToggle(id)
      .catch(() => {
        dispatch(toggleTodo(id));
      });
  }
}
