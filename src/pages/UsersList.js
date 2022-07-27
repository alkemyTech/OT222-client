import React from 'react';
import { Heading, Flex } from '@chakra-ui/react';
import UsersTable from '../components/UsersTable/UsersTable';
import BackButton from '../components/Buttons/BackButton';
import { Link } from 'react-router-dom';

function UsersList() {
  return (
    <>
      <Flex justify={'flex-end'} mt={'15px'} mr={'15px'}>
        <Link to={'/backoffice'}>
          <BackButton />
        </Link>
      </Flex>
      <Flex
        flexDirection="column"
        alignItems="center"
        margin="4rem 0"
        gap="3rem"
      >
        <Heading fontWeight="400">Lista de Usuarios</Heading>
        <UsersTable />
      </Flex>
    </>
  );
}
export default UsersList;
