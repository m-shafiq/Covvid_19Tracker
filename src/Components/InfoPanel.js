import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth:1000,
    margin:"0 auto",
    marginTop:50
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  title: {
      color: '#3f51bf',
      textTransform:"uppercase",
  },
}));

export default function InfoPanel() {

    const [globalData,setGlobaldata] =useState ({});
    useEffect (()=>{
      async function getData(){
          const response=await fetch("https://api.thevirustracker.com/free-api?global=stats");
  
          let data = await response.json();
        
  
          delete data.results[0].source;
          setGlobaldata(data.results[0]);
            //--to check data on console...
            console.log(data);
  
      }
      getData();
  
    },[])
    
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
          {
          Object.keys(globalData).map((key,index)=>{
              return (

                <Grid item xs={12} sm={4} key={index}>
                <Paper className={classes.paper} elevation={3} >
                        <h3 className={classes.title}>{ key.replace(/_/g,' ' )}</h3>
                        <h3>{globalData[key]}</h3>
                
                </Paper>
                </Grid>
              )

          }
          
          
          )
          }
       
        
      </Grid>
    </div>
  );
}
