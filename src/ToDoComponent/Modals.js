// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
import {
  Button,
  Stack,
  TextField,
  Modal,
  Typography,
  Box,
} from "@mui/material";

import { useState } from "react";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 2,
  borderRadius: "7px",
};

export function DeleteModal({ CloseDeleteModal, openDelete, deleteActin }) {
  return (
    <div>
      <Modal
        open={openDelete}
        onClose={CloseDeleteModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure delete this task
          </Typography>
          <hr />

          <BtnsModal
            btnName="Delete"
            closeModal={CloseDeleteModal}
            action={deleteActin}
          />
        </Box>
      </Modal>
    </div>
  );
}

export function EditModal({ CloseEditModal, openEdit, editAction }) {
  const [newTitle, setNewTitle] = useState("");

  return (
    <div>
      <Modal
        open={openEdit}
        onClose={CloseEditModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter a new title
          </Typography>
          <hr />
          <TextField
            label="New Title"
            value={newTitle}
            variant="outlined"
            sx={{ width: "100%", margin: "1rem 0" }}
            onChange={(input) => {
              setNewTitle(input.target.value);
            }}
          />

          <BtnsModal
            btnName="Edit"
            closeModal={CloseEditModal}
            action={editAction}
            newTitle={newTitle}
            setNewTitle={setNewTitle}
          />
        </Box>
      </Modal>
    </div>
  );
}

function BtnsModal({ btnName, closeModal, action, newTitle = null }) {
  function checkTextField() {
    if (newTitle != null && newTitle.length == 0) {
      return true;
    }
    return false;
  }

  return (
    <Stack direction={"row"} sx={{ gap: "1rem", margin: "1rem 0" }}>
      <Button
        variant="contained"
        onClick={() => {
          action(newTitle);
        }}
        sx={{ bgcolor: "#ff6700", "&:hover": { bgcolor: "#ff7700" } }}
        disabled={checkTextField()}
      >
        {btnName}
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          closeModal();
        }}
      >
        Close
      </Button>
    </Stack>
  );
}
