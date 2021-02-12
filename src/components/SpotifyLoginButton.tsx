import React from "react";
import Button from 'antd/lib/button';
import styled, { css } from 'styled-components';

export const StyledSpotifyButton = styled(Button)`
    background-color: #1ed760;
    color: white;
    border: none;
    &:hover {
        transform: scale(1.08, 1.08);
        -moz-transform: scale(1.08, 1.08);
        -ms-transform: scale(1.08, 1.08);
        -webkit-transform: scale(1.08, 1.08);
        -o-transform: scale(1.08, 1.08);
        background-color: #1ed760;
        color: white;
    }
    &:focus {
        background-color: #1ed760;
        color: white;
    }
    &:active {
        background-color: #1ed760;
        color: white;
    }
`;

const StyledSpotifyLoginButton = styled(StyledSpotifyButton)`
    width: 120px;
    margin: 0 auto;
`;

export const SpotifyLoginButton = () => {

    return (
        <StyledSpotifyLoginButton
            type='primary'
            shape='round'
            href={'/api/login'}
        >
            Login
        </StyledSpotifyLoginButton>
    );
}