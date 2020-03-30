import React, { useContext } from 'react';
import { TourContext } from "../store/TourStore";
import { Avatar, List } from 'antd';
import "../App.css";
import { getAvatarFromArtist } from "../Util/ArtistHelpers";

export const RelatedArtists = () => {

    const Tour = useContext(TourContext);

    return (
        <>
            <h2>Here are some related artists we think you'll love:</h2>
            <div>{Tour.relatedArtists.length}</div>
            <div className="list-container">
                <List
                    dataSource={Tour.relatedArtists}
                    renderItem={item => (
                        <List.Item key={(item as any).id}>
                            <List.Item.Meta
                                avatar={ <Avatar src={getAvatarFromArtist(item)} /> }
                                title={(item as any).name}
                                description={(item as any).genres.join(', ')}
                            />
                            <button onClick={() => Tour.removeRelatedArtist(item)}>Remove</button>
                        </List.Item>
                    )}
                />
            </div>
        </>
    );
}