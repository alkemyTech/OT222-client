import React from "react"
// Components
import TableComponent from "../components/TableComponent"
const tableHeaders = ["Name", "Actions"]
const BackofficeActivitiesPage = () => {
  return (
    <>
      <TableComponent tableHeaders={tableHeaders} />
    </>
  )
}
export default BackofficeActivitiesPage
