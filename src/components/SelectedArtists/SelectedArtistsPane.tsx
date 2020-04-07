import React from 'react';
import { AutoComplete } from "./Autocomplete";
import { SelectedArtistsList } from "./SelectedArtistsList";

export const SelectedArtistsPane = () => {
    return (
        <div className="SelectedArtistsPane"> 
            <h2>{"Search your favorite artists"}</h2>
            <AutoComplete />
            <SelectedArtistsList />
        </div>
    );
}