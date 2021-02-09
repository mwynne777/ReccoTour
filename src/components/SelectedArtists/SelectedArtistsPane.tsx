import React from 'react';
import { AutoComplete } from "./Autocomplete";
import { SelectedArtistsList } from "./SelectedArtistsList";
import Card from 'antd/lib/card';

export const SelectedArtistsPane = () => {

    const title =
        <>
            <h4>Here are your top artists on Spotify: </h4>
            <AutoComplete />
        </>;

    return (
        <div className="SelectedArtistsPane">
            <div style={{ height: "85%", margin: "20px", boxShadow: "0 0 4px #D3D3D3" }}>
                <Card title={title} style={{ height: "100%" }}>
                    <SelectedArtistsList />
                </Card>
            </div>
        </div>
    );
}