import React from "react";

export const SpotifyLoginButton = () => {

    return (
        <a className="btn btn--loginApp-link" 
            href={`${process.env.authEndpoint}?client_id=${process.env.clientId}&redirect_uri=${process.env.redirectUri}&scope=${process.env.scopes}
                &response_type=token&show_dialog=true`}
        >
            Login to Spotify
        </a>
    );
}