const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;

export default {
    fetchSoundtrack: {
        clientSecret: `${CLIENT_SECRET}`,
        clientID: `${CLIENT_ID}`
    }
}