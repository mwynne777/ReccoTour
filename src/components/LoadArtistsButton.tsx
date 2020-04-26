import { Button } from 'antd';

const LoadArtistsButton = () => {

    const loadUserDefaultArtists = async () => {
        const response = await fetch('/api/user');
        const res = await response.json();
    }

    return (
        <div style={{textAlign: 'left'}}>
            <Button style={{position: 'absolute', margin: '72px 0px 0px 20px'}}
                onClick={() => loadUserDefaultArtists()}
            >
                Load Your Artists
            </Button>
        </div>
    );
};

export default LoadArtistsButton;