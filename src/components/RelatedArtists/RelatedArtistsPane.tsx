import React, { useContext } from 'react';
import Link from 'next/link';
import { RelatedArtists } from "./RelatedArtists";
import { Button, Icon } from 'antd';
import { TourContext } from '../../store/TourStore';
import { Artist } from '../../models/Artist';
import styled, { css } from 'styled-components';
import { StyledSpotifyButton } from '../SpotifyLoginButton';

const StyledSubmitButton = styled(StyledSpotifyButton)`
    float: right; 
    margin: 30px 50px 0px 0px;
`;

const StyledRelatedArtistsPane = styled.div`
    height: 100%;
    padding-top: 20px;
    flex: 1 1 0px;

    .ant-card-body {
        padding: 0px;
        height: calc(100% - 56px);
    }
`;

export const RelatedArtistsPane = () => {
    const Tour = useContext(TourContext);

    const updateSelectedArtists = async () => {
        const body = {
            field: 'selectedArtists',
            value: Tour.selectedArtists
        };
        const headers = { 'Content-Type': 'application/json' };
        const response = await fetch('/api/user', { method: 'PUT', headers: headers, body: JSON.stringify(body) });
        const res = await response.json();
    }

    return (
        <StyledRelatedArtistsPane>
            <RelatedArtists />
            <Link href='/events'>
                <StyledSubmitButton disabled={Tour.selectedArtists.length === 0} shape='round'>
                    Find Tickets <Icon type="arrow-right" />
                </StyledSubmitButton>
            </Link>
        </StyledRelatedArtistsPane>
    );
}