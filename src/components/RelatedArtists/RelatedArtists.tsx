import React, { useContext } from 'react';
import { TourContext } from "../../store/TourStore";
import { Avatar, Button, List } from 'antd';
import { getAvatarFromArtist } from "../../utils/ArtistHelpers";

export const RelatedArtists = () => {

    const Tour = useContext(TourContext);

    return (
        <>
            <h2>{"Here are some related artists we think you'll love:"}</h2>
            <div className="ra-list-container">
                <List
                    dataSource={Tour.relatedArtists}
                    renderItem={item => (
                        <List.Item key={(item as any).id}>
                            <List.Item.Meta
                                avatar={ <Avatar src={getAvatarFromArtist(item)} /> }
                                title={(item as any).name}
                                description={(item as any).genres.join(', ')}
                            />
                            <Button type="danger" ghost onClick={() => Tour.removeRelatedArtist(item)}
                                style={{margin: "2px"}}>Remove</Button>
                        </List.Item>
                    )}
                />
            </div>
        </>
    );
}