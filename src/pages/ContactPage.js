import React from "react";
import ContactForm from "../components/ContactForm";
import ContactsTable from "../components/ContactsTable/ContactsTable";

const ContactPage = () => {
  return (
    <>
      <ContactForm />
      <ContactsTable />
    </>
  );
};

export default ContactPage;
