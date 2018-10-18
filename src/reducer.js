import {
  SET_LOADING,
  SET_MOVIES,
  SET_MOVIE_TO_EDIT,
  SAVE_EDITED_MOVIE,
  SAVE_NEW_MOVIE,
  SET_MOVIE_TO_DELETE,
  DELETE_MOVIE,
  ERROR_LOADING
} from './actions/types';

const initialState = {
  movies: [],
  movieToEdit: {},
  loading: false,
  error: null,
  movieToDelete: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case SET_MOVIES:
      return {
        ...state,
        loading: false,
        movies: action.payload
      };

    case SET_MOVIE_TO_EDIT:
      return {
        ...state,
        movieToEdit: action.payload
      };

    case SAVE_EDITED_MOVIE:
      const updatedMovies = state.movies.map(movie => {
        return movie.id === action.payload.id ? action.payload : movie;
      });
      return {
        ...state,
        movies: updatedMovies
      };

    case SAVE_NEW_MOVIE:
      return {
        ...state,
        movies: [action.payload, ...state.movies]
      };

    case SET_MOVIE_TO_DELETE:
      return {
        ...state,
        movieToDelete: action.payload
      };

    case DELETE_MOVIE:
      const indexToDelete = state.movies.findIndex(
        movie => movie.id === action.payload
      );
      return {
        ...state,
        movies: [
          ...state.movies.slice(0, indexToDelete),
          ...state.movies.slice(indexToDelete + 1)
        ]
      };

    case ERROR_LOADING:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};
