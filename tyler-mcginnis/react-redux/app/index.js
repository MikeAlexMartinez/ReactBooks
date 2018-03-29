// Library Code
function createStore (reducer) {
  // The store sjhould have four parts
  // 1. The State
  // 2. Get the state
  // 3. Listen to Changes
  // 4. Update the state
  let _state;
  let _listeners = [];

  // retrieve state and send to user
  const getState = () => _state;

  const subscribe = (listener) => {
    // add listener to array of listeners
    _listeners.push(listener);
    // return function to user to allow possibility of
    // unsubscribing from store
    return () => {
      _listeners = _listeners.filter((l) => l !== listener);
    }
  }

  const dispatch = (action) => {
    // call the todos function 
    _state = reducer(_state, action);
    // inform listeners that state has been updated
    _listeners.forEach((listener) => listener());
  }

  // Need to keep track of functions to invoke 
  // subscription variables.
  return {
    getState,
    subscribe,
    dispatch
  }
}

// An action is an event or action that represents
// in an event in the app that changes the state
// of the application 
/*
{
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Learn Redux',
    complete: false,
  }
}

{
  type: 'REMOVE_TODO',
  id: 0,
}

{
  type: 'TOGGLE_TODO',
  id: 0,
}

{
  type: 'ADD_GOAL',
  goal: {
    id: 0,
    name: 'Run a Marathon',
  }
}

{
  type: 'REMOVE_GOAL',
  id: 0,
}
*/

/*
  Characteristics of a pure function
  1. Always return same value given the same arguments.
  2. They depend only on the arguments passed into them.
  3. Never produce any side effects.
*/

// 
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

// Action Creators
function addTodoAction (todo) {
  return {
    type: ADD_TODO,
    todo
  }
}

function removeTodoAction (todo) {
  return {
    type: REMOVE_TODO,
    todo
  }
}

function toggleTodoAction (todo) {
  return {
    type: TOGGLE_TODO,
    todo
  }
}

function addGoalAction (goal) {
  return {
    type: ADD_GOAL,
    goal
  }
}

function removeGoalAction (goal) {
  return {
    type: REMOVE_GOAL,
    goal
  }
}

// Reducer
/* default state so concat doesn't error */
function todos (state = [] , action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map((todo) => todo.id !== action.id ? todo :
        Object.assign({}, todo, {complete: !todo.complete})
      );
    default:
      return state;
  }
}

function goals (state = [], action) {
  switch(action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.id);
    default:
      return state;
  }
}

function app (state = {}, action) {
  return {
    goals: goals(state.goals, action),
    todos: todos(state.todos, action)
  }
}

const store = createStore(app);

const unsubscribe = store.subscribe(() => {
  console.log('the state of the store: ', store.getState());
});

store.dispatch(addTodoAction({
  id: 0,
  name: 'Learn Redux',
  complete: false 
}));

store.dispatch(addTodoAction({
  id: 1,
  name: 'Learn Immutable',
  complete: false 
}));

store.dispatch(addTodoAction({
  id: 2,
  name: 'Learn Angular',
  complete: false 
}));

store.dispatch(addGoalAction({
  id: 0,
  name: 'Get a job',
  complete: false
}));

store.dispatch(addGoalAction({
  id: 1,
  name: 'Run half marathon',
  complete: false
}));

store.dispatch(removeGoalAction({id: 1}))
store.dispatch(removeTodoAction({id: 2}))
store.dispatch(toggleTodoAction({id: 0}))