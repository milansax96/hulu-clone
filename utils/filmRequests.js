const API_KEY = process.env.API_KEY;

export default {
    fetchVideos: {
        title: 'videos',
        url: `/videos?api_key=${API_KEY}`
    },
};