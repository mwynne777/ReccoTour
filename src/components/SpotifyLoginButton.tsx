import React from "react";
import Button from 'antd/lib/button';

export const SpotifyLoginButton = () => {

    return (
        <Button
            type='primary'
            shape='round'
            href={'/api/login'}
            style={{ width: '100px', margin: '0 auto' }}
        >
            Login
        </Button>
    );
}