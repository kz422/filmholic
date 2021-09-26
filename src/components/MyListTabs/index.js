import React,{ useState, useEffect} from 'react'

import { POSTER_SIZE, IMAGE_BASE_URL } from '../../config';

import { db } from '../../Firebase';

import { useAuthContext } from "../../AuthContext"

import NoImage from '../../images/no_image.png';
import Grid from '../Grid';
import Thumb from '../Thumb';
import Spinner from '../Spinner';

import { AiOutlineSortAscending } from 'react-icons/ai'
import { IoCloseCircleSharp } from 'react-icons/io5'

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { IconButton } from '@material-ui/core';
import { Fab } from '@material-ui/core';

import './MyListTabs.css'
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    // background: '#fff',
    minWidth: 120,
    color: '#fff'
  },
  select: {
    // color: '#fff'
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(6),
    right: theme.spacing(3),
  },
}));

export const MyListTabs = ({ colName, header }) => {
  
  const { userId } = useParams()

  const [list, setList] = useState([])
  const [loading, isLoading] = useState(true)

  const classes = useStyles();
  const [sort, setSort] = useState('title')
  const [open, setOpen] = useState(false)
  const [sortView, setSortView] = useState(false)

  const { user } = useAuthContext()

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleSortView = () => {
    sortView ?
    setSortView(false)
    : setSortView(true)
  }

  const isDesc = () => {
    if(sort === 'voteAve' && 'popularity') {
      return 'desc'
    } else {
      return 'asc'
    }
  }

  const getData = async () => {
    if(userId) {
      const colRef = db.collection('users').doc(`${userId}`).collection(`${colName}`).orderBy(`${sort}`, isDesc())
      colRef.onSnapshot((querySnapshot) => {
        const movies = []
        querySnapshot.forEach((doc)=>{
          movies.push(doc.data())
        })
        setList(movies)
      })
    } else {
      const colRef = db.collection('users').doc(`${user?.uid}`).collection(`${colName}`).orderBy(`${sort}`, isDesc())
      colRef.onSnapshot((querySnapshot) => {
        const movies = []
        querySnapshot.forEach((doc)=>{
          movies.push(doc.data())
        })
        setList(movies)
      })

    }
  }

  useEffect(() => {
    getData()
    isLoading(false)
  }, [])

  return (
    <div className='container'>
      <Grid header={header} length={` - ${list.length}本`}>
        {list.map(movie => (
          <Thumb 
            key={movie.id}
            clickable
            image={
              movie.poster
                ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster 
                : NoImage
            }
            movieId={movie.id}
            title={movie?.title}
          />
          // <div key={movie.id}>{movie.title}</div>
        ))}
      </Grid>
      {list.length === 0 && <p style={{ textAlign: 'center' }}>件数 : 0</p>}
      {loading && <Spinner />}
      {sortView ? 
        <div className="sort">
          <FormControl className={classes.formControl}>
            <IconButton 
              onClick={handleSortView}
              size="small" 
              style={{position: 'absolute', top: '-10px', right: '-10px'}}>
              <IoCloseCircleSharp fontSize="inherit" />
            </IconButton>
            <InputLabel id="demo-controlled-open-select-label" className={classes.select}>並び替え</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={sort}
              onChange={handleChange}
              className={classes.select}
            >
              <MenuItem value={'title'}>タイトル</MenuItem>
              <MenuItem value={'release'}>公開日順</MenuItem>
              <MenuItem value={'voteAve'}>評価順</MenuItem>
            </Select>
            <Button size="small" variant="contained" onClick={getData}>実行</Button>
          </FormControl>
        </div>
        : <Fab className={classes.fab} onClick={handleSortView}>
            <AiOutlineSortAscending color="navy" size="24px"/>
          </Fab>
      }
    </div>
  )
}
