// functions to be used throughout the app

import inquirer from 'inquirer'
import Twitter from 'twitter'
import Spotify from 'node-spotify-api'
import request from 'request'
import moment from 'moment'
import { twitter_keys, spotify_keys, omdb_keys } from './keys'
import { spotQuest, twitQuest, omdbQuest } from './questions'
import { liri_start } from '../liri'


export const runTwitInt = () =>{
    const client = new Twitter({
        consumer_key: twitter_keys.consumer_key,
        consumer_secret: twitter_keys.consumer_secret,
        access_token_key: twitter_keys.access_token_key,
        access_token_secret: twitter_keys.access_token_secret
    });
    
    client.get('statuses/user_timeline', function(error, tweets, response) {
        if(error){console.log(error)}
        if (!error) {
            console.log(`User: ${tweets[0].user.screen_name}`);
            console.log('=============================');
            for(const tweet of tweets){
                const t = moment(tweet.created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').format('MMM D YYYY h:mm a');
                console.log(`tweet: ${tweet.text}`);
                console.log(`@: ${t}`);
                console.log('------------------------------');
            }
            setTimeout(liri_start, 3000)
            
        }
    });
}

// Spotify api -search- function
export const runSpotInt = () =>{
    inquirer.prompt(spotQuest).then(data =>{
        const spotify = new Spotify({
            id: spotify_keys.id,
            secret: spotify_keys.secret
        })
        const params = {
            type: data.search_type,
            query: data.search_param,
            limit: 1
        }
        spotify.search(params, (err, data)=>{
            if(err) console.log(`Error: ${err}`)
            switch(params.type){
                case 'artist':
                    const artist = data.artists.items[0]
                      const link = artist.external_urls.spotify
                      const name = artist.name
                      console.log(`Here's what I found:`)
                      console.log(`====================`)
                      console.log(`Artist name: ${name}`)
                      console.log(`--------------------`)
                      console.log(`Spotify link: ${link}`)
                    break
                case 'album':
                    const album = data.albums.items[0]
                      const album_name = album.name
                      const album_artist = album.artists[0].name
                      const album_release = album.release_date
                      console.log(`Here's what I found:`)
                      console.log(`=======================================`)
                      console.log(`Album name: ${album_name}`)
                      console.log(`Artist: ${album_artist}`)
                      console.log(`Release date: ${album_release}`)
                      console.log(`=======================================`)
                    break
                case 'track':
                    const song = data.tracks.items[0]
                      const song_name = song.name
                      const song_artist = song.artists[0].name
                      const song_release = song.album.release_date
                      console.log(`Here's what I found:`)
                      console.log(`=======================================`)
                      console.log(`Album: ${song.album.name}`)
                      console.log(`Song name: ${song_name}`)
                      console.log(`Artist: ${song_artist}`)
                      console.log(`Release date: ${song_release}`)
                      console.log(`=======================================`)
                    break
            }
            setTimeout(liri_start, 3000)
        })
    })
}

export const runOmdbInt = () =>{
    inquirer.prompt(omdbQuest).then( ({search_for}) =>{
        request(`https://www.omdbapi.com/?apikey=${omdb_keys.key}&s=${search_for}`, (err, data, body) =>{
            const movie = JSON.parse(body)
            const imdbID = movie.Search[0].imdbID
            request(`https://www.omdbapi.com/?apikey=${omdb_keys.key}&i=${imdbID}`, (err, data, body) =>{
                const { Title, Released, Country, Language, Plot, Actors, imdbRating, Ratings } = JSON.parse(body)
                console.log(`Here's what I found`)
                console.log(`========================`)
                console.log(`Title: ${Title}`)
                console.log(`Released: ${Released}`)
                console.log(`Country: ${Country}`)
                console.log(`Language: ${Language}`)
                console.log(`Plot: ${Plot}`)
                console.log(`Actors: ${Actors}`)
                console.log(`imdbRating: ${imdbRating}`)
                console.log(`Rotten Tomatos: ${Ratings[1].Value}`)
                console.log(`========================`)
                setTimeout(liri_start, 3000)
            })
        })
    })
}