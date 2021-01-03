import React from 'react';
import List from '../../../node_modules/antd/lib/list';
import LocalEvent from '../../models/Event';
import EventsListItem from './EventsListItem';

interface EventsListProps {
    events: LocalEvent[]
}

const EventsList: React.FC<EventsListProps> = ({ events }) => {
    return (
        <List
            style={{ padding: '25px 75px' }}
            itemLayout="vertical"
            size="large"
            dataSource={events}
            renderItem={event => (
                <EventsListItem event={event} key={event.url} />
            )}
        />
    );
};

export default EventsList;