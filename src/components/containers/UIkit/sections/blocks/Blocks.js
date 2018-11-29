import React from 'react';
import Header from '../fragments/blocks/Header';
import Footer from '../fragments/blocks/Footer';
import PatientInfo from '../fragments/blocks/PatientInfo';
import Breadcrumbs from '../fragments/blocks/Breadcrumbs';
import Sidebar from '../fragments/blocks/Sidebar';
import PanelWithFilter from '../fragments/blocks/PanelWithFilter';
import PatientSummaryDashboard from '../fragments/blocks/PatientSummaryDashboard';
import Vitals from '../fragments/blocks/Vitals/Vitals';
import Timeline from '../fragments/blocks/Timeline';
import BarChart from '../fragments/blocks/BarChart/BarChart';
import LineChart from '../fragments/blocks/LineChart';

/**
 * This component returns content of Blocks block of UIkit page
 *
 * @return {XML}
 * @constructor
 */
const Blocks = () => {
  return (
    <div id="blocks" className="ui-section">
      <h2 className="ui-main-title">Blocks</h2>
      <Header />
      <Footer />
      <PatientInfo />
      <Breadcrumbs />
      <Sidebar />
      <PanelWithFilter />
      <PatientSummaryDashboard />
      <Vitals />
      <Timeline />
      <BarChart />
      <LineChart />
    </div>
  );
};

export default Blocks;
