import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, Button, Flex, Text } from 'theme-ui';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteSong, getSongsFetch } from '../src/store/slice/songslice';
import { css } from '@emotion/react';

function SongList({ id }) {
  const [stats, setStats] = useState();
  const [error, setError] = useState();

  const buttonStyles = css`
    background-color: rgb(4, 96, 99);

    &:hover {
      background-color: #012f30;
    }
  `;

  const songs = useSelector((state) => state.songs.songs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSongsFetch());
  }, [dispatch]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/songs/statstics')
      .then((response) => setStats(response.data))
      .catch((error) => setError(error.message));
  }, []);
  
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          minHeight:'100vh',
        }}
      >
        <Heading textAlign="center">All Songs</Heading>
        <Link to="/CreateSong">
          <Button css={buttonStyles}mt={4}>
            Create Song
          </Button>
        </Link>

        {songs.map((song) => (
          <Flex key={song._id} mt={2}>
            <Box p={2} width={1 / 2} color="white">
              <Link to={`/UpdateSong/${song._id}`}>
                <Button ml={3} css={buttonStyles}>
                  Update
                </Button>
              </Link>
            </Box>
            <Box p={2} width={1 / 2} color="black" bg="secondary" textAlign="center">
              <Text fontSize={0}>
                {song.artist} - {song.title}
              </Text>
            </Box>
            <Box p={2} width={1 / 2} color="white">
              <Button css={buttonStyles} onClick={() => dispatch(deleteSong({id:song._id}))}>
                Delete
              </Button>
            </Box>
          </Flex>
        ))}
      </Box>
      <Box>
      {stats && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
           minHeight:'40vh',
            backgroundColor: 'rgb(4, 96, 99)',
            
            p: '50px',
            color: 'white',
          }}
        >
          <Heading >Statistics</Heading>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
            <Box sx={{ display:'flex', flexDirection:'column'}}>
              <Text mt="10px">Total Songs: {stats.totalSongs}</Text>
              <Text mt="10px">Total Artists: {stats.totalArtists}</Text>
            </Box>
            <Box sx={{ display:'flex', flexDirection:'column'}}>
              <Text mt="10px">Total Albums: {stats.totalAlbums}</Text>
              <Text mt="10px">Total Genres: {stats.totalGenres}</Text>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
            <Box>
              <Heading as="h4" sx={{ fontSize: '24px',mt:'20' }}>
                Songs By Genre
              </Heading>
              {stats.songsByGenre.map((genre) => (
                <Text sx={{ display:'flex', flexDirection:'column' , mt:'15'}} key={genre._id}>
                  {genre._id}: {genre.count}
                </Text>
        ))}
          </Box>
       <Box>
            <Heading as="h4" sx={{ fontSize: '24px' , mt:'20'}}>
                Songs By Artist
            </Heading>
                   {stats.songsByArtist.map((artist) => (
           <Text sx={{ display:'flex', flexDirection:'column'}} key={artist._id}>
                {artist._id}: {artist.count}
          </Text>
        ))}
       </Box>
</Box>
      </Box>
   )}
       {error && (
                   <Box sx={{ backgroundColor: 'red', color: 'white', p: 2, mt: 2, textAlign: 'center' }}>
                        {error}
                  </Box>
   )}
</Box>
</Box>
);

}


export default SongList;

