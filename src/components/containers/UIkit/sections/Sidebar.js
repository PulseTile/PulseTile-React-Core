import React from 'react';

/**
 * This function scroll to block with initial ID
 *
 * @param {string} id
 */
function scrollTo(id) {
  let block = document.getElementById(id);
  (block) && block.scrollIntoView({ behavior: "smooth", block: "start", inline: "center" });
}

/**
 * This component returns sidebar of UIkit page
 *
 * @return {XML}
 * @constructor
 */
const Sidebar = () => {
  return (
    <div className="ui-sidebar">
      <div className="ui-sidebar-inner">
        <ul className="ui-sidebar-nav">
          <li className="ui-sidebar-item">
            <a className="ui-sidebar-link" onClick={() => scrollTo('color-pallete')}>Color Pallete</a>
            <ul className="ui-sidebar-sub-nav">
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('main-colors')} className="ui-sidebar-sub-link">Main colors</a>
              </li>
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('theme-colors')} className="ui-sidebar-sub-link">Theme colors</a>
              </li>
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('black-white-colors')} className="ui-sidebar-sub-link">Black and White colors</a>
              </li>
            </ul>
          </li>
          <li className="ui-sidebar-item">
            <a onClick={() => scrollTo('typography')} className="ui-sidebar-link">Typography</a>
            <ul className="ui-sidebar-sub-nav">
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('headings')} className="ui-sidebar-sub-link">Headings</a>
              </li>
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('paragraphs')} className="ui-sidebar-sub-link">Paragraphs</a>
              </li>
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('lists')} className="ui-sidebar-sub-link">Lists</a>
              </li>
            </ul>
          </li>
          <li className="ui-sidebar-item">
            <a onClick={() => scrollTo('components')} className="ui-sidebar-link">Components</a>
            <ul className="ui-sidebar-sub-nav">
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('buttons')} className="ui-sidebar-sub-link">Buttons</a>
              </li>
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('control-group')} className="ui-sidebar-sub-link">Control Group</a>
              </li>
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('form')} className="ui-sidebar-sub-link">Form</a>
              </li>
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('form-section')} className="ui-sidebar-sub-link">Form section</a>
              </li>
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('inputs')} className="ui-sidebar-sub-link">Inputs</a>
              </li>
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('select')} className="ui-sidebar-sub-link">Selects</a>
              </li>
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('checkboxes')} className="ui-sidebar-sub-link">Checkboxes</a>
              </li>
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('radio')} className="ui-sidebar-sub-link">Radio</a>
              </li>
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('switch')} className="ui-sidebar-sub-link">Switch</a>
              </li>
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('input-file')} className="ui-sidebar-sub-link">Input File</a>
              </li>
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('datepicker')} className="ui-sidebar-sub-link">Date Picker</a>
              </li>
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('slider-range')} className="ui-sidebar-sub-link">Slider Range</a>
              </li>
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('scrollbar')} className="ui-sidebar-sub-link">Scrollbar</a>
              </li>
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('labels')} className="ui-sidebar-sub-link">Labels</a>
              </li>
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('palette-color')} className="ui-sidebar-sub-link">Color Palette for Themes</a>
              </li>
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('selectable')} className="ui-sidebar-sub-link">Selectable</a>
              </li>
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('highlighter')} className="ui-sidebar-sub-link">Highlighters</a>
              </li>
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('spinner')} className="ui-sidebar-sub-link">Spinner</a>
              </li>
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('pagination')} className="ui-sidebar-sub-link">Pagination</a>
              </li>
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('modal')} className="ui-sidebar-sub-link">Modal</a>
              </li>
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('dropdowns')} className="ui-sidebar-sub-link">Dropdowns</a>
              </li>
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('panels')} className="ui-sidebar-sub-link">Panels</a>
              </li>
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('tables')} className="ui-sidebar-sub-link">Tables</a>
              </li>
            </ul>
          </li>
          <li className="ui-sidebar-item">
            <a onClick={() => scrollTo('grid')} className="ui-sidebar-link">Grid System</a>
            <ul className="ui-sidebar-sub-nav">
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('grid-options')} className="ui-sidebar-sub-link">Grid Options</a>
              </li>
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('grid-examples')} className="ui-sidebar-sub-link">Grid Examples</a>
              </li>
            </ul>
          </li>
          <li className="ui-sidebar-item">
            <a onClick={() => scrollTo('blocks')} className="ui-sidebar-link">Blocks</a>
            <ul className="ui-sidebar-sub-nav">
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('header')} className="ui-sidebar-sub-link">Header</a>
              </li>
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('footer')} className="ui-sidebar-sub-link">Footer</a>
              </li>
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('patient-info')} className="ui-sidebar-sub-link">Info of patient</a>
              </li>
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('breadcrumbs')} className="ui-sidebar-sub-link">Breadcrumbs</a>
              </li>
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('sidebar')} className="ui-sidebar-sub-link">Sidebar</a>
              </li>
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('panel-filter')} className="ui-sidebar-sub-link">Panel heading with filter</a>
              </li>
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('dashboard')} className="ui-sidebar-sub-link">Patient Summary Dashboard</a>
              </li>
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('vitals-popover')} className="ui-sidebar-sub-link">Vitals - News Input and Popover</a>
              </li>
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('timeline')} className="ui-sidebar-sub-link">Timeline</a>
              </li>
              <li className="ui-sidebar-sub-item">
                <a onClick={() => scrollTo('charts')} className="ui-sidebar-sub-link">Charts</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
