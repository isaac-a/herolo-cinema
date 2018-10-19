import axios from 'axios';
import uuidv4 from 'uuid/v4';

import {
  SET_LOADING,
  SET_MOVIES,
  ERROR_LOADING,
  SET_MOVIE_TO_EDIT,
  SAVE_EDITED_MOVIE,
  SAVE_NEW_MOVIE,
  SET_MOVIE_TO_DELETE,
  DELETE_MOVIE
} from './types';
import { formatTitle } from '../utils';

export const setLoading = bool => ({
  type: SET_LOADING,
  payload: bool
});

export const fetchMovies = () => dispatch => {
  const loadedMovies = [];
  axios
    .all([
      axios.get(
        'https://www.omdbapi.com/?t=fight+club&y=1999&apikey=e2803df6'
      ),
      axios.get(
        'https://www.omdbapi.com/?t=the+godfather&y=1972&apikey=e2803df6'
      ),
      axios.get(
        'https://www.omdbapi.com/?t=pulp+fiction&y=1994&apikey=e2803df6'
      ),
      axios.get(
        'https://www.omdbapi.com/?t=the+dark+knight&y=2008&apikey=e2803df6'
      ),
      axios.get(
        'https://www.omdbapi.com/?t=forrest+gump&y=1994&apikey=e2803df6'
      ),
      axios.get(
        'https://www.omdbapi.com/?t=inception&y=2010&apikey=e2803df6'
      )
    ])
    .then(
      axios.spread((movie1, movie2, movie3, movie4, movie5, movie6) => {
        dispatch(setLoading(false));
        dispatch({ type: ERROR_LOADING, payload: null });
        loadedMovies.push(
          movie1.data,
          movie2.data,
          movie3.data,
          movie4.data,
          movie5.data,
          movie6.data
        );

        const formattedMovies = loadedMovies.map(movie => {
          return {
            id: uuidv4(),
            title: formatTitle(movie.Title),
            year: movie.Year,
            runtime: movie.Runtime,
            genre: movie.Genre,
            director: movie.Director
          };
        });
        dispatch({
          type: SET_MOVIES,
          payload: formattedMovies
        });
      })
    )
    .catch(err => {
      dispatch(setLoading(false));
      dispatch({
        type: ERROR_LOADING,
        payload: 'Could not fetch resources. Try reloading.'
      });
    });
};

export const setMovieToEdit = movie => {
  return {
    type: SET_MOVIE_TO_EDIT,
    payload: movie
  };
};

export const saveNewMovie = movie => {
  return {
    type: SAVE_NEW_MOVIE,
    payload: { ...movie, id: uuidv4(), title: formatTitle(movie.title) }
  };
};

export const saveEditedMovie = movie => {
  return {
    type: SAVE_EDITED_MOVIE,
    payload: { ...movie, title: formatTitle(movie.title) }
  };
};

export const setMovieToDelete = id => {
  return {
    type: SET_MOVIE_TO_DELETE,
    payload: id
  };
};

export const deleteMovie = id => {
  return {
    type: DELETE_MOVIE,
    payload: id
  };
};
