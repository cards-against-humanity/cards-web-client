import React, {Component} from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import { FlatButton } from 'material-ui';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import time from 'time-converter';
import axios from 'axios';

class COHCard extends Component {
  constructor (props) {
    super(props);
    this.removeCard = this.removeCard.bind(this);
    this.state = {
      time: this.getTime()
    };
  }

  componentDidMount () {
    this.intervalId = setInterval(() => {
      let time = this.getTime();
      if (time !== this.state.time) {
        this.setState({time});
      }
    }, 100);
  }

  componentWillUnmount () {
    clearInterval(this.intervalId);
  }

  getTime () {
    return 'Created at ' + time.stringify(this.props.card.createdAt, {relativeTime: true});
  }

  removeCard (card) {
    axios.delete('/api/cards/' + this.props.card.id);
  }

  render () {
    let cardElements = [];
    cardElements.push(
      <CardHeader
        title={this.props.card.text + (this.props.card.answerFields && this.props.card.answerFields > 1 ? ' - ' + this.props.card.answerFields + ' card answer' : '')}
        subtitle={this.state.time}
        key={0}
      />
    );

    if (this.props.isOwner) {
      cardElements.push(
        <CardActions key={1}>
          <FlatButton label='Delete' onClick={this.removeCard} />
        </CardActions>
      );
    }

    let cardWrapper = this.props.card.type === 'black' ? (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Card className='card'>;
          {cardElements}
        </Card>
      </MuiThemeProvider>
    ) : (
      <Card className='card'>;
        {cardElements}
      </Card>
    );

    return cardWrapper;
  }
}

module.exports = COHCard;