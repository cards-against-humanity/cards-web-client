import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, RaisedButton } from 'material-ui';
import CardpackCreator from './CardpackCreator.jsx';
import Cardpack from './Cardpack.jsx';

class CardpackManager extends Component {

  componentDidMount () {
    this.intervalId = setInterval(this.forceUpdate.bind(this), 1000); // Refreshes the 'created at' relative time of all cardpacks
  }

  componentWillUnmount () {
    clearInterval(this.intervalId);
  }

  render () {
    return (
      <div className='panel'>
        <div>Cardpack Manager</div>
        <CardpackCreator/>
        {this.props.cardpacks.map((cardpack, index) => {
          return (
            <div key={index}>
              <Cardpack cardpack={cardpack} />
            </div>
          );
        })}
      </div>
    );
  }

}

const mapStateToProps = ({user: {cardpacks}}) => ({
  cardpacks
});

export default connect(mapStateToProps)(CardpackManager);