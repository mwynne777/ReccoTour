import React, { useContext } from 'react';
import { RelatedArtists } from "./RelatedArtists";
import { Button } from 'antd';
import { TourContext } from '../../store/TourStore';
import useApi from '../../hooks/useApi';

export const RelatedArtistsPane = () => {
    const Tour = useContext(TourContext);
    const { response, error, isLoading } = useApi('/api/user');

    return (
        <div className="RelatedArtistsPane"> 
            <RelatedArtists />
            <Button style={{float: "right", margin: "30px 50px 0px 0px"}} disabled={Tour.selectedArtists.length === 0}
                onClick={() => console.log(response)}>
                Submit
            </Button>
        </div>
    );
}