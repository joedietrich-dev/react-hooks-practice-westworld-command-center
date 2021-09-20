import React from "react";
import { Card } from "semantic-ui-react";
import "../stylesheets/Host.css";

function Host({ host: { id, imageUrl }, isSelected = false, setSelectedHostId = f => f }) {
  return (
    <Card
      className={`host ${isSelected ? "selected" : null}`}
      onClick={() => isSelected ? setSelectedHostId(0) : setSelectedHostId(id)}
      image={imageUrl}
      raised
      link
    />
  );
}

export default Host;
