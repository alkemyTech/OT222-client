import React from "react"
import { Heading, Flex } from '@chakra-ui/react'
import UsersTable from "../components/UsersTable/UsersTable"

function UsersList() {
    return (
        <Flex flexDirection="column" alignItems="center" margin="4rem 0" gap="3rem">
            <Heading fontWeight='400'>Lista de Usuarios</Heading>
            <UsersTable />
        </Flex >
    )
}
export default UsersList