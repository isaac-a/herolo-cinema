import React from 'react';

import classes from '../MovieCard/MovieCard.module.css';

const MovieCard = props => {
  const {
    id,
    title,
    year,
    runtime,
    genre,
    director,
    editMovie,
    openDeleteDialog,
    setMovieToDelete
  } = props;
  const movie = { id, title, year, runtime, genre, director };

  const showDeleteDialog = id => {
    openDeleteDialog();
    setMovieToDelete(id);
  };

  return (
    <li className={classes.MovieCard}>
      <div>
        <p>{title}</p>
        <p>
          <span>Year: </span>
          {year}
        </p>
        <p>
          <span>Runtime: </span>
          {runtime.trim().replace(/\D/g, '') + ' min'}
        </p>
        <p>
          <span>Genre: </span>
          {genre}
        </p>
        <p>
          <span>Director: </span>
          {director}
        </p>
      </div>
      <div className={classes.Buttons}>
        <button className={classes.Edit} onClick={() => editMovie(movie)}>
          Edit
        </button>
        <button
          className={classes.Delete}
          onClick={() => showDeleteDialog(movie.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default MovieCard;
