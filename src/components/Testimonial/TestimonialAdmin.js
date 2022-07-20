import React, { useState, useEffect } from 'react';
import TestimonialCard from './TestimonialCard';
import { Flex, Text, Grid, Button } from '@chakra-ui/react';
import TestimonialForm from './TestimonialForm';
import TestimonialTable from '../TestimonialTable/TestimonialTable';


const TestimonialsAdmin = () => {
return(
    <>
   <TestimonialTable />
    </>
)

};

export default TestimonialsAdmin;