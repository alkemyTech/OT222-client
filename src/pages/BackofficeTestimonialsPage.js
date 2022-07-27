import React, { useState } from 'react';
// Components
import TableComponent from '../components/TableComponent';
import LoaderSpinner from '../components/LoaderSpinner';

// Modals
import Warning from '../modals/Warning';
import Fields from '../modals/Fields';
// Services: alerts
import { confirmation, error } from '../services/alerts';
// Utils: newsData
import testimonialsData from '../utils/testimonialsData';
const tableHeaders = ['User', 'Actions'];
const BackofficeTestimonialsPage = () => {
  // arrs
  const [testimonials, setTestimonials] = useState([...testimonialsData]);
  const [toEditTestimonials, setToEditTestimonials] = useState(Array);
  const [editingTestimonials, setEditingTestimonials] = useState([
    ...testimonials,
  ]);

  // strs
  const [idDelete, setIdDelete] = useState(String);
  const [idEdit, setIdEdit] = useState(String);

  // bools
  const [spinner, setSpinner] = useState(Boolean);
  const [warning, setWarning] = useState(Boolean);
  const [fields, setFields] = useState(Boolean);

  const editTestimonials = () => {
    try {
      setFields(true);
      setTestimonials(editingTestimonials);
      confirmation('Success', 'Testimony edited successfully');
      setFields(false);
    } catch (err) {
      error('Error at editing testimony', err);
      setSpinner(false);
    }
  };

  const deleteTestimonials = () => {
    try {
      setSpinner(true);
      setWarning(true);
      setTestimonials(testimonials.filter(({ _id }) => _id !== idDelete));
      confirmation('Success', 'Testimony deleted successfully');
      setSpinner(false);
      setWarning(false);
    } catch (err) {
      error('Error at deleting testimony', err);
      setSpinner(false);
    }
  };

  const onDelete = _id => {
    setWarning(!warning);
    if (!_id) return;
    setIdDelete(_id);
  };

  const onEdit = _id => {
    setFields(!fields);
    if (!_id) return;
    setIdEdit(_id);
    const getTestimony = testimonials.filter(({ _id: id }) => id === _id);
    setToEditTestimonials(getTestimony);
    setEditingTestimonials(testimonials);
  };

  const handleInput = e => {
    const { name, value } = e.target;
    setEditingTestimonials(
      editingTestimonials.map(testimonials => {
        if (testimonials._id === idEdit) {
          return {
            ...testimonials,
            [name]: value,
          };
        }
        return testimonials;
      })
    );
  };
  return (
    <>
      {spinner && <LoaderSpinner />}
      {warning && (
        <Warning
          modalWarning={onDelete}
          cancel={onDelete}
          pursue={deleteTestimonials}
        />
      )}
      {fields && (
        <Fields
          modalField={onEdit}
          cancel={onEdit}
          pursue={editTestimonials}
          editFields={toEditTestimonials}
          onChange={handleInput}
        />
      )}
      <TableComponent
        tableHeaders={tableHeaders}
        data={testimonials}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </>
  );
};
export default BackofficeTestimonialsPage;
