import React from 'react';
import moment from 'moment';
import LocalEvent from '../../models/Event';
import { Button } from 'antd';
import styled, { css } from 'styled-components';

const StyledEventListItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    padding: 10px 32px;
    &:hover {
        background-color: hsla(0,0%,100%,.3);
    }
`;

const StyledNoWrapItem = styled.p`
    white-space: nowrap;
`;

const StyledEventTitle = styled.h3`
    color: white;
`;

interface EventsListItemProps {
    event: LocalEvent
}

const EventsListItem: React.FC<EventsListItemProps> = ({ event }) => {
    return (
        <StyledEventListItem>
            <img width={120} height={80} alt="EventPhoto" src={event.image.url} />
            <div>
                <StyledNoWrapItem>{moment(event.date).format('MMM Do')}</StyledNoWrapItem>
                <StyledNoWrapItem>{moment(event.date).format('ddd - h:mm a')}</StyledNoWrapItem>
            </div>
            <div>
                <StyledEventTitle>{event.name}</StyledEventTitle>
                <p>{`${event.venue.name} - ${event.venue.cityAndState}`}</p>
            </div>
            <div>
                <StyledNoWrapItem>Ticket Prices:</StyledNoWrapItem>
                <StyledNoWrapItem>{`$${event.priceMin} - $${event.priceMax}`}</StyledNoWrapItem>
            </div>
            <Button type='primary' size='large' href={event.url} >See Tickets</Button>
        </StyledEventListItem>
    );
};

export default EventsListItem;