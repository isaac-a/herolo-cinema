export const formatTitle = title => {
  const formattedArray = title
    .replace(/[\W_]+/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1));
  return formattedArray.join(' ');
};

export function validateForm(fields) {
  const sameTitle = this.props.movies.find(
    movie => movie.title.toUpperCase() === fields.title.toUpperCase()
  );

  if (sameTitle) {
    this.setState({ errors: { title: 'This title already exists' } });
    return;
  }
  if (!fields.title) {
    this.setState({ errors: { title: 'Title field is required' } });
    return;
  }
  if (!fields.year) {
    this.setState({ errors: { year: 'Year field is required' } });
    return;
  }
  if (isNaN(fields.year)) {
    this.setState({
      errors: { year: 'Please provide the year in digits' }
    });
    return;
  }
  if (!fields.runtime) {
    this.setState({ errors: { runtime: 'Runtime field is required' } });
    return;
  }
  if (isNaN(fields.runtime)) {
    this.setState({
      errors: { runtime: 'Please provide number of minutes' }
    });
    return;
  }
  if (!fields.genre) {
    this.setState({ errors: { genre: 'Genre field is required' } });
    return;
  }
  if (!fields.director) {
    this.setState({
      errors: { director: 'Director field is required' }
    });
    return;
  }
  return true;
}
