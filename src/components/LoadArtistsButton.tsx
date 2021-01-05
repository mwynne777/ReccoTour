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

    return (
        <div style={{ textAlign: 'left' }}>
            <Button onClick={loadUserDefaultArtists}>
                Load Your Artists
            </Button>
        </div>
    );
};

export default LoadArtistsButton;