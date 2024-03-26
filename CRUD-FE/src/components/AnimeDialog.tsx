import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { IoIosClose } from "react-icons/io";
import axios from "axios";

interface DialogProps {
  handleDialogChange: () => void;
  isOpen: boolean;
  animeId?: string;
}

interface Genre {
  id: string;
  name: string;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  rating: yup
    .number()
    .required("Rating is required")
    .min(0, "Rating must be at least 0")
    .max(10, "Rating must be at most 10"),
  releaseYear: yup.number().required("Rating is required"),
  genres: yup
    .array()
    .of(yup.string().required("Genre is required"))
    .min(1, "At least one genre is required"),
});

const AnimeDialog: FC<DialogProps> = ({
  isOpen,
  handleDialogChange,
  animeId,
}) => {
  const [genreData, setGenreData] = useState<Genre[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/genres")
      .then((response) => {
        setGenreData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      name: "",
      description: "",
      rating: 0,
      releaseYear: null,
      genres: [],
    },
    onSubmit: async (values) => {
      try {
        if (animeId) {
          await axios.put(`http://localhost:4000/anime/${animeId}`, values);
        } else {
          await axios.post("http://localhost:4000/anime", values);
        }
        handleDialogChange();
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setValues,
    values: { name, rating, description, releaseYear, genres },
    errors: {
      name: nameError,
      rating: ratingError,
      description: descriptionError,
      releaseYear: releaseYearError,
      genres: genreError,
    },
    touched: {
      name: nameTouched,
      rating: ratingTouched,
      description: descriptionTouched,
      releaseYear: releaseYearTouched,
      genres: genreTouched,
    },
  } = formik;

  useEffect(() => {
    if (animeId) {
      axios
        .get(`http://localhost:4000/anime/${animeId}`)
        .then((response) => {
          const genreIds: string[] = [];
          response.data.genres.map((genre: Genre) => {
            genreIds.push(genre.id);
          });
          const animeData = {
            ...response.data,
            genres: genreIds,
          };
          setValues(animeData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [animeId]);

  return (
    <Box>
      <BootstrapDialog aria-labelledby="customized-dialog-title" open={isOpen}>
        <form onSubmit={handleSubmit}>
          <DialogTitle
            sx={{ margin: 0, padding: 2 }}
            id="customized-dialog-title"
          >
            {animeId ? "Edit anime series" : "Add anime series "}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleDialogChange}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <IoIosClose />
          </IconButton>
          <DialogContent>
            <DialogContentText style={{ marginBottom: "20px" }}>
              Please fill in the following details to create or edit an anime
              series:
            </DialogContentText>
            <Box
              style={{ display: "flex", gap: "15px", flexDirection: "column" }}
            >
              <Box>
                <InputLabel
                  style={{ marginBottom: "5px", marginLeft: "5px" }}
                  id="genre-label"
                >
                  Name
                </InputLabel>
                <TextField
                  name="name"
                  fullWidth
                  value={name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={nameTouched && Boolean(nameError)}
                  helperText={nameTouched && nameError}
                />
              </Box>
              <Box>
                <InputLabel
                  style={{ marginBottom: "5px", marginLeft: "5px" }}
                  id="genre-label"
                >
                  Description
                </InputLabel>
                <TextField
                  name="description"
                  fullWidth
                  value={description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={descriptionTouched && Boolean(descriptionError)}
                  helperText={descriptionTouched && descriptionError}
                />
              </Box>

              <Box>
                <InputLabel
                  style={{ marginBottom: "5px", marginLeft: "5px" }}
                  id="genre-label"
                >
                  Genre
                </InputLabel>
                <Select
                  labelId="genre-label"
                  id="genres"
                  name="genres"
                  fullWidth
                  multiple
                  value={genres}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={genreTouched && Boolean(genreError)}
                >
                  {genreData &&
                    genreData.map((genre: Genre) => (
                      <MenuItem key={genre.id} value={genre.id}>
                        {genre.name}
                      </MenuItem>
                    ))}
                </Select>
                {genreTouched && genreError && (
                  <Typography
                    fontSize="0.75rem"
                    marginLeft="15px"
                    color="error"
                  >
                    {genreError}
                  </Typography>
                )}
              </Box>
              <Box>
                <InputLabel
                  style={{ marginBottom: "5px", marginLeft: "5px" }}
                  id="genre-label"
                >
                  Rating
                </InputLabel>
                <TextField
                  name="rating"
                  fullWidth
                  type="number"
                  value={rating}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputProps={{
                    inputProps: {
                      min: 0,
                      max: 10,
                      style: { textAlign: "center" },
                    },
                    endAdornment: (
                      <InputAdornment position="end">/10</InputAdornment>
                    ),
                  }}
                  error={ratingTouched && Boolean(ratingError)}
                  helperText={ratingTouched && ratingError}
                />
              </Box>
              <Box>
                <InputLabel
                  style={{ marginBottom: "5px", marginLeft: "5px" }}
                  id="genre-label"
                >
                  Release Year
                </InputLabel>
                <TextField
                  name="releaseYear"
                  fullWidth
                  type="number"
                  value={releaseYear}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={releaseYearTouched && Boolean(releaseYearError)}
                  helperText={releaseYearTouched && releaseYearError}
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button style={{ color: "#aa534c" }} onClick={handleDialogChange}>
              Cancel
            </Button>
            <Button style={{ color: "#aa534c" }} type="submit">
              {animeId ? "Edit" : "Create"}
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </Box>
  );
};

export default AnimeDialog;
