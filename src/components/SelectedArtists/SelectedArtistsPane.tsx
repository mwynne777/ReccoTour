import React from 'react';
import { AutoComplete } from "./Autocomplete";
import { SelectedArtistsList } from "./SelectedArtistsList";
import Card from '../../../node_modules/antd/lib/card';
import LoadArtistsButton from '../LoadArtistsButton';

export const SelectedArtistsPane = () => {

    const title = 
        <>
            <h4>Search your favorite artists: </h4>
            <AutoComplete />
        </>;

    return (
        <div className="SelectedArtistsPane"> 
            <Card title={title} extra={<LoadArtistsButton/>}
                style={{height: "85%", overflow: "auto", margin:"20px", boxShadow: "0 0 4px #D3D3D3"}}>
                <SelectedArtistsList />
            </Card>
        </div>
    );
}