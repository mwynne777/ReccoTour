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
        transform: scale(1.08, 1.08);
        -moz-transform: scale(1.08, 1.08);
        -ms-transform: scale(1.08, 1.08);
        -webkit-transform: scale(1.08, 1.08);
        -o-transform: scale(1.08, 1.08);
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