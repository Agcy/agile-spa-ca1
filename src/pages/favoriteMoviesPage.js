import React, { lazy, useContext, useMemo, Suspense } from "react";
import PageTemplate from "../components/movie/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
const Spinner = lazy(() => import('../components/spinner'));
const RemoveFromFavorites = lazy(() => import("../components/cardIcons/removeFromFavorites"));
const WriteReview = lazy(() => import("../components/cardIcons/writeReview"));

const FavoriteMoviesPage = () => {
    const { favorites: movieIds } = useContext(MoviesContext);

    const favoriteMovieQueries = useQueries(
        movieIds.map((movieId) => ({
            queryKey: ["movie", { id: movieId }],
            queryFn: getMovie,
        }))
    );

    const isLoading = favoriteMovieQueries.some((m) => m.isLoading);

    const movies = useMemo(() => favoriteMovieQueries.map((q) => {
        if (q.data) {
            return { ...q.data, genre_ids: q.data.genres.map(g => g.id) };
        }
        return null;
    }).filter(Boolean), [favoriteMovieQueries]);

    if (isLoading) {
        return <Spinner />;
    }

    const movieActions = (movie) => (
        <Suspense fallback={<Spinner />}>
            <RemoveFromFavorites movie={movie} />
            <WriteReview movie={movie} />
        </Suspense>
    );

    return (
        <PageTemplate
            title="Favorite Movies"
            movies={movies}
            action={movieActions}
        />
    );
};

export default FavoriteMoviesPage;
