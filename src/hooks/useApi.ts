import fetch from 'isomorphic-unfetch';
import React, { useEffect, useState } from 'react';

export interface APIResponse {
    response: string,
    error: any,
    isLoading: boolean
}

function initialState(args: Partial<APIResponse>) : APIResponse{
  return {
    response: null,
    error: null,
    isLoading: true,
    ...args
  };
}

export default (url, options = {}) => {
  const [state, setState] = useState(() => initialState({}));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, {
          ...options
        });

        if (res.status >= 400) {
          setState(
            initialState({
              error: await res.json(),
              isLoading: false
            })
          );
        } else {
          setState(
            initialState({
              response: await res.json(),
              isLoading: false
            })
          );
        }
      } catch (error) {
        setState(
          initialState({
            error: {
              error: error.message
            },
            isLoading: false
          })
        );
      }
    };
    fetchData();
  }, []);
  return state;
};