import { initAuth0 } from '@auth0/nextjs-auth0';

export default initAuth0({
  domain: process.env.domain,
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret,
  scope: 'openid profile',
  redirectUri: process.env.redirectUri,
  postLogoutRedirectUri: process.env.postLogoutRedirectUri,
  session: {
    cookieSecret: process.env.cookieSecret,
    cookieLifetime: 60 * 50,
    storeIdToken: false,
    storeAccessToken: false,
    storeRefreshToken: false,
  },
  oidcClient: {
    httpTimeout: 2500,
    clockTolerance: 10000,
  },
});

export const spotifyTokenName = 'https://my.ns/spotify/access_token';