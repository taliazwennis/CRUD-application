import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputLabel,
  TextField,
  styled,
} from "@mui/material";
import { FC } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { IoIosClose } from "react-icons/io";
import axios from "axios";

interface DialogProps {
  handleDialogChange: () => void;
  isOpen: boolean;
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
});

const GenreDialog: FC<DialogProps> = ({ isOpen, handleDialogChange }) => {
  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      name: "",
    },
    onSubmit: async (values) => {
      try {
        await axios.post("http://localhost:4000/genres", values);
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
    values: { name },
    errors: { name: nameError },
    touched: { name: nameTouched },
  } = formik;
  return (
    <Box>
      <BootstrapDialog open={isOpen}>
        <form onSubmit={handleSubmit}>
          <DialogTitle
            sx={{ margin: 0, padding: 2 }}
            id="customized-dialog-title"
          >
            Add a new genre
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
              Please fill in the following details to add a new genre:
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
            </Box>
          </DialogContent>
          <DialogActions>
            <Button style={{ color: "#aa534c" }} onClick={handleDialogChange}>
              Cancel
            </Button>
            <Button style={{ color: "#aa534c" }} type="submit">
              Create
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </Box>
  );
};

export default GenreDialog;
