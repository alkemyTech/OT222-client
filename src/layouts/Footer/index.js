import React from "react"
// Utils: footer content
import footerContent from "../../utils/footerContent"
// Styles: chacra ui
import { Box, Flex, Grid, Text, Image, Link, Button } from "@chakra-ui/react"
const Footer = () => {
  return (
    <Box
      p={["10px", "10px"]}
      bgColor="#f8f9fa"
      position="relative"
      bottom={0}
      w="100%"
    >
      <Flex direction="column" maxW="1280px" m={["0", "auto"]}>
        <Grid templateColumns="repeat(auto-fill, minmax(185px, 1fr))">
          {footerContent.map(({ _id, title, logo, dir, socialMedia }) => {
            return (
              <Flex key={_id} direction="column" textAlign="left" ml="50px">
                <Text fontSize="18px" color="black" mb="10px" fontWeight="bold">
                  {title}
                </Text>
                {logo && <Image src={logo} alt={_id} />}
                {dir && (
                  <Text>
                    <Link
                      href="/"
                      mb="5px"
                      fontSize="16px"
                      _hover={{ color: "green", transition: "200ms ease-in" }}
                    >
                      {dir}
                    </Link>
                  </Text>
                )}
                {socialMedia &&
                  socialMedia.map(({ _id, media, href }) => {
                    return (
                      <Text key={_id}>
                        <Button m="5px" colorScheme={media}>
                          <Link href={href}>{media}</Link>
                        </Button>
                      </Text>
                    )
                  })}
              </Flex>
            )
          })}
        </Grid>
      </Flex>
    </Box>
  )
}

export default Footer
