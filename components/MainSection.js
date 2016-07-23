import React from 'react';
import { connect } from 'react-redux';
import StopChooser from './StopChooser'

const MainSection = () => (
  <section className="main">
    <StopChooser />
    <StopChooser />
  </section>
)

export default connect()(MainSection);
