import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Box, Flex, Text } from "@chakra-ui/react"
// Utils: activies
import activitiesData from "../utils/activitiesData"
const ActivitiesPage = () => {
  const [activityDeatils, setActivityDetails] = useState(Array)
  const [error, setError] = useState(Boolean)

  const { activityId } = useParams()

  const getActivityDetails = (id) => {
    setError(false)
    const response = activitiesData.find(({ _id }) => _id === id)
    if (!response) {
      setError(true)
      return
    }
    return response
  }

  useEffect(() => {
    setActivityDetails(getActivityDetails(activityId))
  }, [activityId])

  if (!activityId) return <div>Activities Page</div>

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      p={4}
      border="1px solid #ccc"
      borderRadius={4}
      boxShadow="0px 0px 10px #ccc"
      width="100%"
      maxWidth="600px"
      margin="0 auto"
    >
      {error ? (
        <Box>
          <Text>Activity not found</Text>
          <Text>Please check the URL and try again</Text>
        </Box>
      ) : (
        <Box>
          <Text>{activityDeatils.name}</Text>
          <Text>{activityDeatils.details}</Text>
        </Box>
      )}
    </Flex>
  )
}

export default ActivitiesPage
