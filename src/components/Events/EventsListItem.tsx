import React from 'react';
import LocalEvent from '../../models/Event';

interface EventsListItemProps {
    event: LocalEvent
}

const EventsListItem: React.FC<EventsListItemProps> = ({ event }) => {
    return (
        <div style={{ display: 'flex' }}>
            <img width={120} height={80} alt="EventPhoto" src={event.image.url} />
            <div>
                <h4>{event.name}</h4>
                <p>{event.info}</p>
            </div>
        </div>
    );
};

export default EventsListItem;