import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/system/Stack";

export default function ToDo({
  info,
  handelCheck,
  handelOpenDelete,
  handelOpenEdit,
}) {
  const toDoStyle = {
    transition: ".4s",
    bgcolor: info.isDone ? "green" : "purple",
    padding: 1,
    borderRadius: 2,
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0px 5px 20px black",
    },
  };
  return (
    <Stack direction={"row"} sx={toDoStyle}>
      <Stack sx={{ flexGrow: 1 }}>
        <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{info.title}</p>
        <span style={{ fontSize: " .8rem" }}>12 Agu 2011</span>
      </Stack>

      <Stack direction="row" sx={{ gap: 2, alignItems: "center" }}>
        <IconButton
          sx={toDoBtnStyle}
          onClick={() => {
            handelCheck(info.id);
          }}
        >
          {info.isDone ? <ClearIcon /> : <CheckIcon />}
        </IconButton>

        <IconButton
          onClick={() => {
            handelOpenEdit(info.id);
          }}
          sx={toDoBtnStyle}
        >
          <EditIcon />
        </IconButton>

        <IconButton
          onClick={() => {
            handelOpenDelete(info.id);
          }}
          sx={toDoBtnStyle}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
}

const toDoBtnStyle = {
  transition: ".6s",
  bgcolor: "white",
  "&:hover": { bgcolor: "gold", color: "white" },
};
