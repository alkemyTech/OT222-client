import React, { useState } from 'react';
import TestimonialsUser from '../components/Testimonial/TestimonialUser';
import TestimonialsAdmin from '../components/Testimonial/TestimonialAdmin';
import Testimonial from '../components/Testimonial/Testimonial';

const TestimonialsPage = () => {
  const [status, setStatus] = useState(false);

  const authAdmin = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(process.env.REACT_APP_SERVER_BASE_URL + '/auth/me', requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.roleId === 1) {
          setStatus(true);
        }
      })
      .catch(error => console.log('error', error));
  };

  authAdmin();

  if (!localStorage.getItem('token')) {
    return <Testimonial />;
  } else if (status === false) {
    return <TestimonialsUser />;
  } else {
    return <TestimonialsAdmin />;
  }
};

export default TestimonialsPage;
