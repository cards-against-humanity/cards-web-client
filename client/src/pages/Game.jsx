import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatButton, RaisedButton, Divider } from 'material-ui';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import CAHCard from '../components/CAHCard.jsx';
import PlayerList from '../components/GameBoard/PlayerList.jsx';
import Tray from '../components/GameBoard/Tray.jsx';
import { NavLink } from 'react-router-dom';
import { startGame, stopGame, leaveGame } from '../gameServerInterface';
import axios from 'axios';

const Game = (props) => (
  <div>
    {props.game ?
    <div>
      <div className='top-left' style={{width: '25%', height: '50%', float: 'left'}}>
        {props.game.currentBlackCard ? <CAHCard card={props.game.currentBlackCard} /> : null}
      </div>
      <div className='top-right' style={{width: '75%', height: '50%', float: 'left'}}>
        <div>Current game: {props.game.name}</div>
        <FlatButton label={'Start game'} onClick={startGame} />
        <FlatButton label={'Stop game'} onClick={stopGame} />
        <FlatButton label={'Leave game'} onClick={leaveGame} />
      </div>
      <div className='bottom-left' style={{width: '25%', height: '50%', float: 'left'}}>
        <Divider/>
        <PlayerList/>
      </div>
      <div className='bottom-right' style={{width: '75%', height: '50%', float: 'left'}}>
        <Tray/>
      </div>
    </div>
    :
    <div className="center panel">You're not in a game. <NavLink to='/gamelist' style={{textDecoration: 'none'}}><RaisedButton label='See Games' /></NavLink></div>}
  </div>
);

const mapStateToProps = ({game}) => ({game});

export default connect(mapStateToProps)(Game);
