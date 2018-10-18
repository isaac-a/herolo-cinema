import React, { Component } from 'react';
import { connect } from 'react-redux';

import ErrorMessage from '../ErrorMessage/ErrorMessage';
import classes from './Form.module.css';
import { saveEditedMovie } from '../../actions/movieActions';
import { validateForm } from '../../utils';

class EditMovieForm extends Component {
  state = {
    movieDetails: {
      title: this.props.movieToEdit.title,
      year: this.props.movieToEdit.year,
      runtime: this.props.movieToEdit.runtime.trim().replace(/\D/g, ''),
      genre: this.props.movieToEdit.genre,
      director: this.props.movieToEdit.director
    },
    errors: {}
  };

  onChangeHandler = e => {
    this.setState({
      movieDetails: {
        ...this.state.movieDetails,
        [e.target.id]: e.target.value
      }
    });
  };

  onSaveMovieHandler = () => {
    if (validateForm.call(this, this.state.movieDetails)) {
      this.props.saveEditedMovie({
        ...this.state.movieDetails,
        id: this.props.movieToEdit.id
      });
      this.props.closeModal();
    }
  };

  render() {
    const {
      title,
      year,
      runtime,
      genre,
      director
    } = this.state.movieDetails;
    const { errors } = this.state;

    return (
      <div className={classes.MovieForm}>
        <h2>Edit Movie</h2>
        <form>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            defaultValue={title}
            onChange={this.onChangeHandler}
          />
          {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
          <label htmlFor="year">Year</label>
          <input
            type="text"
            id="year"
            defaultValue={year}
            onChange={this.onChangeHandler}
          />
          {errors.year && <ErrorMessage>{errors.year}</ErrorMessage>}
          <label htmlFor="runtime">Runtime</label>
          <input
            type="text"
            id="runtime"
            defaultValue={runtime}
            onChange={this.onChangeHandler}
          />
          {errors.runtime && <ErrorMessage>{errors.runtime}</ErrorMessage>}
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            id="genre"
            defaultValue={genre}
            onChange={this.onChangeHandler}
          />
          {errors.genre && <ErrorMessage>{errors.genre}</ErrorMessage>}
          <label htmlFor="director">Director</label>
          <input
            type="text"
            id="director"
            defaultValue={director}
            onChange={this.onChangeHandler}
          />
          {errors.director && (
            <ErrorMessage>{errors.director}</ErrorMessage>
          )}
        </form>
        <button className={classes.Save} onClick={this.onSaveMovieHandler}>
          Save
        </button>
        <button className={classes.Cancel} onClick={this.props.closeModal}>
          Cancel
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.movies,
  movieToEdit: state.movieToEdit
});

export default connect(
  mapStateToProps,
  { saveEditedMovie }
)(EditMovieForm);
