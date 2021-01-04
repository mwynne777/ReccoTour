import React, { useContext } from 'react';
import { Button } from 'antd';
import { TourContext } from '../store/TourStore';

const LoadArtistsButton = () => {
    const Tour = useContext(TourContext);

    const loadUserDefaultArtists = async () => {
        const response = await fetch('/api/user');
        const res = await response.json();
        console.log(res);
        Tour.addSelectedArtist(res.selectedArtists);
    }

    const loadSpotifyTopArtists = async () => {
        const result = await fetch('https://api.spotify.com/v1/me/top/artists?limit=5', {
            headers: new Headers({
                'Authorization': 'Bearer ' + Tour.token
            })
        });
        const resultJson = await result.json();
        console.log(resultJson);
        Tour.addSelectedArtist(resultJson.items);
    };

    return (
        <div style={{ textAlign: 'left' }}>
            <Button onClick={loadSpotifyTopArtists}>
                Load Your Artists
            </Button>
        </div>
    );
};

export default LoadArtistsButton;