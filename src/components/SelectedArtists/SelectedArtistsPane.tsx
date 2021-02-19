import React from 'react';
import { AutoComplete } from "./Autocomplete";
import { SelectedArtistsList } from "./SelectedArtistsList";
import Card from 'antd/lib/card';
import styled, { css } from 'styled-components';

const StyledSelectedArtistsPane = styled.div`
    width: 50%;
    height: 100%;
    padding-top: 20px;
    float: left;
    background-color: rgb(15, 15, 15);

    .ant-card-body {
        padding: 0px;
        height: calc(100% - 106.5px);
    }
`;

const StyledSelectedArtistsListWrapper = styled.div`
    height: 85%;
    margin: 20px;
`;

const StyledTitle = styled.h4`
    color: white;
`;

export const SelectedArtistsPane = () => {

    const title =
        <>
            <StyledTitle>Here are your top artists on Spotify: </StyledTitle>
            <AutoComplete />
        </>;

    return (
        <StyledSelectedArtistsPane >
            <StyledSelectedArtistsListWrapper>
                <Card title={title} style={{ height: "100%", border: 'none' }}>
                    <SelectedArtistsList />
                </Card>
            </StyledSelectedArtistsListWrapper>
        </StyledSelectedArtistsPane>
    );
}