import React from "react";
import ReactDOM from "react-dom";
import Game from './components/Game/Game';

const App = () => {
  return <Game />;
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
