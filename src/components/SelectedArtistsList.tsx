import React, { useContext } from 'react';
import { Avatar, Button, List } from 'antd';
import { TourContext } from "../store/TourStore";
import { getAvatarFromArtist } from "../Util/ArtistHelpers";
import "../App.css";

export const SelectedArtistsList = () => {

    const Tour = useContext(TourContext);

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
                        <Button type="danger" onClick={() => Tour.removeSelectedArtist(item)}>Remove</Button>
                    </List.Item>
                )}
            />
        </div>
    );
}