import React from 'react';
import Buttons from '../fragments/components/Buttons';
import ControlGroup from '../fragments/components/ControlGroup';
import Form from '../fragments/components/Form';
import FormSection from '../fragments/components/FormSection';
import Inputs from '../fragments/components/Inputs';
import Selects from '../fragments/components/Selects';
import Radio from '../fragments/components/Radio';
import Checkboxes from '../fragments/components/Checkboxes';
import Switch from '../fragments/components/Switch';
import InputFile from '../fragments/components/InputFile';
import Datepicker from '../fragments/components/Datepicker';
import SliderRange from '../fragments/components/SliderRange';
import Scrollbar from '../fragments/components/Scrollbar';
import Labels from '../fragments/components/Labels';
import ThemeColors from '../fragments/components/ThemeColors';
import Selectable from '../fragments/components/Selectable';
import Highlighters from '../fragments/components/Highlighters';
import SpinnerBlock from '../fragments/components/Spinner';
import Pagination from '../fragments/components/Pagination';
import Modal from '../fragments/components/Modal';
import Dropdowns from '../fragments/components/Dropdowns';
import Panels from '../fragments/components/Panels/Panels';
import Tables from '../fragments/components/Tables';

/**
 * This component returns content of Component block of UIkit page
 */
const Component = () => {
  return (
    <div id="components" className="ui-section">
      <h2 className="ui-main-title">Components</h2>
      <Buttons />
      <ControlGroup />
      <Form />
      <FormSection />
      <Inputs />
      <Selects />
      <Checkboxes />
      <Radio />
      <Switch />
      <InputFile />
      <Datepicker />
      <SliderRange />
      <Scrollbar />
      <Labels />
      <ThemeColors />
      <Selectable />
      <Highlighters />
      <SpinnerBlock />
      <Pagination />
      <Modal />
      <Dropdowns />
      <Panels />
      <Tables />
    </div>
  );
};

export default Component;
