import React from "react";
import {
  Radio,
  Icon,
  Card,
  Grid,
  Image,
  Dropdown,
  Divider,
} from "semantic-ui-react";
import { splitAndCapitalize } from "../services/Capitalize";
import "../stylesheets/HostInfo.css";

function HostInfo({ areas, host: { id, firstName, lastName, active, imageUrl, gender, area, authorized }, onUpdateHost = f => f }) {
  const options = areas.map(area => ({ key: area.name, text: splitAndCapitalize(area.name), value: area.name }))

  function handleOptionChange(e, { value }) {
    onUpdateHost({ area: value });
  }

  function handleRadioChange() {
    onUpdateHost({ active: !active });
  }

  const fullName = `${firstName}${lastName === 'n/a' ? '' : ' ' + lastName}`

  return (
    <Grid>
      <Grid.Column width={6}>
        <Image
          src={imageUrl}
          floated="left"
          size="small"
          className="hostImg"
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <Card>
          <Card.Content>
            <Card.Header>
              {fullName} | {gender === 'Male' ? <Icon name="man" /> : <Icon name="woman" />}
            </Card.Header>
            <Card.Meta>
              <Radio
                onChange={handleRadioChange}
                label={active ? "Active" : "Decommissioned"}
                checked={active}
                slider
              />
            </Card.Meta>
            <Divider />
            Current Area:
            <Dropdown
              onChange={handleOptionChange}
              value={area}
              options={options}
              selection
            />
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
}

export default HostInfo;
