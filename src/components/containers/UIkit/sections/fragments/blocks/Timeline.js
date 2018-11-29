import React from 'react';
import { getDDMMMYYYY } from '../../../../../../utils/time-helpers.utils';

const eventsTimeline = [
    { sourceId: "dcf0fb6e-1b66-4a36-aa85-1445242184f5", source: "marand", serviceTeam: "test",     dateOfAppointment: 1490745600000, timeOfAppointment: 36000000, sideDateInTimeline: "left",  type: "Appointment" },
    { sourceId: "0946c543-b607-46c7-82ad-0ec435e69e16", source: "marand", serviceTeam: "test4",    dateOfAppointment: 1490745600000, timeOfAppointment: 36000000, sideDateInTimeline: "right", type: "Appointment" },
    { sourceId: "a3e90b6c-e020-4eaa-a912-f353e586ac4e", source: "marand", serviceTeam: 11111,      dateOfAppointment: 1490745600000, timeOfAppointment: 36000000, sideDateInTimeline: "left",  type: "Appointment" },
    { sourceId: "0cbf0731-d250-4f9b-9a51-2c59690378f1", source: "marand", serviceTeam: "test1142", dateOfAppointment: 1490227200000, timeOfAppointment: 43200000, sideDateInTimeline: "left",  type: "Appointment" },
    { sourceId: "6d4b6bf1-b4f0-47eb-ad96-5fb2fd8ab340", source: "marand", serviceTeam: "eeeee2",   dateOfAppointment: 1490227200000, timeOfAppointment: 43200000, sideDateInTimeline: "right", type: "Appointment" },
    { sourceId: "162819dc-7bea-4790-bb63-98e3218961d7", source: "marand", serviceTeam: "test2",    dateOfAppointment: 1490227200000, timeOfAppointment: 43200000, sideDateInTimeline: "left",  type: "Appointment" },
    { sourceId: "5f3d8770-244c-4fb6-8c62-0fa0d4a794aa", source: "marand", serviceTeam: "qwerty1",  dateOfAppointment: 1490227200000, timeOfAppointment: 43200000, sideDateInTimeline: "right", type: "Appointment" },
    { sourceId: "0ec243f9-aa81-4f05-acb8-63e184350815", source: "marand", serviceTeam: "test",     dateOfAppointment: 1490140800000, timeOfAppointment: 43200000, sideDateInTimeline: "left",  type: "Appointment" },
    { sourceId: "418e3708-9fd5-4e20-be8d-1b66a3fa7fde", source: "marand", serviceTeam: "test",     dateOfAppointment: 1490140800000, timeOfAppointment: 43200000, sideDateInTimeline: "right", type: "Appointment" },
    { sourceId: "0c99cd60-8a7f-4741-8cb1-3f725b85f58b", source: "marand", serviceTeam: 11,         dateOfAppointment: 1490054400000, timeOfAppointment: 43200000, sideDateInTimeline: "left",  type: "Appointment" },
    { sourceId: "7612f9bf-a09b-4745-9bba-1dd10627b049", source: "marand", serviceTeam: "test",     dateOfAppointment: 1490054400000, timeOfAppointment: 43200000, sideDateInTimeline: "right", type: "Appointment" },
    { sourceId: "572df48c-2a24-44a2-be7a-003abb28c824", source: "marand", serviceTeam: "test3",    dateOfAppointment: 1490054400000, timeOfAppointment: 43200000, sideDateInTimeline: "left",  type: "Appointment" },
    { sourceId: "99b5c419-77e5-4e9a-8830-baa7939c5ee1", source: "marand", serviceTeam: "test123",  dateOfAppointment: 1490054400000, timeOfAppointment: 43200000, sideDateInTimeline: "right", type: "Appointment" },
    { sourceId: "9422bae6-4341-4710-ba1c-a7d68f052e5d", source: "marand", serviceTeam: "RippleT5", dateOfAppointment: 1489968000000, timeOfAppointment: 50400000, sideDateInTimeline: "left",  type: "Appointment" },
    { sourceId: "fc2766d3-11c6-4d1a-8f10-cee148924754", source: "marand", serviceTeam: "test",     dateOfAppointment: 1489968000000, timeOfAppointment: 43200000, sideDateInTimeline: "right", type: "Appointment" },
    { sourceId: "dfedd65b-b22a-4af9-9ee8-1992905d5578", source: "marand", serviceTeam: "qq55",     dateOfAppointment: 1489881600000, timeOfAppointment: 43200000, sideDateInTimeline: "left",  type: "Appointment" },
    { sourceId: "46083222-e6d4-4bd7-8513-903321754876", source: "marand", serviceTeam: "qq44",     dateOfAppointment: 1489795200000, timeOfAppointment: 43200000, sideDateInTimeline: "right", type: "Appointment" },
    { sourceId: "268bd303-abd9-4912-bef7-73c3fe4c863b", source: "marand", serviceTeam: "test417",  dateOfAppointment: 1489708800000, timeOfAppointment: 50400000, sideDateInTimeline: "left",  type: "Appointment" },
    { sourceId: "4f300390-0ab3-4626-8e33-d48b6a291f8d", source: "marand", serviceTeam: "test1",    dateOfAppointment: 1489708800000, timeOfAppointment: 43200000, sideDateInTimeline: "right", type: "Appointment" },
    { sourceId: "28277ffa-1eea-4997-b6c1-5babb4413814", source: "marand", serviceTeam: "eeeee",    dateOfAppointment: 1489708800000, timeOfAppointment: 43200000, sideDateInTimeline: "left",  type: "Appointment" },
    { sourceId: "7b9d8385-5e06-4af4-af20-3ba632a67a4a", source: "marand", serviceTeam: "qq33",     dateOfAppointment: 1489708800000, timeOfAppointment: 43200000, sideDateInTimeline: "right", type: "Appointment" },
    { sourceId: "97a14306-6d58-4b69-868f-a45b259f0e47", source: "marand", serviceTeam: "qq22",     dateOfAppointment: 1489708800000, timeOfAppointment: 43200000, sideDateInTimeline: "left",  type: "Appointment" },
];

/**
 * This component returns content of Timeline section in Blocks
 */
const Timeline = () => {
  return (
    <div id="timeline" className="ui-section">
      <strong className="ui-title">Timeline</strong>
      <div className="ui-sub-section">
        <div className="wrap-timeline">
          <div className="timeline-content-scroll">
            <div className="timeline">
              <div className="timeline-inner">
                {
                  eventsTimeline.map((item, key) => {
                    let position = (key % 2) ? 'timeline-date right' : 'timeline-date left';
                    return (
                      <div key={key}>
                        <div className="timeline-header">{ getDDMMMYYYY(item.dateOfAppointment) }</div>
                        <div className="timeline-date-group">
                          <div className={position}>
                            <div className="timeline-date-content">
                              <div className="timeline-date-title">{ item.serviceTeam }</div>
                              <div className="timeline-date-subtitle">{ item.type }</div>
                              <div className="timeline-date-text">{ getDDMMMYYYY(item.dateOfAppointment) }</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
