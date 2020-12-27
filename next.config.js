require('dotenv').config();

const withImages = require('next-images');

module.exports = {
    ...withImages(),
    async rewrites() {
        return [
            {
                source: '/discovery/:slug*',
                destination: 'https://app.ticketmaster.com/discovery/:slug*', // Matched parameters can be used in the destination
            },
        ]
    }
}