import React, { PureComponent } from 'react';
import moment from 'moment';
import { Scrollbars } from 'react-custom-scrollbars';

export default class EventsTimelines extends PureComponent {
  render() {
    const { eventsTimeline } = this.props;
    const timelines = [];
    for (const key in eventsTimeline) {
      timelines.push(
        <div>
          <div className="timeline-header">{moment(parseInt(key)).format('DD-MMM-YYYY')}</div>
          <div className="timeline-date-group">
            {eventsTimeline[key].map(event =>
              <div className={`timeline-date ${event.sideDateInTimeline}`}>
                <div className="timeline-date-content">
                  <div className="timeline-date-title">{event.name}</div>
                  <div className="timeline-date-subtitle">{event.type}</div>
                  <div className="timeline-date-text">{moment(parseInt(event.dateTime)).format('DD-MMM-YYYY')}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )
    }
    return (
      <div className="wrap-timeline">
        <Scrollbars
          style={{ height: 648 }}
          renderTrackVertical={props => <div {...props} className="track-vertical"/>}
        >
          <div className="timeline-content-scroll">
            <div className="timeline">
              <div className="timeline-inner">
                {timelines}
              </div>
            </div>
          </div>
        </Scrollbars>
      </div>
    )
  }
}
