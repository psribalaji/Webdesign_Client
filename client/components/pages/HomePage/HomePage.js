import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import R from 'ramda'
import SearchBar from 'material-ui-search-bar'
import home from '../../../styles/home.scss'
import Section from 'react-bulma-companion/lib/Section'
import Container from 'react-bulma-companion/lib/Container'
import Title from 'react-bulma-companion/lib/Title'

export default function HomePage() {
  const dispatch = useDispatch()
  const { user } = useSelector(R.pick(['user']))

  useEffect(() => {
    if (R.isEmpty(user)) {
      dispatch(push('/login'))
    }
  }, [])

  return (
    <div className='home-page page'>
      <>
        <img src='https://i.ibb.co/wzX4mzm/food-name.jpg' className='photo' />
      </>
    </div>
  )
}
