import React, { useState, useEffect } from 'react'
import AddTodo from '_molecules/AddTodo'
import TodoList from '_organisms/TodoList'
import { useDispatch, useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Col, Row } from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import img from '../../../assets/images/restaurant.jpeg'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import SearchBar from 'material-ui-search-bar'

import { push } from 'connected-react-router'
import R from 'ramda'

const apiURL = process.env.API_URL || ''

const api = axios.create({
  baseURL: apiURL,
})

export default function HomePage() {
  const dispatch = useDispatch()
  const { user } = useSelector(R.pick(['user']))
  console.log('Home user ', user)

  function getMenu(e) {
    // this.sortOn(e.currentTarget.getAttribute('data-column'));
    console.log('KEY ', e)
    localStorage.setItem('id', e)
    localStorage.setItem('uid', user.id)
    dispatch(push(`/menuList/${e}`))
    
  }
  const [restaurants, setRestaurants] = useState([{}])
  const [searched, setSearched] = ''

  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  useEffect(() => {
    console.log('useEffect called')
    const getRestaurants = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/res/getRestaurants`
        )
        console.log('response', res)
        setRestaurants(res.data.restaurants)
      } catch (e) {
        console.log(e)
      }
    }
    getRestaurants()
  }, [])

  console.log('resss ', restaurants)
  console.log('res  ', restaurants.length)
  console.log('res id ', restaurants[0]._id)

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(20),
      paddingTop: 40,
      justifyContent: 'space-around',
    },
    image1: {
      height: 200,
      width: 350,
      borderRadius: 8,
    },
    image3: {
      height: 154,
      width: 154,
      borderRadius: 8,
    },
    image2: {
      height: 250,
      width: 350,
    },
    image4: {
      height: 330,
      width: 280,
    },
    span1: {
      fontFamily:
        'DD-TTNorms, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      fontSize: '32px',
      marginLeft: '11%',
      fontWeight: '700',
      lineHeight: '40px',
      letterSpacing: '-0.04ch',
      textTransform: 'none',
      color: 'rgb(25, 25, 25)',
      fontVariantLigatures: 'no-common-ligatures',
      display: 'block',
      marginBottom: '0',
    },
  }))
  const classes = useStyles()
  const handleSearch = (searchedVal) => {
    console.log(searchedVal)
    // const filtered =data.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.includes(searchedVal)))};

    //setRows(filteredRows);
  }
  return (
    <div>
      <SearchBar
        value={searched}
        onChange={(searchVal) => handleSearch(searchVal)}
        onRequestSearch={handleSearch}
        style={{
          margin: '0 auto',
          maxWidth: 800,
        }}
      />
      <br></br>
      <div>
        <span className={classes.span1}>Local Favorites</span>
      </div>
      <div className={classes.root}>
        <Grid
          container
          spacing={2}
          direction='row'
          justify='flex-start'
          alignItems='center'
        >
          {restaurants.length > 1 &&
            restaurants.length &&
            restaurants.map((elem) => (
              // {console.log('ELE ', elem)}
              // {console.log('Index of elem ', elem._id)}
              <Grid
                style={{ margin: '0 auto', padding: '0' }}
                item
                item
                xs={12}
                sm={6}
                md={4}
                key={elem._id}
              >
                <Card style={{ boxShadow: 'none' }} className={classes.image2}>
                  <CardActionArea onClick={() => getMenu(elem._id)}>
                    <CardMedia
                      component='img'
                      alt='Restaurant Name'
                      className={classes.image1}
                      image={img}
                      title='Restaurant Name'
                    />
                    <CardContent
                      style={{
                        paddingLeft: '0',
                        paddingTop: '2px',
                        paddingBottom: '0',
                      }}
                    >
                      <Typography
                        style={{
                          fontFamily:
                            'DD-TTNorms, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                          fontSize: '14px',
                          fontWeight: '700',
                          lineHeight: '20px',
                          letterSpacing: '-0.04ch',
                          textTransform: 'none',
                          color: 'rgb(25, 25, 25)',
                          fontVariantLigatures: 'no-common-ligatures',
                          display: 'block',
                          marginBottom: '0',
                        }}
                        gutterBottom
                        variant='h5'
                        component='h2'
                      >
                        {elem.restaurantName}
                      </Typography>
                      <Typography
                        variant='body2'
                        component='p'
                        style={{
                          fontFamily:
                            'DD-TTNorms, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                          fontSize: '14px',
                          fontWeight: '500',
                          lineHeight: '20px',
                          letterSpacing: '-0.04ch',
                          textTransform: 'none',
                          color: 'rgb(118, 118, 118)',
                          fontVariantLigatures: 'no-common-ligatures',
                          display: 'block',
                        }}
                      >
                        {elem.location}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
        </Grid>
        <Row>
          <Col>
            <Card style={{ boxShadow: 'none' }} className={classes.image4}>
              <CardActionArea>
                <CardMedia
                  component='img'
                  alt='Restaurant Name'
                  className={classes.image3}
                  image={
                    'https://cdn.doordash.com/media/consumer/home/landing/new/ScootScoot.svg'
                  }
                ></CardMedia>
              </CardActionArea>
            </Card>
          </Col>
          <Col>
            <Card style={{ boxShadow: 'none' }} className={classes.image4}>
              <CardActionArea>
                <CardMedia
                  component='img'
                  alt='Restaurant Name'
                  className={classes.image3}
                  image={
                    'https://cdn.doordash.com/media/consumer/home/landing/new/Storefront.svg'
                  }
                ></CardMedia>
              </CardActionArea>
            </Card>
          </Col>
          <Col>
            <Card style={{ boxShadow: 'none' }} className={classes.image4}>
              <CardActionArea>
                <CardMedia
                  component='img'
                  alt='Restaurant Name'
                  className={classes.image3}
                  image={
                    'https://cdn.doordash.com/media/consumer/home/landing/new/iphone.svg'
                  }
                ></CardMedia>
              </CardActionArea>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}
