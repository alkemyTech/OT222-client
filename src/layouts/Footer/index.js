import React, { useEffect, useState } from "react"
import axios from "axios"
import { FaFacebookSquare } from "react-icons/fa"
import { AiFillLinkedin } from "react-icons/ai"
import { BsInstagram } from "react-icons/bs"
import {
  Box,
  Text,
  Image,
  Link,
  HStack,
  useColorModeValue,
  Container,
  Stack,
} from "@chakra-ui/react"
// Utils: footerContent: logo data and itemsPages
import { logoData, itemsPages } from "../../utils/footerContent"
const Footer = () => {
  const [urlMedia, seturlMedia] = useState([])
  const icons = [
    { name: "Facebook", icon: <FaFacebookSquare /> },
    { name: "Linkedin", icon: <AiFillLinkedin /> },
    { name: "Instagram", icon: <BsInstagram /> },
  ]

  const fetchUrlMedia = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/organizations/public`)
      .then(function (response) {
        seturlMedia(response.data.slice(0, 3))
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchUrlMedia()
  }, [])

  return (
    <Box
      bg={useColorModeValue("gray.400", "gray.400")}
      color={useColorModeValue("black", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        spacing={1}
        justify={"center"}
        align={"center"}
      >
        <Image src={logoData.logo} alt={logoData.alt} />

        <Stack direction={{ base: "column", md: "row" }} spacing={6}>
          {itemsPages.map(({ _id, link, name }) => (
            <Link key={_id} href={link}>
              {name}
            </Link>
          ))}
        </Stack>
      </Container>
      <Box
        borderTopWidth={2}
        borderStyle={"solid"}
        borderColor={useColorModeValue("black")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <HStack
            _hover={{ cursor: "pointer" }}
            color="white"
            fontSize={"35px"}
            direction={"row"}
            spacing={6}
          >
            {urlMedia.map(({ SocialMedium }, index) => (
              <>
                <Link key={index} href={SocialMedium.url}>
                  {icons[index].icon}
                </Link>
              </>
            ))}
          </HStack>
          <Text fontSize={"15px"}>2022 by Alkemy. All rights reserved</Text>
        </Container>
      </Box>
    </Box>
  )
}

export default Footer
