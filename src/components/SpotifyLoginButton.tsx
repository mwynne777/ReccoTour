import React from "react";
import Button from 'antd/lib/button';
import styled, { css } from 'styled-components';

const StyledSpotifyLoginButton = styled(Button)`
    width: 120px;
    margin: 0 auto;
    background-color: #1ed760 !important;
    color: white;
    border: none;
    &:hover {
        background-color: white !important;
        color: black;
    }
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