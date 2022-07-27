import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsForm from "../components/News/NewsForm";
import AuthorizationService from "../services/authorization";
// Components
import TableComponent from "../components/TableComponent";
import LoaderSpinner from "../components/LoaderSpinner";
import NewsDeleteConfirmation from "../components/News/NewsDeleteConfirmation";

// Modals
import Warning from "../modals/Warning";

// Services: alerts
import { confirmation, error } from "../services/alerts";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
// Utils: newsData

const tableHeaders = ["Titulo", "Fecha", "Imagen", "Acciones"];
const BackofficeNewsPage = () => {
  // arrs
  const [news, setNews] = useState([]);
  const [toEditNew, setToEditNew] = useState(null);
  const [editingNews, setEditingNews] = useState(false);
  const [deleting, setDeleting] = useState(null);

  // strs
  const [idDelete, setIdDelete] = useState(String);
  const [idEdit, setIdEdit] = useState(String);

  // bools
  const [spinner, setSpinner] = useState(Boolean);
  const [warning, setWarning] = useState(Boolean);
  const [fields, setFields] = useState(Boolean);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_BASE_URL + "/news")
      .then((res) => setNews(res.data))
      .catch((err) => console.log(err));
  }, [editingNews, deleting]);

  if (deleting)
    return (
      <NewsDeleteConfirmation
        _id={deleting}
        setDeleting={setDeleting}
        data={news}
        setNews={setNews}
        url="/news"
      ></NewsDeleteConfirmation>
    );

  const onDelete = (_id) => {
    setDeleting(_id);
  };

  const onEdit = (data) => {
    setEditingNews(true);
    setToEditNew(data);
  };

  return (
    <>
      {spinner && <LoaderSpinner />}
      {warning && <Warning modalWarning={onDelete} cancel={onDelete} />}
      {editingNews ? (
        <NewsForm values={toEditNew} setEditingNews={setEditingNews} />
      ) : (
        <>
          <TableComponent
            data={news}
            tableHeaders={tableHeaders}
            onEdit={onEdit}
            onDelete={onDelete}
          />
          <Link to='/backoffice/add-new'>
            <Button colorScheme="red" ml="2vw" mb="15vh">
              ¡Agregar novedad!
            </Button>
          </Link>
        </>
      )}
    </>
  );
};
export default BackofficeNewsPage;
