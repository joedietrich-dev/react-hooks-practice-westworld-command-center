import React from "react";
import { Grid } from "semantic-ui-react";
import Details from "./Details";
import "../stylesheets/Headquarters.css";
import ColdStorage from "./ColdStorage";
import LogPanel from "./LogPanel";

function Headquarters({ areas, hosts, logs, selectedHostId, setSelectedHostId = (f) => f, onUpdateHost = (f) => f, onToggleActivateAll = (f) => f }) {
  const storedHosts = hosts.filter((host) => host.active === false);
  const selectedHost = hosts.find((host) => host.id === selectedHostId) || null;
  return (
    <Grid celled="internally">
      <Grid.Column width={8}>
        <ColdStorage storedHosts={storedHosts} selectedHostId={selectedHostId} setSelectedHostId={setSelectedHostId} />
      </Grid.Column>
      <Grid.Column width={5}>
        <Details selectedHost={selectedHost} areas={areas} onUpdateHost={onUpdateHost} />
      </Grid.Column>
      <Grid.Column width={3}>
        <LogPanel onToggleActivateAll={onToggleActivateAll} logs={logs} />
      </Grid.Column>
    </Grid>
  );
}

export default Headquarters;
