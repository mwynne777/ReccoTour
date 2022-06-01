import React from 'react';
import List from 'antd/lib/list';
import { LocalEvent } from '../../models/Event';
import EventsListItem from './EventsListItem';
import styled from 'styled-components';

const StyledEventsList = styled(List)`
    margin-top: 16px;
    background-color: rgb(24, 24, 24);
    height: calc(100vh - 250px);
    overflow-y: auto;
`;

type EventsListProps = {
    events: LocalEvent[]
}

const EventsList: React.FC<EventsListProps> = ({ events }) => {
    return (
        <StyledEventsList
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