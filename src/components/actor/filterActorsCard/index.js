import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import SearchIcon from "@mui/icons-material/Search";

const formControl = {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)"
};

export default function FilterActorsCard({ onUserInput, genderOptions, nationalityOptions }) {
    const handleTextChange = (e) => {
        onUserInput("name", e.target.value);
    };

    // const handleGenderChange = (e) => {
    //     onUserInput("gender", e.target.value);
    // };
    //
    // const handleNationalityChange = (e) => {
    //     onUserInput("nationality", e.target.value);
    // };

    return (
        <Card
            sx={{
                maxWidth: 1800,
                position: 'relative'
            }}
            variant="outlined"
        >
            <CardContent sx={{ position: 'relative', zIndex: 2 }}>
                <Typography variant="h5" component="h1">
                    <SearchIcon fontSize="large" />
                    Filter the actors.
                </Typography>
                <TextField
                    sx={{...formControl, maxWidth: 1800}}
                    id="filled-search"
                    label="Search field"
                    type="search"
                    variant="filled"
                    onChange={handleTextChange}
                />
                {/*<FormControl sx={{...formControl}}>*/}
                {/*    <InputLabel id="gender-label">Gender</InputLabel>*/}
                {/*    <Select*/}
                {/*        labelId="gender-label"*/}
                {/*        id="gender-select"*/}
                {/*        onChange={handleGenderChange}*/}
                {/*    >*/}
                {/*        {genderOptions.map((option) => (*/}
                {/*            <MenuItem key={option.value} value={option.value}>*/}
                {/*                {option.label}*/}
                {/*            </MenuItem>*/}
                {/*        ))}*/}
                {/*    </Select>*/}
                {/*</FormControl>*/}
                {/*<FormControl sx={{...formControl}}>*/}
                {/*    <InputLabel id="nationality-label">Nationality</InputLabel>*/}
                {/*    <Select*/}
                {/*        labelId="nationality-label"*/}
                {/*        id="nationality-select"*/}
                {/*        onChange={handleNationalityChange}*/}
                {/*    >*/}
                {/*        {nationalityOptions.map((option) => (*/}
                {/*            <MenuItem key={option.value} value={option.value}>*/}
                {/*                {option.label}*/}
                {/*            </MenuItem>*/}
                {/*        ))}*/}
                {/*    </Select>*/}
                {/*</FormControl>*/}
            </CardContent>
        </Card>
    );
}
