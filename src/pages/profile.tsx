import React, { useContext, useEffect } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { TourContext } from '../store/TourStore';
import { useFetchUser } from '../utils/user';
import { Spin } from 'antd';

export default function Profile() {
    const tour = useContext(TourContext);
    const { user, loading } = useFetchUser();

    useEffect(() => {
        
    });

    if(loading) {
        return <Spin size="large" />;
    }

    return (
        <MainLayout>
            <div className="App">
                {(user && tour.token) &&
                    <>
                        <h2>{`Welcome to your profile, ${user.name}!`}</h2>
                    </>
                }
            </div>
        </MainLayout>
    );
}
