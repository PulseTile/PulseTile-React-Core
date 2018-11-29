import React, { Component } from 'react';

const accordionPrimaryClassNameMain = 'form-group-section form-group-section-bordered form-group-section-primary accordion';
const accordionSuccessClassNameMain = 'form-group-section form-group-section-bordered form-group-section-success accordion';
const accordionInfoClassNameMain = 'form-group-section form-group-section-bordered form-group-section-info accordion';
const accordionWarningClassNameMain = 'form-group-section form-group-section-bordered form-group-section-warning accordion';
const accordionDangerClassNameMain = 'form-group-section form-group-section-bordered form-group-section-danger accordion';

/**
 * This component returns content of FormSection section
 */
export default class FormSection extends Component {

  state = {
    accordionWithButtonPrimaryClassName: accordionPrimaryClassNameMain,
    isAccordionWithButtonPrimaryOpen: false,
    accordionPrimaryClassName: accordionPrimaryClassNameMain,
    isAccordionPrimaryOpen: false,
    accordionSuccessClassName: accordionSuccessClassNameMain,
    isAccordionSuccessOpen: false,
    accordionInfoClassName: accordionInfoClassNameMain,
    isAccordionInfoOpen: false,
    accordionWarningClassName: accordionWarningClassNameMain,
    isAccordionWarningOpen: false,
    accordionDangerClassName: accordionDangerClassNameMain,
    isAccordionDangerOpen: false,
  };

  /**
   * This function toggle primary accordion with button
   */
  toggleAccordionWithButtonPrimary = () => {
    const { isAccordionWithButtonPrimaryOpen } = this.state;
    if (isAccordionWithButtonPrimaryOpen) {
      this.setState({
        accordionWithButtonPrimaryClassName: accordionPrimaryClassNameMain + ' open',
        isAccordionWithButtonPrimaryOpen: !isAccordionWithButtonPrimaryOpen,
      });
    } else {
      this.setState({
        accordionWithButtonPrimaryClassName: accordionPrimaryClassNameMain,
        isAccordionWithButtonPrimaryOpen: !isAccordionWithButtonPrimaryOpen,
      });
    }
  };

  /**
   * This function toggle primary accordion
   */
  toggleAccordionPrimary = () => {
    const { isAccordionPrimaryOpen } = this.state;
    if (isAccordionPrimaryOpen) {
      this.setState({
        accordionPrimaryClassName: accordionPrimaryClassNameMain + ' open',
        isAccordionPrimaryOpen: !isAccordionPrimaryOpen,
      });
    } else {
      this.setState({
        accordionPrimaryClassName: accordionPrimaryClassNameMain,
        isAccordionPrimaryOpen: !isAccordionPrimaryOpen,
      });
    }
  };

  /**
   * This function toggle success accordion
   */
  toggleAccordionSuccess = () => {
    const { isAccordionSuccessOpen } = this.state;
    if (isAccordionSuccessOpen) {
      this.setState({
        accordionSuccessClassName: accordionSuccessClassNameMain + ' open',
        isAccordionSuccessOpen: !isAccordionSuccessOpen,
      });
    } else {
      this.setState({
        accordionSuccessClassName: accordionSuccessClassNameMain,
        isAccordionSuccessOpen: !isAccordionSuccessOpen,
      });
    }
  };

  /**
   * This function toggle info accordion
   */
  toggleAccordionInfo = () => {
    const { isAccordionInfoOpen } = this.state;
    if (isAccordionInfoOpen) {
      this.setState({
        accordionInfoClassName: accordionInfoClassNameMain + ' open',
        isAccordionInfoOpen: !isAccordionInfoOpen,
      });
    } else {
      this.setState({
        accordionInfoClassName: accordionInfoClassNameMain,
        isAccordionInfoOpen: !isAccordionInfoOpen,
      });
    }
  };

  /**
   * This function toggle warning accordion
   */
  toggleAccordionWarning = () => {
    const { isAccordionWarningOpen } = this.state;
    if (isAccordionWarningOpen) {
      this.setState({
        accordionWarningClassName: accordionWarningClassNameMain + ' open',
        isAccordionWarningOpen: !isAccordionWarningOpen,
      });
    } else {
      this.setState({
        accordionWarningClassName: accordionWarningClassNameMain,
        isAccordionWarningOpen: !isAccordionWarningOpen,
      });
    }
  };

  /**
   * This function toggle danger accordion
   */
  toggleAccordionDanger = () => {
    const { isAccordionDangerOpen } = this.state;
    if (isAccordionDangerOpen) {
      this.setState({
        accordionDangerClassName: accordionDangerClassNameMain + ' open',
        isAccordionDangerOpen: !isAccordionDangerOpen,
      });
    } else {
      this.setState({
        accordionDangerClassName: accordionDangerClassNameMain,
        isAccordionDangerOpen: !isAccordionDangerOpen,
      });
    }
  };

  render () {
    const { accordionWithButtonPrimaryClassName, accordionPrimaryClassName, accordionSuccessClassName, accordionInfoClassName, accordionWarningClassName, accordionDangerClassName } = this.state;
    return (
      <div id="form-section" className="ui-section">
        <strong className="ui-title">Form section</strong>
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <strong className="ui-sub-title">Form section simple</strong>
            <div className="form-group-section-list">
              <div className="form-group-section-list-heading">
                <label className="control-label">Section title</label>
              </div>
              <div className="form-group-section">
                <div className="form-group-section-body">
                  <div className="form-group-wrapper">
                    <div className="form-group">
                      <label className="control-label">Label for Input</label>
                      <div className="form-control-static">Input text</div>
                    </div>
                    <div className="form-group">
                      <label className="control-label">Label for Input</label>
                      <div className="form-control-static">Input text</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6">
            <strong className="ui-sub-title">Form section bordered</strong>
            <div className="form-group-section-list">
              <div className="form-group-section-list-heading">
                <label className="control-label">Section title</label>
              </div>
              <div className="form-group-section form-group-section-bordered form-group-section-primary">
                <div className="form-group-section-body">
                  <div className="form-group-wrapper">
                    <div className="form-group">
                      <label className="control-label">Label for Input</label>
                      <div className="form-control-static">Input text</div>
                    </div>
                    <div className="form-group">
                      <label className="control-label">Label for Input</label>
                      <div className="form-control-static">Input text</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6">
            <strong className="ui-sub-title">Form section collapsed</strong>
            <div className="form-group-section-list">
              <div className="form-group-section-list-heading">
                <label className="control-label">Section title</label>
              </div>
              <div className={accordionWithButtonPrimaryClassName}>
                <div className="form-group-section-heading">
                  <div className="control-group without-side-indent right">
                    <button className="btn btn-primary"><span className="btn-text">Button text</span></button>
                    <button type="button" className="btn btn-primary btn-inverse btn-square btn-form-group-section-toggle" onClick={() => this.toggleAccordionWithButtonPrimary()}>
                      <i className="btn-icon fa fa-chevron-up"></i>
                    </button>
                  </div>
                  <h3 className="panel-title">Title</h3>
                </div>
                <div className="form-group-section-body">
                  <div className="form-group-wrapper">
                    <div className="form-group">
                      <label className="control-label">Label for Input</label>
                      <div className="form-control-static">Input text</div>
                    </div>
                    <div className="form-group">
                      <label className="control-label">Label for Input</label>
                      <div className="form-control-static">Input text</div>
                    </div>
                    <div className="form-group">
                      <label className="control-label">Label for Input</label>
                      <div className="form-control-static">Input text</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ui-sub-section">
          <strong className="ui-sub-title">Form section color variations</strong>
          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <div className="form-group-section-list">
                <div className={accordionPrimaryClassName}>
                  <div className="form-group-section-heading">
                    <div className="control-group without-side-indent right">
                      <button type="button" className="btn btn-primary btn-inverse btn-square btn-form-group-section-toggle" onClick={() => this.toggleAccordionPrimary()}>
                        <i className="btn-icon fa fa-chevron-up"></i>
                      </button>
                    </div>
                  <h3 className="panel-title">Section title</h3>
                </div>
                <div className="form-group-section-body">
                  <div className="form-group-wrapper">
                    <div className="form-group">
                      <label className="control-label">Label for Input</label>
                      <div className="form-control-static">Input text</div>
                    </div>
                    <div className="form-group">
                      <label className="control-label">Label for Input</label>
                      <div className="form-control-static">Input text</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6">
            <div className="form-group-section-list">
              <div className={accordionSuccessClassName}>
                <div className="form-group-section-heading">
                  <div className="control-group without-side-indent right">
                    <button type="button" className="btn btn-success btn-inverse btn-square btn-form-group-section-toggle" onClick={() => this.toggleAccordionSuccess()}>
                      <i className="btn-icon fa fa-chevron-up"></i>
                    </button>
                  </div>
                  <h3 className="panel-title">Section title</h3>
                </div>
                <div className="form-group-section-body">
                  <div className="form-group-wrapper">
                    <div className="form-group">
                      <label className="control-label">Label for Input</label>
                      <div className="form-control-static">Input text</div>
                    </div>
                    <div className="form-group">
                      <label className="control-label">Label for Input</label>
                      <div className="form-control-static">Input text</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <div className="form-group-section-list">
              <div className={accordionInfoClassName}>
                <div className="form-group-section-heading">
                  <div className="control-group without-side-indent right">
                    <button type="button" className="btn btn-info btn-inverse btn-square btn-form-group-section-toggle" onClick={() => this.toggleAccordionInfo()}>
                      <i className="btn-icon fa fa-chevron-up"></i>
                    </button>
                  </div>
                  <h3 className="panel-title">Section title</h3>
                </div>
                <div className="form-group-section-body">
                  <div className="form-group-wrapper">
                    <div className="form-group">
                      <label className="control-label">Label for Input</label>
                      <div className="form-control-static">Input text</div>
                    </div>
                    <div className="form-group">
                      <label className="control-label">Label for Input</label>
                      <div className="form-control-static">Input text</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6">
            <div className="form-group-section-list">
              <div className={accordionWarningClassName}>
                <div className="form-group-section-heading">
                  <div className="control-group without-side-indent right">
                    <button type="button" className="btn btn-warning btn-inverse btn-square btn-form-group-section-toggle" onClick={() => this.toggleAccordionWarning()}>
                      <i className="btn-icon fa fa-chevron-up"></i>
                    </button>
                  </div>
                  <h3 className="panel-title">Section title</h3>
                </div>
                <div className="form-group-section-body">
                  <div className="form-group-wrapper">
                    <div className="form-group">
                      <label className="control-label">Label for Input</label>
                      <div className="form-control-static">Input text</div>
                    </div>
                    <div className="form-group">
                      <label className="control-label">Label for Input</label>
                      <div className="form-control-static">Input text</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <div className="form-group-section-list">
              <div className={accordionDangerClassName}>
                <div className="form-group-section-heading">
                  <div className="control-group without-side-indent right">
                    <button type="button" className="btn btn-danger btn-inverse btn-square btn-form-group-section-toggle" onClick={() => this.toggleAccordionDanger()}>
                      <i className="btn-icon fa fa-chevron-up"></i>
                    </button>
                  </div>
                  <h3 className="panel-title">Section title</h3>
                </div>
                <div className="form-group-section-body">
                  <div className="form-group-wrapper">
                    <div className="form-group">
                      <label className="control-label">Label for Input</label>
                      <div className="form-control-static">Input text</div>
                    </div>
                    <div className="form-group">
                      <label className="control-label">Label for Input</label>
                        <div className="form-control-static">Input text</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
