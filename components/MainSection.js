import React from 'react';
import StopTime from './StopTime';
import Selection from './Selection';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Panel from 'react-bootstrap/lib/Panel';

const MainSection = () => (
  <div className="container">
    <Panel bsStyle="primary" header="Choose Your Trip">
      <Selection />
    </Panel>
    <StopTime />
  </div>
);

export default MainSection;
