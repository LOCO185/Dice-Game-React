import "./Game.css";
import React, { Component } from "react";
import PlayerScoreCard from "../PlayerScoreCard/PlayerScoreCard";
import Dice from "../Dice/Dice.component";
import GameButtons from "../Buttons/Buttons.component";;

//need to decide later if to use computer AI or just stupid game.
//added players object just for clarity.

class Game extends Component {
  constructor() {
    super();
    this.initialState = {
      winningScore: 100,
      currentDiceRoll: [1, 1],
      currentPlayer: "player1",
      player1: {
        id:1,
        name: "player1",
        currentScore: 0,
        wins: 0,
      },
      player2: {
        id:2,
        name: "player2",
        currentScore: 0,
        wins: 0,
      },
    };
    this.state = this.initialState;
  }
  static randomize() {
    return [
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
    ];
  }
  // the only method with a return value. because it's really convenient.
  endTurn() {
    switch (this.state.currentPlayer) {
      case "player1":
        return "player2";
      case "player2":
        return "player1";
      default:
        return;
    }
  }
  updatePoints(currentPlayer, currentScore) {
    this.setState({
      [currentPlayer]: {
        ...this.state[currentPlayer],
        currentScore: currentScore,
      },
    });
  }
  updateStateAfterWin() {
    this.setState({ player1: { ...this.state.player1, currentScore: 0 } });
    this.setState({ player2: { ...this.state.player2, currentScore: 0 } });
  }

  newGame() {
    this.setState(this.initialState);
  }
  //rolling: - getting dice results, setting score, and again if possible.
  //*check about the new setState methos - does it work???
  rollDice() {
    const currentPlayer = this.state.currentPlayer;
    let currentScore = this.state[currentPlayer].currentScore;

    const roll = Game.randomize();
    this.setState({ currentDiceRoll: roll });
    if (roll[0] === roll[1]) {
      this.updatePoints(currentPlayer, 0);
      this.setState({ currentPlayer: this.endTurn(currentPlayer) });
    } else {
      currentScore = this.state[currentPlayer].currentScore + roll[0] + roll[1];
      this.updatePoints(currentPlayer, currentScore);
    }
    const winsSoFar = this.state[currentPlayer].wins + 1;
    if (currentScore >= this.state.winningScore) {
      this.setState(
        {
          [currentPlayer]: { ...this.state[currentPlayer], wins: winsSoFar },
        },
        () => this.updateStateAfterWin()
      );
      const winnerDiv = document.querySelector(".gameResult");
      winnerDiv.classList.add("gameResultDisplay");
      setTimeout(() => {
        winnerDiv.className = "gameResult";
      }, 3000);
    }
  }
  //
  hold() {
    const roll = this.state.currentDiceRoll;
    const currentPlayer = this.state.currentPlayer;
    const currentScore =
      this.state[currentPlayer].currentScore + roll[0] + roll[1];
    this.updatePoints(currentPlayer, currentScore);
    this.setState({ currentPlayer: this.endTurn(currentPlayer) });
  }

  //notes: dice is actually two dices.
  render() {
    return (
      <div className="gameContainer">
        <div className="cardsContainer">
          {[
            <PlayerScoreCard
              key={this.state.player1.id}
              playerName="Player 1"
              currentScore={this.state.player1.currentScore}
              wins={this.state.player1.wins}
            />,
            <PlayerScoreCard
              key={this.state.player2.id}
              playerName="Player 2"
              currentScore={this.state.player2.currentScore}
              wins={this.state.player2.wins}
            />,
          ]}
        </div>
        <div className="gameResult">{`${this.state.currentPlayer}+WINS!`}</div>
        <Dice rollResult={this.state.currentDiceRoll} />
        <label id="winningScoreLabel">
          Winning Score:
          <input
            className="winningScore"
            type="number"
            name="winning score"
            min={0}
            value={this.state.winningScore}
            onChange={(event) => {
             if (event.target.value < 0) {
               event.target.value = 0;
             } this.setState({ winningScore: event.target.value });
            }}
          />
        </label>
        <div className="gameButtons">
          <GameButtons
            newGame={this.newGame.bind(this)}
            rollDice={this.rollDice.bind(this)}
            hold={this.hold.bind(this)}
          />
        </div>
      </div>
    );
  }
}
export default Game;

/* 
things to do: 
- smartly use local storage: this time, just for data(or use function components instead)
- add UI! *must*!!!
- set timeout and hold event listener if got double 6. add funny gif-pic-animation.
- add music backgroudn and maybe sounds to listeners on clicks
*/
