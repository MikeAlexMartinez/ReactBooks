import React from 'react'
import PropTypes from 'prop-types'


/* stateless function component */
const Summary = ({ ingredients=0, steps=0, title='[recipe]' }) => {
  return <div>
    <h1>{title}</h1>
    <p>{ingredients} Ingredients | {steps} Steps</p>
  </div>
}

/* class static properties */

class Summary extends React.Component {

  static propTypes = {
    ingredients: PropTypes.number,
    steps: PropTypes.number,
    title: (props, propName) =>
      (typeof props[propName] !== 'string') 
        ? new Error("A title must be a string")
        : (props[propName].length > 20)
          ? new Error(`title is over 20 characters`)
          : null
  }

  static defaultProps = {
    ingredients: 0,
    steps: 0,
    title: "[recipe]"
  }

  render() {
    const {ingredients, steps, title} = this.props
      return (
        <div className="summary">
          <h1>{title}</h1>
          <p>
            <span>{ingredients} Ingredients | </span>
            <span>{steps} Steps</span>
          </p>
        </div>
      )
  }
}

/* ES6 class */
class Summary extends React.Component {
  render() {
    const {ingredients, steps, title} = this.props
      return (
        <div className="summary">
          <h1>{title}</h1>
          <p>
            <span>{ingredients} Ingredients | </span>
            <span>{steps} Steps</span>
          </p>
        </div>
      )
  }
}

Summary.propTypes = {
  ingredients: PropTypes.number,
  steps: PropTypes.number,
  title: (props, propName) =>
    (typeof props[propName] !== 'string') 
      ? new Error("A title must be a string")
      : (props[propName].length > 20)
        ? new Error(`title is over 20 characters`)
        : null,
}

Summary.defaultProps = {
  ingredients: 0,
  steps: 0,
  title: "[recipe]"
}
