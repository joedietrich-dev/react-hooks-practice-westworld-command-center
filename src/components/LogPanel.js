import React, { useState } from "react";
import { Segment, Button } from "semantic-ui-react";

function LogPanel({ logs, onToggleActivateAll = f => f }) {
  const [isActivateAll, setIsActivateAll] = useState(true);

  function handleActivateAllClick() {
    onToggleActivateAll(isActivateAll);
    setIsActivateAll(wasActivateAll => !wasActivateAll);

  }

  return (
    <Segment className="HQComps" id="logPanel">
      <pre>
        {logs.map((log, i) => (
          <p key={i} className={log.type}>
            {log.msg}
          </p>
        ))}
      </pre>

      <Button fluid
        color={isActivateAll ? "red" : "green"}
        content={isActivateAll ? "ACTIVATE ALL" : "DECOMMISSION ALL"}
        onClick={handleActivateAllClick}
      />
    </Segment>
  );
}

export default LogPanel;
