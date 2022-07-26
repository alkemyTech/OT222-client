import React, { useState, useEffect } from "react";
// Components
import TableComponent from "../components/TableComponent";
import LoaderSpinner from "../components/LoaderSpinner";
// API
import API from "../API";
import NewsDeleteConfirmation from "../components/News/NewsDeleteConfirmation";
import CategoriesEditing from "../components/Categories/CategoriesEditing";
const BackofficesCategoriesPage = () => {
  // arrs
  const [categoriesName, setCategoriesName] = useState(Array);
  // strs
  const [errorMessage, setErrorMessage] = useState(String);

  // bools
  const [spinner, setSpinner] = useState(Boolean);
  const [error, setError] = useState(Boolean);

  const [editing, setEditing] = useState(false)
  const [editingData, setEditingData] = useState(null)
  const [id, setId] = useState()
  useEffect(() => {
    const getCategories = async () => {
      try {
        setSpinner(true);
        setError(false);
        const { categoriesName } = await API.getCategories();
        if (!categoriesName) return setError(true);
        setSpinner(false);
        setCategoriesName(categoriesName);
      } catch (err) {
        setErrorMessage(err.message);
        setError(true);
      }
    };
    getCategories();
  }, []);

  const onEdit = (data) => {
    setEditingData(data)
    setEditing(true)
    setId(data)
  }

  const onDelete = () => {
    
  }

  if (editing)
    return (
      <>
        <CategoriesEditing setEditingData={setEditingData} setEditing={setEditing} _id={id} data={categoriesName} setCategoriesName={setCategoriesName}/>
      </>
    )

  return (
    <>
      {spinner && <LoaderSpinner />}
      {error && <p>{errorMessage}</p>}
      <TableComponent
        tableHeaders={["Categories"]}
        data={categoriesName}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </>
  );
};
export default BackofficesCategoriesPage;
