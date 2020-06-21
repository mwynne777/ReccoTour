import React, { useContext, useEffect } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { TourContext } from '../store/TourStore';
import { useFetchUser } from '../utils/user';
import { Layout, Spin } from 'antd';

export default function Profile() {
    const tour = useContext(TourContext);
    const { user, loading, token } = useFetchUser();

    return (
        <MainLayout>
            <div className="App">
                {(user && token) &&
                    <h2>{`Here are some events we think you'll love!`}</h2>
                }
            </div>
        </MainLayout>
    );
}
