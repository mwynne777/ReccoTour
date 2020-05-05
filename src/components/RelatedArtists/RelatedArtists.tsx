import React, { useContext } from 'react';
import { TourContext } from "../../store/TourStore";
import { Avatar, Button, List, Card } from 'antd';
import { getAvatarFromArtist } from "../../utils/ArtistHelpers";

export const RelatedArtists = () => {

    const Tour = useContext(TourContext);

    return (
        <Card title="Here are some related artists we think you'll love:"
            style={{height: "75%", overflow: "auto", margin:"20px", boxShadow: "0 0 4px #D3D3D3"}}>
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
        </Card>
    );
}