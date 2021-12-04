import React, { useState } from "react";
import ReactDOM from "react-dom";

import data from "./data.json";
import "./styles.css";
import Board from "react-trello";

function App() {
  const [boardEventData, setBoardEventData] = useState({
    source: "",
    target: "",
    card: "",
    position: ""
  });
  const [cardDraggableSwitch, setCardDraggable] = useState(true);
  const [eventBus, setEventBus] = useState(undefined);

  // const dragStart = (
  //   cardId,
  //   sourceLaneId,
  //   targetLaneId,
  //   position,
  //   cardDetails
  // ) => {
  //   setBoardEventData({
  //     source: sourceLaneId,
  //     target: targetLaneId,
  //     card: cardId,
  //     position: position
  //   });
  // };

  const confirmationModalEvent = (e, action) => {
    if (action) {
      console.log(e);
    } else {
      eventBus.publish({
        type: "MOVE_CARD",
        fromLaneId: boardEventData.target,
        toLaneId: boardEventData.source,
        cardId: boardEventData.card,
        index: 0
      });
    }
  };

  const setEventBusBind = (handle) => {
    setEventBus(handle);
  };

  const handleDragEndBind = (
    cardId,
    sourceLaneId,
    targetLaneId,
    position,
    cardDetails
  ) => {
    setBoardEventData({
      source: sourceLaneId,
      target: targetLaneId,
      card: cardId,
      position: position
    });
  };

  return (
    <div className="App">
      <h1>react-trello demo</h1>

      <div>
        <button onClick={(e) => confirmationModalEvent(e, true)}>Yes</button>
        <button onClick={(e) => confirmationModalEvent(e, false)}>No</button>
      </div>

      <Board
        laneDraggable={false}
        cardDraggable={cardDraggableSwitch}
        eventBusHandle={setEventBusBind}
        data={data}
        handleDragEnd={handleDragEndBind}
        draggable
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
