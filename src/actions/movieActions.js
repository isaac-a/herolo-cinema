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
  dispatch(setLoading(true));
  axios
    .get(
      'imdb/top?start=10&end=20&token=4de4e181-aa61-4b31-8e8f-1f04df973fed&format=json&data=1'
    )
    .then(res => {
      dispatch(setLoading(false));
      dispatch({ type: ERROR_LOADING, payload: null });
      const movies = res.data.data.movies.map(movie => {
        return { ...movie, id: uuidv4(), title: formatTitle(movie.title) };
      });
      dispatch({
        type: SET_MOVIES,
        payload: movies
      });
    })
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
    payload: { ...movie, id: uuidv4() }
  };
};

export const saveEditedMovie = movie => {
  return {
    type: SAVE_EDITED_MOVIE,
    payload: movie
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
