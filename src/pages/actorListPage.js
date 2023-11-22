import React, {lazy} from "react";
import { getPopularActors } from "../api/tmdb-api";
import ActorListPageTemplate from '../components/actor/templeteActorListPage'
import AddToPreviewsIcon from '../components/cardIcons/addToPreviews'
import { useQuery } from 'react-query';
const Spinner = lazy(() => import('../components/spinner')) ;
import AddToFollowedActorsIcon from "../components/cardIcons/addToFollowedActorsIcon";

const ActorListPage = (props) => {
    const {  data, error, isLoading, isError }  = useQuery('actor', getPopularActors)

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const actors = data.results;
    const favorites = actors.filter(m => m.actor)
    localStorage.setItem('favorites', JSON.stringify(favorites))

    // Redundant, but necessary to avoid app crashing.
    // const addToFavorites = (movieId) => true

    return (
        <ActorListPageTemplate
            title='Popular Actor'
            actors={actors}
            action={(actor) => {
                return <AddToFollowedActorsIcon actor={actor} />
            }}
        />
    );
};
export default ActorListPage;
