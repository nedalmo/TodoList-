import TodoList from "./TodoList";
import { createTheme ,ThemeProvider} from '@mui/material/styles';
import {useState} from "react";
import MyContext from "./contect";
import { v4 as uuidv4 } from 'uuid';

const todos = [
  {
    id: uuidv4(),
    title: "المهمه الاولى", 
    destils: "وصف المهمه الاولى",
    completed: false,
  },
  {
    id: uuidv4(),
    title: "المهمه الثانيه", 
    destils: "وصف المهمه الثانيه",  
    completed: false,
  },
  { 
    id: uuidv4(),
    title: "المهمه الثالثه",
    destils: "وصف المهمه الثالثه",
    completed: false,
  },

];
function App() {

  const [todosList , setTodosList] = useState(todos);
const theme = createTheme({
    typography: {
      fontFamily: "Alexandria",
    },
});

  return (
    <ThemeProvider theme={theme} >
    <div className="App" style={
      {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#2f2b2b',
          height: '100vh', 
          direction: 'rtl',
          overflowY: 'scroll',
        }
          }>   
      <MyContext.Provider value={{todosList , setTodosList}} >
            <TodoList  />
      </MyContext.Provider>
  
    </div>
    </ThemeProvider>
  );
}


export default App;