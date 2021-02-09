import React from 'react';
import moment from 'moment';
import LocalEvent from '../../models/Event';
import { Button } from 'antd';

interface EventsListItemProps {
    event: LocalEvent
}

const EventsListItem: React.FC<EventsListItemProps> = ({ event }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <img width={120} height={80} alt="EventPhoto" src={event.image.url} />
            <div>
                <p style={{ whiteSpace: 'nowrap' }} >{moment(event.date).format('MMM Do')}</p>
                <p style={{ whiteSpace: 'nowrap' }} >{moment(event.date).format('ddd - h:mm a')}</p>
            </div>
            <div>
                <h3>{event.name}</h3>
                <p>{`${event.venue.name} - ${event.venue.cityAndState}`}</p>
            </div>
            <div>
                <p style={{ whiteSpace: 'nowrap' }} >Ticket Prices:</p>
                <p style={{ whiteSpace: 'nowrap' }} >{`$${event.priceMin} - $${event.priceMax}`}</p>
            </div>
            <Button type='primary' size='large' href={event.url} >See Tickets</Button>
        </div>
    );
};

export default EventsListItem;