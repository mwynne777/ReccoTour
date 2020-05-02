import React, { useContext } from 'react';
import { Button } from 'antd';
import { TourContext } from '../store/TourStore';

const LoadArtistsButton = () => {
    const Tour = useContext(TourContext);

    const loadUserDefaultArtists = async () => {
        const response = await fetch('/api/user');
        const res = await response.json();
        Tour.addSelectedArtist(res.selectedArtists);
    }

    return (
        <div style={{textAlign: 'left'}}>
            <Button style={{position: 'absolute', margin: '72px 0px 0px 20px'}}
                onClick={() => loadUserDefaultArtists()}
            >
                Load Your Artists
            </Button>
        </div>
    );
};

export default LoadArtistsButton;