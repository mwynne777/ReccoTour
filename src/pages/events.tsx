import React, { useContext, useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import { RateLimiter } from 'limiter';
import { MainLayout } from '../components/layout/MainLayout';
import { TourContext } from '../store/TourStore';
import { useFetchUser } from '../utils/user';
import { AutoComplete, Button, DatePicker, Input, Layout } from 'antd';
const { Option } = AutoComplete;
const { RangePicker } = DatePicker;
import { SelectValue } from 'antd/lib/select';
import { spotifyTokenName } from '../utils/auth0';
import { Artist } from '../models/Artist';
import LocalEvent, { mapTicketmasterEventToLocalEvent } from '../models/Event';
import EventsList from '../components/Events/EventsList';

interface LocationWithCodes {
    city: string,
    countryCode: string,
    stateCode: string
}

// Trying 10ms of buffer to avoid hitting rate limit
var limiter = new RateLimiter(1, 210);

export default function Events() {
    const tour = useContext(TourContext);
    const { user, loading } = useFetchUser();
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [autoFillLocations, setAutoFillLocations] = useState([]);
    const [selectedDates, setSelectedDates] = useState<[moment.Moment, moment.Moment]>([moment(), moment().add(1, 'w')]);
    const [events, setEvents] = useState<LocalEvent[]>([]);
    const [callsRemaining, setCallsRemaining] = useState<number>(tour.selectedArtists.concat(tour.relatedArtists).length);

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

    const callTicketmasterAPI = async (selectedArtist: Artist, locationCodes: LocationWithCodes) => {
        const uri = `/discovery/v2/events?apikey=${process.env.ticketmasterAPIKey}&keyword=${selectedArtist.name}&radius=50&unit=miles&locale=*&city=${locationCodes.city}&stateCode=${locationCodes.stateCode}&countryCode=US`;
        const result = await fetch(uri);
        const resultJson = await result.json();
        if (resultJson._embedded) {
            console.log(resultJson._embedded.events);
            const newEvents = resultJson._embedded.events.map(event => mapTicketmasterEventToLocalEvent(event));
            setEvents(oldEvents => [...oldEvents, ...newEvents]);
        }
        setCallsRemaining(oldRemaining => oldRemaining - 1);
    };

    const onSubmit = () => {
        const locationCodes = getLocationCodes(selectedCity);
        const selectedArtists = tour.selectedArtists.concat(tour.relatedArtists)
        // TODO: look into oibackoff (or something simlar) for retrying failed requests
        selectedArtists.forEach(element => {
            limiter.removeTokens(1, function () {
                callTicketmasterAPI(element, locationCodes);
            });
        });
    };

    return (
        <MainLayout>
            <div className='App'>
                {(user && user[spotifyTokenName]) &&
                    <>
                        <h2>Finally, tell us where and when you want to see your favorite artists:</h2>
                        <AutoComplete
                            onChange={(value) => getGoogleAutoComplete(value)}
                            onSelect={(value) => setSelectedCity(value.toString())}
                            allowClear
                            dataSource={autoFillLocations}
                            placeholder='Enter your location'
                            style={{ width: '225px', marginRight: '5px' }} />
                        <RangePicker
                            style={{ marginRight: '5px' }}
                            format='MM-DD-YYYY'
                            defaultValue={selectedDates}
                            disabledDate={isDateDisabled}
                            onCalendarChange={(dates: [moment.Moment, moment.Moment]) => setSelectedDates(dates)} />
                        <Button onClick={onSubmit}>Search for events</Button>
                        {callsRemaining === 0 &&
                            <EventsList events={events} />
                        }
                    </>
                }
            </div>
        </MainLayout>
    );
}
