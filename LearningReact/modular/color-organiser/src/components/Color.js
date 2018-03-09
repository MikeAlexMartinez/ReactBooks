import { Component } from 'react';
import PropTypes from 'prop-types';
import StarRating from './StarRating';
import '../../stylesheets/Color.scss';

export class Color extends Component {

  componentWillMount() {
    this.style = { backgroundColor: "#CCC" };
  }

  shouldComponentUpdate(nextProps) {
    const { rating } = this.props;
    return rating !== nextProps.rating;
  }

  componentWillUpdate() {
    this.style = null;
  }  

  componentDidUpdate(prevProps) {
    const { title, rating } = this.props;
    const status = (rating > prevProps.rating) ? 'better' : 'worse';
    console.log(`${title} is getting ${status}`);
  }
  
  render() {
    const { title, rating, color, onRate, onRemove } = this.props;

    return (
      <section className="color" style={this.style}>
        <h1 ref="title">{title}</h1>
        <button onClick={onRemove}>X</button>
        <div
          className="color"
          style={{ backgroundColor: color }}  
          >
        </div>
        <div>
          <StarRating starsSelected={rating} onRate={onRate} />
        </div>
      </section>
      )
  }
}

Color.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  rating: PropTypes.number,
  onRemove: PropTypes.func,
  onRate: PropTypes.func
};

Color.defaultProps = {
  title: undefined,
  rating: 0,
  color: '#000000',
  onRate: f=>f,
  onRemove: f=>f
};

export default Color;
