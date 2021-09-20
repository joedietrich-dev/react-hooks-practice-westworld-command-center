import React, { useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
import { splitAndCapitalize } from "../services/Capitalize";
import { Log } from "../services/Log";
import "../stylesheets/App.css";
import Headquarters from "./Headquarters";
import WestworldMap from "./WestworldMap";

function App() {
  const [hosts, setHosts] = useState([]);
  const [selectedHostId, setSelectedHostId] = useState(0);
  const [areas, setAreas] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/hosts")
      .then((res) => res.json())
      .then(setHosts);
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/areas")
      .then((res) => res.json())
      .then(setAreas);
  }, []);

  function handleUpdateHost(newAttribute) {
    const updatingHost = { ...hosts.find((host) => host.id === selectedHostId) };
    if (newAttribute.hasOwnProperty("area")) {
      const currentHostsInNewArea = hosts.filter((host) => host.area === newAttribute.area);
      const newHostCount = currentHostsInNewArea.length + 1;
      if (newHostCount > areas.find((area) => area.name === newAttribute.area).limit) {
        setLogs((logs) => [Log.error(`Too many hosts. Cannot add ${updatingHost.firstName} to ${newAttribute.area}`), ...logs]);
      } else if (newAttribute.area === "under_construction" && !hosts.find((host) => host.id === selectedHostId).authorized) {
        setLogs((logs) => [Log.error(`PERMISSION DENIED. ${updatingHost.firstName} IS UNAUTHORIZED`), ...logs]);
      } else {
        updateHost(newAttribute, updatingHost);
      }
    } else {
      updateHost(newAttribute, updatingHost);
    }
  }

  function handleToggleActivateAll(shouldActivateAll) {
    if (shouldActivateAll) {
      setLogs((logs) => [Log.warn("Activating all hosts!"), ...logs]);
    } else {
      setLogs((logs) => [Log.notify("Decommissioning all hosts."), ...logs]);
    }
    const updateIds = hosts.filter((host) => (shouldActivateAll ? !host.active : host.active));
    updateIds.forEach((host) => updateHost({ active: shouldActivateAll }, host));
  }

  function updateHost(newAttribute, updatingHost) {
    const updateHostId = updatingHost.id;
    setHosts((hosts) => hosts.map((host) => (host.id === updateHostId ? { ...host, ...newAttribute } : host)));

    fetch(`http://localhost:3001/hosts/${updateHostId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAttribute),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Cannot Update");
        if (newAttribute.hasOwnProperty("area"))
          setLogs([Log.notify(`${updatingHost.firstName} set in area ${splitAndCapitalize(newAttribute.area)}`), ...logs]);
        if (newAttribute.hasOwnProperty("active")) {
          newAttribute.active
            ? setLogs([Log.warn(`Activated ${updatingHost.firstName}`), ...logs])
            : setLogs((logs) => [Log.notify(`Decommissioned ${updatingHost.firstName}`), ...logs]);
        }
      })
      .catch((err) => {
        setLogs((logs) => [Log.error("There was a problem updating " + updatingHost.firstName), ...logs]);
        setHosts((hosts) => hosts.map((host) => (host.id === updateHostId ? updateHost : host)));
      });
  }

  const activeHosts = hosts.filter((host) => host.active === true);

  return (
    <Segment id="app">
      <WestworldMap areas={areas} activeHosts={activeHosts} selectedHostId={selectedHostId} setSelectedHostId={setSelectedHostId} />
      <Headquarters
        areas={areas}
        hosts={hosts}
        logs={logs}
        selectedHostId={selectedHostId}
        setSelectedHostId={setSelectedHostId}
        onUpdateHost={handleUpdateHost}
        onToggleActivateAll={handleToggleActivateAll}
      />
    </Segment>
  );
}

export default App;
