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
import activitiesData from '../utils/activitiesData';
const tableHeaders = ['Name', 'Actions'];
const BackofficeActivitiesPage = () => {
  // arrs
  const [activities, setActivities] = useState([...activitiesData]);
  const [toEeditActivities, setToEditActivities] = useState(Array);
  const [editingActivities, setEditingActivities] = useState([...activities]);

  // strs
  const [idDelete, setIdDelete] = useState(String);
  const [idEdit, setIdEdit] = useState(String);

  // bools
  const [spinner, setSpinner] = useState(Boolean);
  const [warning, setWarning] = useState(Boolean);
  const [fields, setFields] = useState(Boolean);

  const editActivities = () => {
    try {
      setFields(true);
      setActivities(editingActivities);
      confirmation('Success', 'Activity edited successfully');
      setFields(false);
    } catch (err) {
      error('Error at editing activity', err);
      setSpinner(false);
    }
  };

  const deleteActivities = () => {
    try {
      setSpinner(true);
      setWarning(true);
      setActivities(activities.filter(({ _id }) => _id !== idDelete));
      confirmation('Success', 'Activity deleted successfully');
      setSpinner(false);
      setWarning(false);
    } catch (err) {
      error('Error at deleting activity', err);
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
    const getActivity = activities.filter(({ _id: id }) => id === _id);
    setToEditActivities(getActivity);
    setEditingActivities(activities);
  };

  const handleInput = e => {
    const { name, value } = e.target;
    setEditingActivities(
      editingActivities.map(activities => {
        if (activities._id === idEdit) {
          return {
            ...activities,
            [name]: value,
          };
        }
        return activities;
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
          pursue={deleteActivities}
        />
      )}
      {fields && (
        <Fields
          modalField={onEdit}
          cancel={onEdit}
          pursue={editActivities}
          editFields={toEeditActivities}
          onChange={handleInput}
        />
      )}
      <TableComponent
        tableHeaders={tableHeaders}
        data={activities}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </>
  );
};
export default BackofficeActivitiesPage;
