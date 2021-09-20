import { Segment } from "semantic-ui-react";
import Area from "./Area";

function WestworldMap({ areas = [], activeHosts, selectedHostId, setSelectedHostId }) {

  return (
    <Segment id="map">
      {areas.map((area) => (
        <Area
          key={area.id}
          name={area.name}
          limit={area.limit}
          hosts={activeHosts.filter((host) => host.area === area.name)}
          selectedHostId={selectedHostId}
          setSelectedHostId={setSelectedHostId}
        />
      ))}
    </Segment>
  );
}

export default WestworldMap;
