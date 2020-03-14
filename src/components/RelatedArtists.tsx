import React, { useContext } from 'react';
import { TourContext } from "../store/TourStore";
import * as $ from "jquery";
import "../App.css";

export const RelatedArtists = () => {

    const Tour = useContext(TourContext);

    const findRelatedArtistsAPICall = (id: any) => {
        // Make a call using the token
        return $.ajax({
            url: "https://api.spotify.com/v1/artists/" + id + "/related-artists",
            type: "GET",
            beforeSend: xhr => {
                xhr.setRequestHeader("Authorization", "Bearer " + Tour.token);
            },
            success: data => {
                var relatedArtists = data.artists;
                return relatedArtists;
            }
        });
    }
    
    const findRelatedArtists = () => {
        console.log("Are we even findingRelatedArists??");
        var apiCalls: any[]= [];
        for(let i = 0; i < Tour.selectedArtists.length; i++) {
            let id = Tour.selectedArtists[i].id;
            apiCalls[i] = findRelatedArtistsAPICall(id);
        }
        $.when.apply($, apiCalls)
        .then(function () {
            console.log(arguments);
            var relatedArtists: any[] = [];
            for(var i = 0; i < arguments.length; i++) {
                relatedArtists = relatedArtists.concat(arguments[i][0].artists.map((a: any)=>a.name));
            }
            Tour.setTourFields({
                relatedArtists: [...new Set(relatedArtists)]
            });
        });
    }

    return (
        <>
            <button onClick={() => findRelatedArtists()}>Find Related Artists</button>
            <button onClick={() => console.log(Tour.relatedArtists/*.map((a) => a.name)*/)}>Log Related Artists</button>
        </>
    );
}