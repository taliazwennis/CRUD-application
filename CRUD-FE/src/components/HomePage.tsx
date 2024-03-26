import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "./Table";
import { Box, Button, Chip, Menu, MenuItem, TextField } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";
import { debounce } from "lodash";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import AnimeDialog from "./AnimeDialog";
import GenreDialog from "./GenreDialog";

const HomePage: React.FC = () => {
  const [animeData, setAnimeData] = useState([]);
  const [createAnimeDialogOpen, setCreateAnimeDialogOpen] = useState(false);
  const [createGenreDialogOpen, setCreateGenreDialogOpen] = useState(false);

  const handleSearchChange = (event: any) => {
    axios
      .get(`http://localhost:4000/anime?filter=${event.target.value}`)
      .then((response) => {
        const anime = response.data.map((anime: any) => ({
          ...anime,
          showDescription: false,
        }));
        setAnimeData(anime);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCreateAnimeChange = () => {
    setCreateAnimeDialogOpen(!createAnimeDialogOpen);
  };

  const handleCreateGenreChange = () => {
    setCreateGenreDialogOpen(!createGenreDialogOpen);
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/anime")
      .then((response) => {
        const anime = response.data.map((anime: any) => ({
          ...anime,
          showDescription: false,
        }));
        setAnimeData(anime);
        console.log("Fetched data: ", anime);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const columns: ColumnDef<any, any>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: (anime: any) => {
        return <span>{anime.row.original.name}</span>;
      },
    },

    {
      accessorKey: "rating",
      header: "Rating",
      cell: (anime: any) => {
        return <span>{anime.row.original.rating}</span>;
      },
    },
    {
      accessorKey: "genre",
      header: "Genre",
      cell: (anime: any) => {
        return (
          <Box display="flex" gap="4px" justifyContent="center">
            {anime.row.original.genres.map((genre: any, idx: number) => {
              const genreName = genre.name;
              return (
                <Chip
                  label={genreName}
                  variant="outlined"
                  style={{ background: "#ccd0b8" }}
                />
              );
            })}
          </Box>
        );
      },
    },
    {
      accessorKey: "releaseYear",
      header: "Release Year",
      cell: (anime: any) => {
        return <span>{anime.row.original.releaseYear}</span>;
      },
    },
  ];

  return (
    <Box
      sx={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/background.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      <Box
        width="65%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection="row"
      >
        <TextField
          onChange={debounce(handleSearchChange, 500)}
          size="small"
          label="Search"
          margin="normal"
          variant="outlined"
          style={{ width: "90%", margin: "0px", background: "white" }}
        />
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <Box>
              <Button
                size="small"
                style={{
                  padding: "8px",
                  backgroundColor: "#808274",
                  color: "white",
                  verticalAlign: "middle",
                }}
                {...bindTrigger(popupState)}
              >
                Add New
              </Button>
              <Menu {...bindMenu(popupState)}>
                <MenuItem
                  onClick={() => {
                    popupState.close();
                    setCreateAnimeDialogOpen(true);
                  }}
                >
                  Anime
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    popupState.close();
                    setCreateGenreDialogOpen(true);
                  }}
                >
                  Genre
                </MenuItem>
              </Menu>
            </Box>
          )}
        </PopupState>
      </Box>
      <AnimeDialog
        isOpen={createAnimeDialogOpen}
        handleDialogChange={handleCreateAnimeChange}
      />
      <GenreDialog
        isOpen={createGenreDialogOpen}
        handleDialogChange={handleCreateGenreChange}
      />
      <Box bgcolor="white" width="65%" gap="20px">
        <Table columns={columns} data={animeData} />
      </Box>
    </Box>
  );
};

export default HomePage;
