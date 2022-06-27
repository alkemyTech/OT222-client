import React from 'react'
import { Box, Button, Grid, Text } from '@chakra-ui/react'
import { login, logout, handleUser, selectUser, selectUserStatus } from '../features/user/userSlice'
import { useSelector, useDispatch } from 'react-redux';

const HomePage = () => {
  const user = useSelector(selectUser)
  const isLogged = useSelector(selectUserStatus)
  const dispatch = useDispatch()
  console.log(user)
  console.log(isLogged)
  return (
    <>
      HomePage
      <Text>{user === true ? 'true' : 'false'}</Text>
      <Button onClick={() => dispatch(login())}>login</Button>
      <Button onClick={() => dispatch(logout())}>logout</Button>
      <Button onClick={() => dispatch(handleUser({
        name: 'lucho',
        email: 'lasdijawod'
      }))}>setUser</Button>
    </>
  )
}

export default HomePage