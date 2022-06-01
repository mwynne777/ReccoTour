import React, { useContext, useState, useCallback } from 'react';
import moment from 'moment';
import pThrottle from 'p-throttle';
import { MainLayout } from '../components/layout/MainLayout';
import { TourContext } from '../store/TourStore';
import { useFetchUser } from '../utils/user';
import { AutoComplete, DatePicker} from 'antd';
import { SelectValue } from 'antd/lib/select';
import { spotifyTokenName } from '../utils/auth0';
import { LocalEvent, mapTicketmasterEventToLocalEvent } from '../models/Event';
import EventsList from '../components/Events/EventsList';
import styled from 'styled-components';
import { StyledSpotifyButton } from '../components/SpotifyLoginButton';
const { Option } = AutoComplete;
const { RangePicker } = DatePicker;

const StyledEventsPageTitle = styled.h2`
    color: white;
`;

const StyledEventsSearchButton = styled(StyledSpotifyButton)`
    margin-left: 5px;
`;

type LocationWithCodes = {
    city: string,
    countryCode: string,
    stateCode: string
}

const throttle = pThrottle({
    limit: 5,
    interval: 1000
  })

export default function Events() {
    const tour = useContext(TourContext);
    const { user, loading } = useFetchUser();
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [autoFillLocations, setAutoFillLocations] = useState([]);
    const [selectedDates, setSelectedDates] = useState<[moment.Moment, moment.Moment]>([moment(), moment().add(1, 'w')]);
    const [events, setEvents] = useState<LocalEvent[]>([]);

    const getGoogleAutoComplete = async (value: SelectValue) => {
        // TODO: Add Google Places types
        // TODO: May need to format value as URL Param
        const result = await fetch(`/maps/api/place/autocomplete/json?input=${value}&types=(cities)&key=${process.env.googlePlacesAPIKey}`)
        const resultJSON = await result.json();
        const locationOptions = resultJSON.predictions.map(l => { return (<Option key={l.description}>{l.description}</Option>) });
        setAutoFillLocations(locationOptions);
    };

    const getLocationCodes = (location: string): LocationWithCodes => {
        const result = { city: '', stateCode: '', countryCode: '' };
        const locationSplit = location.split(',');

        if (locationSplit.length === 0) return result;

        if (locationSplit.length === 3) {
            result.stateCode = locationSplit[1];
            result.countryCode = locationSplit[2];
        } else if (locationSplit.length === 2) {
            result.countryCode = locationSplit[1];
        }
        result.city = locationSplit[0];
        return result;
    };

    //Move to util file
    const isDateDisabled = useCallback((currentDate: moment.Moment): boolean => {
        return currentDate < moment().subtract(1, 'd') || currentDate > moment().add(1, 'y');
    }, []);

    const onSubmit = async () => {
        const locationCodes = getLocationCodes(selectedCity);
        const selectedArtists = tour.selectedArtists.concat(tour.relatedArtists)
        // TODO: look into oibackoff (or something simlar) for retrying failed requests
        const responses = await Promise.all(selectedArtists.map(artist => 
            throttle(() => fetch(`/discovery/v2/events?apikey=${process.env.ticketmasterAPIKey}&keyword=${artist.name}&radius=50&unit=miles&locale=*&city=${locationCodes.city}&stateCode=${locationCodes.stateCode}&countryCode=US`))()
        ));
        const jsonResponses = await Promise.all(responses.map(result => result.json()))
        jsonResponses.map(resp => {
            if (resp._embedded) {
                const localEvents = resp._embedded.events.map(event => mapTicketmasterEventToLocalEvent(event))
                localEvents.forEach(e => events.push(e))
            }
        })
        setEvents(events);
    };

    return (
        <MainLayout>
            {(user && user[spotifyTokenName]) &&
                <>
                    <StyledEventsPageTitle>Where and when do you want to see your favorite artists?</StyledEventsPageTitle>
                    <AutoComplete
                        onChange={(value) => getGoogleAutoComplete(value)}
                        onSelect={(value) => setSelectedCity(value.toString())}
                        allowClear
                        dataSource={autoFillLocations}
                        placeholder='Enter your location'
                        style={{ width: '225px', marginRight: '5px' }} 
                    />
                    <RangePicker
                        style={{ marginRight: '5px' }}
                        format='MM-DD-YYYY'
                        defaultValue={selectedDates}
                        disabledDate={isDateDisabled}
                        onCalendarChange={(dates: [moment.Moment, moment.Moment]) => setSelectedDates(dates)} />
                    <StyledEventsSearchButton onClick={onSubmit} shape='round'>Search for events</StyledEventsSearchButton>
                    {events.length > 0 &&
                        <EventsList events={events} />
                    }
                </>
            }
        </MainLayout>
    );
}
