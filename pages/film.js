import {useState, useEffect} from 'react';
import filmRequests from "../utils/filmRequests";
import ReactPlayer from 'react-player';
import Header from "../components/Header";
import {Spotify} from 'react-spotify-embed';
import songRequests from "../utils/songRequests";
import Image from "next/image";

const CLIENT_ID = '86568e51e1f84227a7996668cbc8cd91';

export default function Film({ results, songResults, posterPath }) {
    const BASE_URL = 'https://image.tmdb.org/t/p/original'
    const [trailerVideo, setTrailerVideo] = useState({});
    const [filmSoundtrack, setFilmSoundtrack] = useState('');

    const findTrailerVideo = () => {
        const videoList = []
        if (results.results?.length > 0) {
            for (const entry of results.results) {
                const trailerName = entry['name']
                if (trailerName.toLowerCase().includes('trailer')) {
                    videoList.push(entry)
                }
            }
            return videoList[videoList.length - 1];
        }
    }

    const findFilmSoundtrack = () => {
        if (songResults.albums?.items.length > 0) {
            const albumResults = songResults['albums']['items']
            for (let i = 0; i < albumResults.length; i++) {
                const albumName = albumResults[i]['name']
                if (albumName.toLowerCase().includes('soundtrack')) {
                    return albumResults[i]['external_urls']['spotify']
                }
            }
        }
    }

    useEffect(() => {
        setTrailerVideo(findTrailerVideo());
        setFilmSoundtrack(findFilmSoundtrack());
    }, [])

    return (
        <div>
            <Header />
            <div className='sm:grid gap-8 place-items-center xl:flex justify-around'>
                {posterPath ?
                    <Image className='rounded-md transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50' width={300} height={300} src={`${BASE_URL}/${posterPath}`} /> : null}
                {trailerVideo ?
                    <ReactPlayer url={`https://youtube.com/watch?v=${trailerVideo.key}`}></ReactPlayer> : null}
                {filmSoundtrack ?
                    <Spotify link={filmSoundtrack} /> : null}
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const id = context.query['id'];
    const name = context.query['name'];
    const poster_path = context.query['poster_path'];

    console.log(context.query)

    const request = await fetch(
        `https://api.themoviedb.org/3/movie/${id}${filmRequests['fetchVideos'].url}`
    ).then(res => res.json());

    const authParameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + songRequests['fetchSoundtrack'].clientSecret
    }

    const tokenRequest = await fetch(
        'https://accounts.spotify.com/api/token',
        authParameters
    ).then(res => res.json())

    const songRequest = await fetch(
        `https://api.spotify.com/v1/search?q=${name}&type=album`,
        {
            headers: {
                'Authorization': 'Bearer ' + tokenRequest.access_token
            }
        }
    ).then(res => res.json())

    return {
        props: {
            results: request,
            songResults: songRequest,
            posterPath: poster_path
        }
    }
}

