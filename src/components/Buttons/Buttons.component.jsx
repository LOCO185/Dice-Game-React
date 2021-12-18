import "./Buttons.css";
//  import React, { Component } lets you do class Menu extends
//  Component instead of class Menu extends React.
//  Component. It's less typing and duplication of the React namespace,
//  which is generally a desired modern coding convention.
import { Component } from "react";

/*
 *expected parent handlers: newGame, rollDice, endTurn.
 */
class GameButtons extends Component {
  onClick(event) {
    const type = event.target.id;
    switch (type) {
      case "newGame":
        this.props.newGame();
        break;
      case "rollDice":
        this.props.rollDice();
        break;
      case "hold":
        this.props.hold();
        break;
      default:
        break;
    }
    return;
  }
  render() {
    return [
      <button id="newGame" type="button" onClick={this.onClick.bind(this)}>
        New Game
      </button>,
      <button id="rollDice" type="button" onClick={this.onClick.bind(this)}>
        Roll The Dice
      </button>,
      <button id="hold" type="button" onClick={this.onClick.bind(this)}>
        HOLD
      </button>,
    ];
  }
}
export default GameButtons;
