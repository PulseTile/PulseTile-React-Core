import React, { PureComponent } from 'react';
import classNames from 'classnames';

export default class FormSecrion extends PureComponent {
  static defaultProps = {
    isBordered: false,
    isAccordion: false,
    isImportBtn: false,
  };

  state = {
    isOpenAccordion: false,
  };

  componentWillMount() {
    const { isOpenAccordion } = this.props;
    this.setState({ isOpenAccordion: !!isOpenAccordion });
  }

  toggleAccordion = () => {
    this.setState({ isOpenAccordion: !this.state.isOpenAccordion });
  };

  render() {
    const { title, isImportBtn, onImportClick, isAccordion, isBordered, theme, children } = this.props;
    const { isOpenAccordion } = this.state;

    return (
      <div className={
        classNames(`form-group-section form-group-section-${theme}`,
          { 'form-group-section-bordered': isBordered,
            'accordion': isAccordion,
            'open': isOpenAccordion })
      }
      >
        { (title || isAccordion || isImportBtn) ?
          <div className="form-group-section-heading">
            { (isAccordion || isImportBtn) ?
              <div className="control-group without-side-indent right">
                {isImportBtn ?
                  <button
                    onClick={onImportClick}
                    className={`btn btn-${theme}`}
                  ><span className="btn-text">Import Data</span></button>
                  : null
                }
                { isAccordion ?
                  <button
                    onClick={this.toggleAccordion}
                    className={`btn btn-${theme} btn-inverse btn-square btn-form-group-section-toggle`}
                  >
                    <i className="btn-icon fa fa-chevron-up" />
                  </button>
                  : null
                }
              </div>
              : null
            }
            { title ? <h3 className="panel-title">{title}</h3> : null }
          </div>
          : null
        }


        <div className="form-group-section-body">
          {children}
        </div>
      </div>

    )
  }
}

