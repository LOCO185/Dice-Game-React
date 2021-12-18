import "./Player.css";
import React, { Component } from "react";

//state: score so far.
//all the rest: uncontroled.

class PlayerScoreCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScore: 0,
    };
  }
  //if parent element changes the score - it will immediately be updated here.
  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props) !== JSON.stringify(prevProps))
      this.setState({ currentScore: this.props.currentScore });
  }

  render() {
    return (
      <div className="playerScoreCard">
        <h5 className="playerName">{this.props.playerName}</h5>
        <div className="scoreKeeper">
          <h2 className="currentScore">score:{this.state.currentScore}</h2>
          <h2 className="wins">wins:{this.props.wins}</h2>
        </div>
      </div>
    );
  }
}
export default PlayerScoreCard;
