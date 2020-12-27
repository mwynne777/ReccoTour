import React, { useContext } from 'react';
import { RelatedArtists } from "./RelatedArtists";
import { Button } from 'antd';
import { TourContext } from '../../store/TourStore';
import { Artist } from '../../models/Artist';

export const RelatedArtistsPane = () => {
    const Tour = useContext(TourContext);

    const updateSelectedArtists = async () => {
        const body = {
            field: 'selectedArtists',
            value: Tour.selectedArtists
        };
        const headers = { 'Content-Type': 'application/json' };
        const response = await fetch('/api/user', { method: 'PUT', headers: headers, body: JSON.stringify(body) });
        const res = await response.json();
    }

    const testTicketmasterAPILimits = async () => {
        const requests = createAllRequests(Tour.selectedArtists.concat(Tour.relatedArtists));
        for (var i = 0; i < 10; i++) {
            const result = await fetch(requests[i]);
            const resultJson = await result.json();
            // console.log(requests[i]);
            console.log(resultJson);
        }
    }

    const createAllRequests = (artists: Artist[]): string[] => {
        let requests = [];
        artists.forEach(a => {
            requests.push(`/discovery/v2/events?apikey=ZysF29VGfUq33IKG2ujdgB75x6BL3Gie&keyword=${a.name}&radius=200&unit=miles&locale=*&city=new%20york&countryCode=US`);
        });
        return requests;
    }

    return (
        <div className="RelatedArtistsPane">
            <RelatedArtists />
            <Button style={{ float: "right", margin: "30px 50px 0px 0px" }} disabled={Tour.selectedArtists.length === 0}
                onClick={() => testTicketmasterAPILimits()}>
                Submit
            </Button>
        </div>
    );
}