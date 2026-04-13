import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Todo from './todo';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useContext, useEffect } from 'react';
import MyContext from "./contect";
import { v4 as uuidv4 } from 'uuid';

export default function TodoList() {

  const { todosList, setTodosList } = useContext(MyContext);

  let [showStatus, setShowStatus] = useState("all");
  const [Title, setTitle] = useState("");

  useEffect(() => {
    let localTodos = JSON.parse(localStorage.getItem("items")) || [];
    setTodosList(localTodos);
  }, []);

  let completedTodos = todosList.filter(t => t.completed);
  let notCompletedTodos = todosList.filter(t => !t.completed);

  let newCompleted = todosList;

  if (showStatus === "completed") {
    newCompleted = completedTodos;
  } else if (showStatus === "notCompleted") {
    newCompleted = notCompletedTodos;
  }

  function handleFunction( newValue) {
      setShowStatus(newValue.target.value);
  }

  const todojsx = newCompleted.map(t => {
    return <Todo key={t.id} todos={t} />;
  });

  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>

          <Typography variant="h3" style={{ fontWeight: "bold", textAlign: "center" }}>
            مهامي
          </Typography>

          <Divider style={{ width: "100%" }} />

          <ToggleButtonGroup
            style={{ marginTop: "30px", display: "flex", justifyContent: "center" }}
            color="primary"
            value={showStatus}
            exclusive   
            onChange={handleFunction}
          >
            <ToggleButton value="all">الكل</ToggleButton>
            <ToggleButton value="completed">منجز</ToggleButton>
            <ToggleButton value="notCompleted">غير منجز</ToggleButton>
          </ToggleButtonGroup>

          <div style={{
            backgroundColor: "rgba(28, 9, 237, 0.8)",
            height: "250px",
            overflowY: "scroll",
            padding: "15px",
            borderRadius: "10px",
            marginTop: "10px"
          }}>
            {todojsx}
          </div>

          <Grid container spacing={2} style={{ marginTop: "30px" }}>

            <Grid xs={8}  style={{ Width: "100%" }}>
              <TextField
                value={Title}
                label="عنوان المهمه"
                  fullWidth
                 size="medium"

                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </Grid>

            <Grid xs={4}>
              <Button
              disabled={!Title.trim()}
                onClick={() => {
            
                  const newTodo = {
                    id: uuidv4(),
                    title: Title,
                    destils: "وصف المهمه الجديده",
                    completed: false,
                  };

                  let updatedTodosList = [...todosList, newTodo];

                  localStorage.setItem("items", JSON.stringify(updatedTodosList));
                  setTodosList(updatedTodosList);
                  setTitle("");
                }}
                style={{ width: "100px", height: "100%" }}
                variant="contained"
              >
                اضافه
              </Button>
            </Grid>

          </Grid>

        </CardContent>
      </Card>
    </Container>
  );
}