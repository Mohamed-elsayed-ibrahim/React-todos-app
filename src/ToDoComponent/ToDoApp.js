// =================COMPONENT && STYLE==========
import ToDo from "./ToDo";
import { DeleteModal, EditModal } from "./Modals";
// =================//COMPONENT && STYLE//========

// ===============MATERIAL UI ==================
import Container from "@mui/material/Container";
import Stack from "@mui/system/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// ===============//MATERIAL UI //==================

// ============HOOKES===========
import { useState, useEffect, useMemo } from "react";
// ============//HOOKES//===========

// =================**********TODOAPP COMPONENT***********==================
export default function ToDoApp() {
  // ============= RESIVED CLICK ID FROM TODO AND setId ===========
  const [id, setId] = useState(null);
  // =============// RESIVED CLICK ID FROM TODO AND setId// ===========

  const [toDosData, setTodosData] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [category, setCategroy] = useState("all");

  useEffect(() => {
    localStorage.getItem("toDos") &&
      setTodosData(JSON.parse(localStorage.getItem("toDos")));
  }, []);

  // =============SHOW TASKS CATEGORY =========================
  const allCategory = () => setCategroy("all");
  const completedCategory = () => setCategroy("completed");
  const incompletedCategory = () => setCategroy("incompleted");

  let toDosCategory = toDosData;
  let completedToDos = useMemo(() => {
    return toDosData.filter((info) => {
      return info.isDone;
    });
  }, [toDosData]);

  let incompleteToDos = useMemo(() => {
    return toDosData.filter((info) => {
      return !info.isDone;
    });
  }, [toDosData]);

  if (category == "completed") {
    toDosCategory = completedToDos;
  } else if (category == "incompleted") {
    toDosCategory = incompleteToDos;
  } else {
    toDosCategory = toDosData;
  }

  let toDosJsx = toDosCategory.map((info) => {
    return (
      <ToDo
        key={info.id}
        info={info}
        handelCheck={handelCheck}
        handelOpenDelete={handelOpenDelete}
        handelOpenEdit={handelOpenEdit}
      />
    );
  });
  // =============//SHOW TASKS CATEGORY// =========================

  // =============ADD NEW TASK ACTIONS ========================
  function addNewTask() {
    let update = [
      ...toDosData,
      {
        id: Math.random(),
        title: taskTitle,
        isDone: false,
      },
    ];
    setTodosData(update);

    localStorage.setItem("toDos", JSON.stringify(update));
    setTaskTitle("");
  }
  // =============//ADD NEW TASK ACTIONS// ====================
  // =============DONE ACTIONS ========================
  function handelCheck(id) {
    const update = toDosData.map((task) => {
      return task.id == id ? { ...task, isDone: !task.isDone } : task;
    });
    setTodosData(update);
    localStorage.setItem("toDos", JSON.stringify(update));
  }
  // =============//DONE ACTIONS// ======================

  // ============DELETE ACTIONS=========================
  const [openDelete, setOpenDelete] = useState(false);
  const CloseDeleteModal = () => setOpenDelete(false);
  function handelOpenDelete(clickId) {
    setOpenDelete(true);
    setId(clickId);
  }
  function deleteActin() {
    let update = toDosData.filter((task) => {
      return task.id != id;
    });
    setTodosData(update);
    localStorage.setItem("toDos", JSON.stringify(update));
    CloseDeleteModal();
  }
  // ============//DELETE ACTIONS//==================

  // ==============EDIT ACTIONS======================
  const [openEdit, setOpenEdit] = useState(false);
  const CloseEditModal = () => setOpenEdit(false);
  function handelOpenEdit(clickId) {
    setOpenEdit(true);
    setId(clickId);
  }
  function editAction(newTitle) {
    let update = toDosData.map((task) => {
      if (id == task.id) {
        return { ...task, title: newTitle };
      }

      return task;
    });

    setTodosData(update);
    localStorage.setItem("toDos", JSON.stringify(update));
    CloseEditModal();
  }
  // ============//EDIT ACTIONS//======================

  return (
    <>
      {/* ===========MODAL DELETE================*/}
      <DeleteModal
        CloseDeleteModal={CloseDeleteModal}
        openDelete={openDelete}
        deleteActin={deleteActin}
      />
      {/* ===========//MODAL DELETE//================*/}
      {/* ===========MODAL Edit================*/}
      <EditModal
        CloseEditModal={CloseEditModal}
        openEdit={openEdit}
        editAction={editAction}
      />
      {/* ===========//MODAL Edit//================*/}
      {/* ===========MAIN COMPONENT================*/}

      <Container maxWidth="md" sx={styleContainer}>
        <Stack sx={{ bgcolor: "#d1c1c1", width: "100%", borderRadius: 2 }}>
          <Header />
          <ToggleButtons
            allCategory={allCategory}
            completedCategory={completedCategory}
            incompletedCategory={incompletedCategory}
          />

          <Stack sx={{ padding: "16px" }}>
            <Stack direction={"row"} spacing={2}>
              <TextField
                label="Task Name"
                variant="outlined"
                sx={{ flexGrow: 1 }}
                value={taskTitle}
                onChange={(el) => {
                  setTaskTitle(el.target.value);
                }}
              />
              <Button
                variant="contained"
                onClick={addNewTask}
                disabled={taskTitle.length ? false : true}
                sx={{ padding: "0 2rem" }}
              >
                Add
              </Button>
            </Stack>

            <Stack sx={styleStackToDos}>{toDosJsx}</Stack>
          </Stack>
        </Stack>
      </Container>
      {/* ===========//MAIN COMPONENT//================*/}
    </>
  );
}
// =================//TODOAPP COMPONENT//==================

// ====================================================
function Header() {
  return <h1 style={{ textAlign: "center" }}>To Do App</h1>;
}

// ============STYLES TO DOS CONPONENT===============
const styleContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
};

const styleStackToDos = {
  gap: 2,
  marginTop: "16px",
  bgcolor: "white",
  padding: 2,
  borderRadius: 2,
  maxHeight: "50vh",
  overflow: "auto",
};

function ToggleButtons({
  allCategory,
  completedCategory,
  incompletedCategory,
}) {
  const [alignment, setAlignment] = useState("all");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      sx={{ justifyContent: "center", margin: "1rem 0" }}
    >
      <ToggleButton value="all" onClick={allCategory}>
        ALL
      </ToggleButton>
      <ToggleButton value="completed" onClick={completedCategory}>
        Completed
      </ToggleButton>
      <ToggleButton value="incomplete" onClick={incompletedCategory}>
        Incomplete
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
