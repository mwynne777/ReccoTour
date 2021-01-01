import React, { useContext, useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import { MainLayout } from '../components/layout/MainLayout';
import { TourContext } from '../store/TourStore';
import { useFetchUser } from '../utils/user';
import { AutoComplete, Button, DatePicker, Input, Layout } from 'antd';
const { Option } = AutoComplete;
const { RangePicker } = DatePicker;
import { SelectValue } from '../../node_modules/antd/lib/select';
import { spotifyTokenName } from '../utils/auth0';

interface LocationWithCodes {
    city: string,
    countryCode: string,
    stateCode: string
}

export default function Events() {
    const tour = useContext(TourContext);
    const { user, loading } = useFetchUser();
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [autoFillLocations, setAutoFillLocations] = useState([]);
    const [selectedDates, setSelectedDates] = useState<[moment.Moment, moment.Moment]>([moment(), moment().add(1, 'w')]);

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

    const isDateDisabled = useCallback((currentDate: moment.Moment): boolean => {
        return currentDate < moment() || currentDate > moment().add(1, 'y');
    }, []);


    const onSubmit = async (): Promise<void> => {
        const selectedArtist = tour.selectedArtists[0];
        const locationCodes = getLocationCodes(selectedCity);
        const uri = `/discovery/v2/events?apikey=${process.env.ticketmasterAPIKey}&keyword=${selectedArtist.name}&radius=50&unit=miles&locale=*&city=${locationCodes.city}&stateCode=${locationCodes.stateCode}&countryCode=US`;
        const result = await fetch(uri);
        const resultJson = await result.json();
        console.log(resultJson);
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
                            style={{ width: '225px', marginTop: '10px' }} />
                        <RangePicker
                            format='MM-DD-YYYY'
                            defaultValue={selectedDates}
                            disabledDate={isDateDisabled}
                            onCalendarChange={(dates: [moment.Moment, moment.Moment]) => setSelectedDates(dates)} />
                        <Button onClick={onSubmit}>Search for events</Button>
                    </>
                }
            </div>
        </MainLayout>
    );
}
