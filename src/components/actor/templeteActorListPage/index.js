import React, { useState, useEffect } from "react";
import HeaderActorList from "../headerActorList"; // 演员的头部组件
import FilterActorsCard from "../filterActorsCard"; // 演员的过滤卡片
import ActorList from "../actorList"; // 演员列表组件
import Grid from "@mui/material/Grid";

function ActorListPageTemplate({ actors = [], title, action }) {

    const [nameFilter, setNameFilter] = useState("");

    let displayedActors = actors.filter((a) => {
        return a.name.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    });

    const handleChange = (type, value) => {
        if (type === "name") setNameFilter(value);
    };

    return (
        <Grid container sx={{ padding: '20px' }}>
            <Grid item xs={12}>
                <HeaderActorList title={title} />
            </Grid>
            <Grid item container spacing={5}>
                <Grid key="find" item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <FilterActorsCard
                        onUserInput={handleChange}
                        nameFilter={nameFilter}
                    />
                </Grid>
                <ActorList action={action} actors={displayedActors} />
            </Grid>
        </Grid>
    );
}

export default ActorListPageTemplate;
