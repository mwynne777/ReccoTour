import React, { useContext } from 'react';
import { TourContext } from "../../store/TourStore";
import { Avatar, Button, List, Card } from 'antd';
import { getAvatarFromArtist } from "../../utils/ArtistHelpers";

export const RelatedArtists = () => {

    const Tour = useContext(TourContext);

    return (
        <div style={{ height: "75%", margin: "20px", boxShadow: "0 0 4px #D3D3D3" }}>
            <Card title="Here are some related artists we think you'll love:"
                style={{ height: "100%" }}>
                <List
                    style={{ overflow: "auto", height: "100%", padding: "0px 24px" }}
                    dataSource={Tour.relatedArtists}
                    renderItem={item => (
                        <List.Item key={(item as any).id}>
                            <List.Item.Meta
                                avatar={<Avatar style={{ marginTop: '19px' }} src={getAvatarFromArtist(item)} />}
                                title={(item as any).name}
                                description={`${(item as any).genres.join(', ')} \nSimilar to: ${(item as any).selectedArtistIDs.map(a => Tour.selectedArtists.find(s => s.id === a).name).join(', ')}`}
                                style={{ whiteSpace: 'pre-line' }}
                            />
                            <Button type="danger" ghost onClick={() => Tour.removeRelatedArtist(item)}
                                style={{ margin: "2px" }}>Remove</Button>
                        </List.Item>
                    )}
                />
            </Card>
        </div>
    );
}