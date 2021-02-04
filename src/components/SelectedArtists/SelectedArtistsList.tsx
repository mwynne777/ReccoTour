import React, { useContext } from 'react';
import { Avatar, Button, List } from 'antd';
import { TourContext } from "../../store/TourStore";
import { getAvatarFromArtist } from "../../utils/ArtistHelpers";

export const SelectedArtistsList = () => {

    const Tour = useContext(TourContext);

    return (
        <List
            style={{ overflow: "auto", height: "100%", padding: "0px 24px" }}
            dataSource={Tour.selectedArtists}
            renderItem={item => (
                <List.Item key={(item as any).id}>
                    <List.Item.Meta
                        avatar={<Avatar style={{ marginTop: '8px' }} src={getAvatarFromArtist(item)} />}
                        title={(item as any).name}
                        description={(item as any).genres.join(', ')}
                    />
                    <Button type="danger" ghost onClick={() => Tour.removeSelectedArtist(item)}
                        style={{ margin: "3px" }}>Remove</Button>
                </List.Item>
            )}
        />
    );
}