import React, { useEffect, useContext } from 'react';
import { AutoComplete } from "./Autocomplete";
import { SelectedArtistsList } from "./SelectedArtistsList";
import Card from '../../../node_modules/antd/lib/card';
import LoadArtistsButton from '../LoadArtistsButton';
import { TourContext } from '../../store/TourStore';

export const SelectedArtistsPane = () => {
    const Tour = useContext(TourContext);

    useEffect(() => {
        async function loadSpotifyTopArtists() {
            const result = await fetch('https://api.spotify.com/v1/me/top/artists?limit=5', {
                headers: new Headers({
                    'Authorization': 'Bearer ' + Tour.token
                })
            });
            const resultJson = await result.json();
            Tour.addSelectedArtist(resultJson.items);
        }
        if (Tour.token)
            loadSpotifyTopArtists();
    }, [Tour.token]);

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