import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import CheckIcon from '@mui/icons-material/Check';
import CreateIcon from '@mui/icons-material/Create';
import { useContext } from "react";
import MyContext from "./contect";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {useState} from 'react';
import TextField from '@mui/material/TextField';

import "./App.css";




function Todo({todos}) {


   const {todosList , setTodosList} = useContext(MyContext);

function AddEditTitle(e){
  let newTodo = todosList.map(t=>{
    if(t.id === todos.id){
      return {...t , title: e.target.value}
    } else {
      return t;
    }
  })
  setTodosList(newTodo)
  localStorage.setItem("items",JSON.stringify(newTodo))
}





let [open , setOpen] = useState(false);
let [Edit , setEdit] = useState(false);



  function handleStuts(){
    let newTodos = todosList.map(t=>{
      if(t.id === todos.id){
        return {...t , completed: !t.completed}
      } else {
        return t;
      }   
    })
    localStorage.setItem("items",JSON.stringify(newTodos))
    setTodosList(newTodos);
  }

  function handleDelete(){
    let newTodo = todosList.filter(to=>{
      return to.id !== todos.id
    })
     
    
    setTodosList(newTodo)
    localStorage.setItem("items",JSON.stringify(newTodo)) 
  }

  function AddEditDetails(e){
    let newTodo = todosList.map(t=>{
      if(t.id=== todos.id){
        return {...t ,destils:e.target.value}
      }else{
        return t
      }
    })
    setTodosList(newTodo)
    localStorage.setItem("items",JSON.stringify(newTodo))
  }





    return(
      <  >
          <Dialog
          style={{direction:"rtl"}}
        open={open}
        onClose={()=>{setOpen(false)}}
       
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">
          {`هل انت متاكد من حذف  ${todos.title} ؟`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            عند الضغط علي موافق سيتم حذف المهمه نهائيا من قائمه المهام ولن تتمكن من استرجاعها مره اخري
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{handleDelete() 
            setOpen(false) }} >
            موفق  علي الحذف
          </Button>
          <Button  onClick={()=>{setOpen(false)} } >اغلاق </Button>
        </DialogActions>
      </Dialog>


          <Dialog style={{direction:"rtl" }}
         
        open={Edit}
        onClose={()=>{setEdit(false)}}
       
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
  
     
            <DialogTitle id="alert-dialog-title">
          {`تعديل  المهمه  ؟`}
        </DialogTitle>
        <DialogContent id="alert-dialog-title">
                <TextField value={todos.title} onChange={(e)=>{AddEditTitle(e)}} style={{width:"100%"}} id="standard-basic" label="العنوان" variant="standard" />

        </DialogContent>

        <DialogContent>
                <TextField value={todos.destils} onChange={(e)=>{AddEditDetails(e)}}  style={{width:"100%"}} id="standard-basic" label="التفاصيل" variant="standard" />
        </DialogContent>

        <DialogActions>
          <Button  onClick={()=>{setEdit(false)}}>
            تعديل
          </Button>
          <Button  onClick={()=>{
            setEdit(false)}  } >الغاء </Button>
        </DialogActions>
         
      </Dialog>





        <Card  className='cardName' sx={{ minWidth:  275, backgroundColor:"#283593" ,color:"white",marginTop:5 }} >
      <CardContent >
        <Grid container style= {{display:"flex",justifyContent:"space-between"}} spacing={2}>
        <Grid  xs={8}  >
                <Typography variant="h5" sx={{textAlign:"right",textDecoration: todos.completed ? "line-through":"none" }} > {todos.title}  </Typography>
                <Typography variant="div" sx={{textAlign:"right"}}> {todos.destils}  </Typography>
        </Grid>
        <Grid   xs={4}    sx={{display: "flex",alignItems: "center",gap: 0.5,}} >
        <IconButton onClick ={handleStuts} className='efectebutom' style = {{
            backgroundColor: todos.completed?  "#8bc34a" :"white " ,
           color: todos.completed?  "white":"#8bc34a",
           border: todos.completed?  "2px solid white":"2px solid #8bc34a"
           
           }}>
        <CheckIcon  />
      </IconButton>

        <IconButton className='efectebutom' style = {{ backgroundColor:"white" ,color:"#1768aa",border:"2px solid #1768aa"}} onClick={()=>{
          setEdit(true)
        }}>
        <CreateIcon  />
      </IconButton>

        <IconButton  className='efectebutom'  style = {{ backgroundColor:"white" ,color:"#b23c17",border:"2px solid #b23c17"}} >
        <DeleteIcon onClick = {()=>{
          setOpen(true) 
        }} />
      </IconButton>

        </Grid>
    
      </Grid>


      </CardContent>
    </Card>  

      </>
    )




}

export default Todo;