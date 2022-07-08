import React from 'react'
import SignUpForm from '../components/SignUpForm'
import { Image, Flex, Grid, useMediaQuery } from '@chakra-ui/react'
import hands from '../assets/hands.png'

const LoginPage = () => {
    const [isMobile] = useMediaQuery('(min-width: 768px)')

    return (
        <Grid templateColumns={isMobile ? "1fr 1fr" : "100%"} margin={isMobile ? "none" : "1rem"}>
            <Image src={hands} height="85vh" width="100%" objectFit="cover" display={isMobile ? "block" : "none"} />
            <Flex justifyContent="center" alignItems="center" >
                <SignUpForm />
            </Flex>
        </Grid >
    )
}

export default LoginPage