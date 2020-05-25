import React, { useContext, useEffect } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { TourContext } from '../store/TourStore';
import { useFetchUser } from '../utils/user';
import { Layout, Menu, Spin } from 'antd';

const { Sider } = Layout;

export default function Profile() {
    const tour = useContext(TourContext);
    const { user, loading } = useFetchUser();

    return (
        <MainLayout>
            <div className="App">
                {(user && tour.token) &&
                    <Layout>
                        <Sider width={200} className="site-layout-background">
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                style={{ height: '100%', borderRight: 0 }}
                            >
                                <Menu.Item key="1">option1</Menu.Item>
                                <Menu.Item key="2">option2</Menu.Item>
                                <Menu.Item key="3">option3</Menu.Item>
                                <Menu.Item key="4">option4</Menu.Item>
                            </Menu>
                        </Sider>
                        <h2>{`Welcome to your profile, ${user.name}!`}</h2>
                    </Layout>
                }
            </div>
        </MainLayout>
    );
}
