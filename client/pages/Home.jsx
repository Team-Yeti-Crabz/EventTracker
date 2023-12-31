import React, { useEffect, useState } from 'react';
import '../styles.css';
import { Link, useLocation } from 'react-router-dom';
import { Card, CardContent, Typography, Breadcrumbs } from '@mui/material';

export default function HomePage() {
  const location = useLocation();
  const { email, username, accessToken } = location.state;
  const [userData, setUserData] = useState({});
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);

  console.log('email: ', email);
  console.log(typeof email);

  useEffect(() => {
    const fetchingArtists = async () => {
      try {
        const response = await fetch(
          `/api/home/artist?email=${encodeURIComponent(email)}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );
        const artists = await response.json();
        // {
        // artistShows:[
        // {
        // artist: ,
        // genre: ,
        // price: ,
        // date: ,
        // venue: ,
        // eventUrl: ,
        // imgUrl:
        // },{},{}]
        // }
        setArtists(artists.artistShows);
      } catch (err) {
        throw new Error('Error with artist fetch request!', err);
      }
    };
    //fetchingArtists();

    const fetchingGenres = async () => {
      try {
        const response = await fetch(
          `/api/home/genre?email=${encodeURIComponent(email)}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );
        const genres = await response.json();
        // {
        // artistShows:[
        // {
        // artist: ,
        // genre: ,
        // price: ,
        // date: ,
        // venue: ,
        // eventUrl: ,
        // imgUrl:
        // },{},{}]
        // }
        const returned = genres.artistShows.slice(0, 30);
        setGenres(returned);
      } catch (err) {
        throw new Error('Error with genre fetch request!', err);
      }
    };
    //fetchingGenres();
  });

  return (
    <div className="homePage">
      <div className="breadcrumb">
        <Breadcrumbs aria-label="breadcrumb">
          <p color="text.primary" className="breadcrumbs">
            HOME PAGE
          </p>
          <Link
            underline="hover"
            color="inherit"
            to="/preferences"
            state={{ email, username, accessToken }}
          >
            PREFERENCES
          </Link>
        </Breadcrumbs>
      </div>
      <div className="home"> Welcome, {username}!</div>

      <div className="showBox">
        <h1>Upcoming Shows In Your Area</h1>
        <div className="artistShows">
          <h2>Artist Shows</h2>
          {artists.forEach((artist) => (
            <Card key={artist.artist} className="card">
              <CardContent>
                <Typography variant="h5" component="h3">
                  {artist.artist}
                </Typography>
                <Typography variant="body1" component="p">
                  Genre: {artist.genre}
                </Typography>
                <Typography variant="body1" component="p">
                  Date: {artist.date}
                </Typography>
                <Typography variant="body1" component="p">
                  Location: {artist.venue}
                </Typography>
                <Typography variant="body1" component="p">
                  Price: {artist.price}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="genreShows">
          <h2>Genre Shows</h2>
          {genres.forEach((genre) => (
            <Card key={genre.artist} className="card">
              <CardContent>
                <Typography variant="h5" component="h3">
                  {genre.artist}
                </Typography>
                <Typography variant="body1" component="p">
                  Genre: {genre.genre}
                </Typography>
                <Typography variant="body1" component="p">
                  Date: {genre.date}
                </Typography>
                <Typography variant="body1" component="p">
                  Location: {genre.venue}
                </Typography>
                <Typography variant="body1" component="p">
                  Price: {genre.price}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
