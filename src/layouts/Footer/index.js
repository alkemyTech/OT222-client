import React, { useEffect, useState } from "react"
// API
import API from "../../API"
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
// Utils: footerContent: logo data, itemsPages, icons
import { logoData, itemsPages, icons } from "../../utils/footerContent"
const Footer = () => {
  const [urlMedia, seturlMedia] = useState([])
  useEffect(() => {
    const getSocialMedia = async () => {
      try {
        const socialMedia = await API.getSocialMedia()
        if (!socialMedia) return
        seturlMedia(socialMedia)
      } catch (error) {
        console.log(error)
      }
    }
    getSocialMedia()
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
              <Link key={index} href={SocialMedium?.url}>
                {icons[index].icon}
              </Link>
            ))}
          </HStack>
          <Text fontSize={"15px"}>2022 by Alkemy. All rights reserved</Text>
        </Container>
      </Box>
    </Box>
  )
}
export default Footer
