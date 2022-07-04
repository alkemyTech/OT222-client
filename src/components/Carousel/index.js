import React, { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Box, Image, Text } from "@chakra-ui/react"
// utils carousel data
import carouselData from "../../utils/carouselData"
// Styles
import "./Carousel.styles.css"
// Carousel component
const Carousel = () => {
  const [width, setWidth] = useState(Number)
  const carousel = useRef()
  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
  }, [])

  return (
    <Box m={["20px", "40px"]}>
      <Box cursor="grab" overflow="hidden">
        <motion.div
          ref={carousel}
          className="carousel-warapper"
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            className="inner-carousel"
          >
            {carouselData.map(({ _id, imageUrl, text }) => {
              return (
                <motion.div key={_id} className="item">
                  <Text>{text}</Text>
                  <Image
                    src={imageUrl}
                    alt={_id}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    borderRadius="20px"
                    pointerEvents="none"
                  />
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </Box>
    </Box>
  )
}
export default Carousel
