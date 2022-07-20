import React, { useState, useEffect } from "react"
// Components
import TableComponent from "../components/TableComponent"
import LoaderSpinner from "../components/LoaderSpinner"
// API
import API from "../API"
const BackofficesCategoriesPage = () => {
  // arrs
  const [categoriesName, setCategoriesName] = useState(Array)
  // strs
  const [errorMessage, setErrorMessage] = useState(String)

  // bools
  const [spinner, setSpinner] = useState(Boolean)
  const [error, setError] = useState(Boolean)

  useEffect(() => {
    const getCategories = async () => {
      try {
        setSpinner(true)
        setError(false)
        const { categoriesName } = await API.getCategories()
        if (!categoriesName) return setError(true)
        setSpinner(false)
        setCategoriesName(categoriesName)
      } catch (err) {
        setErrorMessage(err.message)
        setError(true)
      }
    }
    getCategories()
  }, [])

  return (
    <>
      {spinner && <LoaderSpinner />}
      {error && <p>{errorMessage}</p>}
      <TableComponent tableHeaders={["Categories"]} data={categoriesName} />
    </>
  )
}
export default BackofficesCategoriesPage
