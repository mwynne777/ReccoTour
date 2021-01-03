import React from 'react';
import moment from 'moment';
import List from '../../../node_modules/antd/lib/list';
import LocalEvent from '../../models/Event';
import { Avatar } from '../../../node_modules/antd';

interface EventsListProps {
    events: LocalEvent[]
}

const EventsList: React.FC<EventsListProps> = ({ events }) => {
    return (
        <List
            style={{ padding: 20 }}
            itemLayout="vertical"
            size="large"
            dataSource={events}
            renderItem={event => (
                <List.Item
                    key={event.url}
                >
                    <List.Item.Meta
                        title={<a href={event.url}>{event.name}</a>}
                        avatar={<img width={120} height={80} alt="EventPhoto" src={event.image.url} />}
                        description={`${moment(event.date).format('llll')} | Price Range: $${event.priceMin}-$${event.priceMax}`}
                    />
                    {event.info}
                </List.Item>
            )}
        />
    );
};

export default EventsList;