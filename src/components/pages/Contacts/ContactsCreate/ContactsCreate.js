import React, { PureComponent } from 'react';

import ContactsDetailPanel from '../ContactsDetail/ContactsDetailPanel'
import ContactsCreateForm from './ContactsCreateForm/ContactsCreateForm'
import PTButton from '../../../ui-elements/PTButton/PTButton';

const CONTACTS_CREATE = 'contactsCreate';

export default class ContactsCreate extends PureComponent {
  render() {
    const { onExpand, name, onShow, openedPanel, expandedPanel, currentPanel, onSaveSettings, formValues, onCancel, isCreatePanelVisible}  = this.props;
    return (
      <div className="section-detail">
        <div className="panel-group accordion">
          {(expandedPanel === CONTACTS_CREATE || expandedPanel === 'all') ? <ContactsDetailPanel
            onExpand={onExpand}
            name={CONTACTS_CREATE}
            title="Create Contact"
            onShow={onShow}
            isOpen={openedPanel === CONTACTS_CREATE}
            currentPanel={currentPanel}
            isCreatePanelVisible={isCreatePanelVisible}
          >
            <ContactsCreateForm />
              <div className="panel-control">
                <div className="wrap-control-group">
                  <div className="control-group right">
                    <PTButton className="btn btn-danger" onClick={() => onCancel()}>
                      <i className="fa fa-ban" /> Cancel
                    </PTButton>
                    <PTButton className="btn btn-success" onClick={() => onSaveSettings(formValues)}>
                      <i className="fa fa-check" /> Complete
                    </PTButton>
                  </div>
                </div>
              </div>
            </ContactsDetailPanel> : null}
        </div>
      </div>
    )
  }
}
