import React, { useState, useEffect, useContext } from 'react';
import { AutoComplete as AutoCompleteANTD, Avatar, List } from 'antd';
import { TourContext } from "../store/TourStore";
import emptyAvatar from "../images/emptyAvatar.png";
import "../App.css";

export const SelectedArtistsList = () => {

    const Tour = useContext(TourContext);

    const getAvatarFromArtist = (a: any) => {
        if(a.images.length > 0) {
          return a.images[0].url;
        }
        return emptyAvatar;
    }

    return (
        <div className="list-container">
            <List
            dataSource={Tour.selectedArtists}
            renderItem={item => (
                <List.Item key={(item as any).id}>
                <List.Item.Meta
                    avatar={ <Avatar src={getAvatarFromArtist(item)} /> }
                    title={(item as any).name}
                    description={(item as any).genres.join(', ')}
                />
                <div>Content</div>
                </List.Item>
            )}
            />
        </div>
    );
}