import React from "react"
// Assets: logo
import logo from "../assets/logoSomosMas.png"
// social media icons
import { FaFacebookSquare } from "react-icons/fa"
import { AiFillLinkedin } from "react-icons/ai"
import { BsInstagram } from "react-icons/bs"

export const logoData = {
  logo,
  url: "https://somosmas.com",
  alt: "SomosMas",
}
export const itemsPages = [
  {
    _id: "AAAB0000",
    name: "Inicio",
    link: "/",
  },
  {
    _id: "AAAB0001",
    name: "Nosotros",
    link: "/staff",
  },
  {
    _id: "AAAB0010",
    name: "Novedades",
    link: "/news",
  },
  {
    _id: "AAAB0100",
    name: "Testimonios",
    link: "/testimonials",
  },
  {
    _id: "AAAB1000",
    name: "Contacto",
    link: "/contact",
  },
  {
    _id: "AAAB0011",
    name: "Contribuye",
    link: "/contribute",
  },
]

export const icons = [
  { name: "Facebook", icon: <FaFacebookSquare /> },
  { name: "Linkedin", icon: <AiFillLinkedin /> },
  { name: "Instagram", icon: <BsInstagram /> },
]

export const footerContent = [
  {
    _id: "AAAA0000",
    title: "ONG Somos Mas",
    logo: logo,
    dir: undefined,
    socialMedia: undefined,
  },
  {
    _id: "AAAA0001",
    title: "Visit our Page",
    logo: undefined,
    dir: "Somos Mas",
    socialMedia: undefined,
  },
  {
    _id: "AAAA0010",
    title: "Follow us",
    logo: undefined,
    dir: undefined,
    socialMedia: [
      {
        _id: "AAAB0000",
        media: "facebook",
        href: "/",
      },
      {
        _id: "AAAB0001",
        media: "twitter",
        href: "/",
      },
      {
        _id: "AAAB0010",
        media: "linkedin",
        href: "/",
      },
    ],
  },
]
