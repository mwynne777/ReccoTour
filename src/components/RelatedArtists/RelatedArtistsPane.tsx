import React, { useContext } from 'react';
import { RelatedArtists } from "./RelatedArtists";
import { Button } from 'antd';
import { TourContext } from '../../store/TourStore';

export const RelatedArtistsPane = () => {
    const Tour = useContext(TourContext);

    const updateSelectedArtists = async () => {
        const body = {
            field: 'selectedArtists',
            value: Tour.selectedArtists
        };
        const headers = { 'Content-Type': 'application/json' };
        const response = await fetch('/api/user', {method: 'PUT', headers: headers, body: JSON.stringify(body)});
        const res = await response.json();
    }

    return (
        <div className="RelatedArtistsPane"> 
            <RelatedArtists />
            <Button style={{float: "right", margin: "30px 50px 0px 0px"}} disabled={Tour.selectedArtists.length === 0}
                onClick={() => updateSelectedArtists()}>
                Submit
            </Button>
        </div>
    );
}