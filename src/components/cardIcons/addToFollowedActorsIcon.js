import React, {useContext, useState} from "react";
import { ActorsContext } from "../../contexts/actorsContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Icon from '@mui/material/Icon';
import Button from "@mui/material/Button";
import handleRemoveFromFollowed from './removeFromFollowed'

const AddToFollowedActorsIcon = ({ actor }) => {
    const context = useContext(ActorsContext);

    const [isFollowing, setIsFollowing] = useState(false);

    const handleClick = () => {
        setIsFollowing(!isFollowing); // 切换激活状态
    };

    const handleAddToFollowedActors = (e) => {
        e.preventDefault();
        context.addToFollowing(actor);
    };

    return (
        <IconButton aria-label="add to followed actors" onClick={handleAddToFollowedActors}>
            <Button variant="outlined"
                    onClick={handleClick}
                    sx={{
                        color: isFollowing ? 'red' : 'default',
                        borderColor: isFollowing ? 'red' : 'default'
                    }}>
                {isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
        </IconButton>
    );
};

export default AddToFollowedActorsIcon;
