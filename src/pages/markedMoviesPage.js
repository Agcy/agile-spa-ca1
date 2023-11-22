import React, { lazy, useContext, useMemo, Suspense } from "react";
import PageTemplate from "../components/movie/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
const Spinner = lazy(() => import('../components/spinner'));
const RemoveFromPreviews = lazy(() => import("../components/cardIcons/removeFromPreviews"));

const MarkedMoviesPage = () => {
    const { previews: movieIds } = useContext(MoviesContext);

    const previewMovieQueries = useQueries(
        movieIds.map((movieId) => ({
            queryKey: ["movie", { id: movieId }],
            queryFn: getMovie,
        }))
    );

    const isLoading = previewMovieQueries.some((m) => m.isLoading);

    // 使用 useMemo 来优化数据处理
    const movies = useMemo(() => previewMovieQueries.map((q) => {
        if (q.data) {
            return { ...q.data, genre_ids: q.data.genres.map(g => g.id) };
        }
        return null;
    }).filter(Boolean), [previewMovieQueries]);

    if (isLoading) {
        return <Spinner />;
    }

    const movieActions = (movie) => (
        <Suspense fallback={<Spinner />}>
            <RemoveFromPreviews movie={movie} />
        </Suspense>
    );

    return (
        <PageTemplate
            title="Marked Movies"
            movies={movies}
            action={movieActions}
        />
    );
};

export default MarkedMoviesPage;
