import React from "react";
import { Card } from "semantic-ui-react";
import Host from "./Host";

function HostList({ hosts = [], selectedHostId = 0, setSelectedHostId = (f) => f }) {
  return (
    <Card.Group itemsPerRow={6}>
      {hosts.map((host) => (
        <Host
          key={host.id}
          host={host}
          isSelected={host.id === selectedHostId}
          setSelectedHostId={setSelectedHostId}
        />
      ))}
    </Card.Group>
  );
}

export default HostList;
