import React, {lazy} from "react";
import { getUpcomingMovie } from "../api/tmdb-api";
import PageTemplate from '../components/movie/templateMovieListPage'
import AddToPreviewsIcon from '../components/cardIcons/addToPreviews'
import { useQuery } from 'react-query';
const Spinner = lazy(() => import('../components/spinner')) ;

const UpcomingMoviePage = (props) => {
  const {  data, error, isLoading, isError }  = useQuery('upcoming', getUpcomingMovie)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }
  const movies = data.results;
  const favorites = movies.filter(m => m.upcoming)
  localStorage.setItem('favorites', JSON.stringify(favorites))

  // Redundant, but necessary to avoid app crashing.
  // const addToFavorites = (movieId) => true

  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={movies}
      action={(movie) => {
        return <AddToPreviewsIcon movie={movie} />
      }}
    />
  );
};
export default UpcomingMoviePage;
