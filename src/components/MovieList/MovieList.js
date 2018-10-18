import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import MovieCard from './MovieCard/MovieCard';
import Modal from '../Modal/Modal';
import EditMovieForm from '../Forms/EditMovieForm';
import AddMovieForm from '../Forms/AddMovieForm';
import DeleteDialog from '../DeleteDialog/DeleteDialog';
import Spinner from '../Spinner/Spinner';
import classes from './MovieList.module.css';
import {
  fetchMovies,
  setMovieToEdit,
  setMovieToDelete,
  deleteMovie
} from '../../actions/movieActions';

class MovieList extends Component {
  state = {
    movies: [],
    showEditMovieModal: false,
    showAddMovieModal: false,
    showDeleteModal: false
  };

  componentDidMount() {
    this.props.fetchMovies();
  }

  componentDidUpdate(prevProps) {
    if (this.props.movies !== prevProps.movies) {
      this.setState({ movies: this.props.movies });
    }
  }

  closeModalHandler = () => {
    this.setState({
      showEditMovieModal: false,
      showDeleteModal: false,
      showAddMovieModal: false
    });
  };

  openFormModal = type => {
    if (type && type === 'add') {
      this.setState({ showAddMovieModal: true });
    } else {
      this.setState({ showEditMovieModal: true });
    }
  };

  openDeleteDialog = () => {
    this.setState({ showDeleteModal: true });
  };

  editMovieHandler = movieToEdit => {
    this.openFormModal();
    this.props.setMovieToEdit(movieToEdit);
  };

  deleteMovieHandler = () => {
    this.props.deleteMovie(this.props.movieToDelete);
    this.closeModalHandler();
  };

  render() {
    const movieCards = this.state.movies.map(movie => (
      <MovieCard
        key={movie.id}
        id={movie.id}
        title={movie.title}
        year={movie.year}
        runtime={movie.runtime}
        genre={movie.genre}
        director={movie.director}
        editMovie={this.editMovieHandler}
        setMovieToDelete={this.props.setMovieToDelete}
        openFormModal={this.openFormModal}
        openDeleteDialog={this.openDeleteDialog}
      />
    ));

    let modalContent;
    if (this.state.showEditMovieModal) {
      modalContent = <EditMovieForm closeModal={this.closeModalHandler} />;
    } else if (this.state.showAddMovieModal) {
      modalContent = <AddMovieForm closeModal={this.closeModalHandler} />;
    } else {
      modalContent = (
        <DeleteDialog
          confirm={this.deleteMovieHandler}
          cancel={this.closeModalHandler}
        />
      );
    }

    return (
      <Fragment>
        {this.props.error && (
          <h2 className={classes.Error}>{this.props.error}</h2>
        )}
        {this.props.loading && <Spinner />}
        <Modal
          show={
            this.state.showEditMovieModal ||
            this.state.showDeleteModal ||
            this.state.showAddMovieModal
          }
          closeModal={this.closeModalHandler}
        >
          {modalContent}
        </Modal>
        <button
          className={classes.AddMovie}
          onClick={() => this.openFormModal('add')}
        >
          <i className="material-icons">add</i>
        </button>
        <ul className={classes.MovieList}>{movieCards}</ul>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
  movies: state.movies,
  movieToDelete: state.movieToDelete,
  error: state.error
});

export default connect(
  mapStateToProps,
  {
    fetchMovies,
    setMovieToEdit,
    setMovieToDelete,
    deleteMovie
  }
)(MovieList);
