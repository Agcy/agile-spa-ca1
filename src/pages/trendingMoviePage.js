// TrendingMoviesPage.js
import React from 'react';
import TrendingMovies from '../components/movie/trendingMovies';
import {useQuery} from "react-query";
import {getTrendingMovies} from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromPreviews from "../components/cardIcons/removeFromPreviews";
import PageTemplate from "../components/movie/templateMovieListPage";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const TrendingMoviesPage = () => {
    const {  data, error, isLoading, isError }  = useQuery('trending', getTrendingMovies)

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const movies = data.results;

    // Redundant, but necessary to avoid app crashing.
    const favorites = movies.filter(m => m.favorite)
    localStorage.setItem('favorites', JSON.stringify(favorites))

    return (
        <PageTemplate
            title="Trending Movies"
            movies={movies}
            action={(movie) => {
                return (
                    <AddToFavoritesIcon movie={movie} />
                );
            }}
        />
    );
};

export default TrendingMoviesPage;
