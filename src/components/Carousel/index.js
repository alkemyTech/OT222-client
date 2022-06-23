import React, { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
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
    <div className="carousel">
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
                <motion.h1>{text}</motion.h1>
                <img src={imageUrl} alt="" />
              </motion.div>
            )
          })}
        </motion.div>
      </motion.div>
    </div>
  )
}
export default Carousel
