import React, { useState } from "react"
// Components
import TableComponent from "../components/TableComponent"
import LoaderSpinner from "../components/LoaderSpinner"
// Modals
import Warning from "../modals/Warning"
import Fields from "../modals/Fields"
// Services: alerts
import { confirmation, error } from "../Services/alerts"
// Utils: newsData
import newsData from "../utils/newsData"
const tableHeaders = ["Title", "Date", "Image", "Actions"]
const BackofficeNewsPage = () => {
  // arrs
  const [news, setNews] = useState([...newsData])
  const [toEeditNews, setToEditNews] = useState(Array)
  const [editingNews, setEditingNews] = useState([...news])

  // strs
  const [idDelete, setIdDelete] = useState(String)
  const [idEdit, setIdEdit] = useState(String)

  // bools
  const [spinner, setSpinner] = useState(Boolean)
  const [warning, setWarning] = useState(Boolean)
  const [fields, setFields] = useState(Boolean)

  const editNews = () => {
    try {
      setFields(true)
      setNews(editingNews)
      confirmation("Success", "News edited successfully")
      setFields(false)
    } catch (err) {
      error("Error at editing news", err)
      setSpinner(false)
    }
  }

  const deleteNews = () => {
    try {
      setSpinner(true)
      setWarning(true)
      setNews(news.filter(({ _id }) => _id !== idDelete))
      confirmation("Success", "News deleted successfully")
      setSpinner(false)
      setWarning(false)
    } catch (err) {
      error("Error at deleting news", err)
      setSpinner(false)
    }
  }

  const onDelete = (_id) => {
    setWarning(!warning)
    if (!_id) return
    setIdDelete(_id)
  }

  const onEdit = (_id) => {
    setFields(!fields)
    if (!_id) return
    setIdEdit(_id)
    const getNews = news.filter(({ _id: id }) => id === _id)
    setToEditNews(getNews)
    setEditingNews(news)
  }

  const handleInput = (e) => {
    const { name, value } = e.target
    setEditingNews(
      editingNews.map((news) => {
        if (news._id === idEdit) {
          return {
            ...news,
            [name]: value,
          }
        }
        return news
      })
    )
  }

  return (
    <>
      {spinner && <LoaderSpinner />}
      {warning && (
        <Warning
          modalWarning={onDelete}
          cancel={onDelete}
          pursue={deleteNews}
        />
      )}
      {fields && (
        <Fields
          modalField={onEdit}
          cancel={onEdit}
          pursue={editNews}
          editFields={toEeditNews}
          onChange={handleInput}
        />
      )}
      <TableComponent
        data={news}
        tableHeaders={tableHeaders}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </>
  )
}
export default BackofficeNewsPage
