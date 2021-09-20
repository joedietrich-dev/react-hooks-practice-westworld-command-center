import React from "react";
import { Segment } from "semantic-ui-react";
import HostList from "./HostList";

function ColdStorage({ storedHosts, setSelectedHostId, selectedHostId }) {
  return (
    <Segment.Group className="HQComps">
      <Segment compact>
        <h3 className="labels">ColdStorage</h3>
      </Segment>
      <Segment compact>
        <HostList hosts={storedHosts} setSelectedHostId={setSelectedHostId} selectedHostId={selectedHostId} />
      </Segment>
    </Segment.Group>
  );
}

export default ColdStorage;
