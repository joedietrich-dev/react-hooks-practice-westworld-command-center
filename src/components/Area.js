import React from "react";
import { splitAndCapitalize } from "../services/Capitalize";
import "../stylesheets/Area.css";
import HostList from "./HostList";

function Area({ name, limit, hosts, selectedHostId, setSelectedHostId }) {
  return (
    <div className="area" id={name}>
      <h3 className="labels">
        {splitAndCapitalize(name)}
      </h3>
      <HostList hosts={hosts} setSelectedHostId={setSelectedHostId} selectedHostId={selectedHostId} />
    </div>
  );
}

Area.propTypes = {
  hosts: function (props) {
    if (props.hosts.length > props.limit) {
      throw Error(`HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`);
    }
  },
};

export default Area;
