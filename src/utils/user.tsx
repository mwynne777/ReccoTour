import React from 'react';
import fetch from 'isomorphic-unfetch';

export interface AuthData {
  user: any,
  loading: boolean,
  token: string
}

// Use a global to save the user, so we don't have to fetch it again after page navigations
let userState;

const User = React.createContext({ user: null, loading: false, token: null });

export const fetchUser = async () => {
  if (userState !== undefined) {
    return userState;
  }

  const res = await fetch('/api/me');
  userState = res.ok ? await res.json() : null;
  return userState;
};

export const UserProvider = ({ value, children }) => {
  const { user } = value;

  // If the user was fetched in SSR add it to userState so we don't fetch it again
  React.useEffect(() => {
    if (!userState && user) {
      userState = user;
    }
  }, []);

  return <User.Provider value={value}>{children}</User.Provider>;
};

export const useUser = () => React.useContext(User);

export const useFetchUser = () => {
  const [data, setUser] = React.useState({
    user: userState || null,
    loading: userState === undefined,
    token: null
  });

  React.useEffect(() => {
    if (userState !== undefined) {
      return;
    }

    let isMounted = true;

    fetchUser().then(user => {
      // Only set the user if the component is still mounted
      if (isMounted) {
        let token = null;
        if (user && user['https://my.ns/spotify/access_token']) {
            token = user['https://my.ns/spotify/access_token'];
        }
        setUser({ user, loading: false, token: token });
      }
    });

    return () => {
      isMounted = false;
    };
  }, [userState]);

  return data;
};