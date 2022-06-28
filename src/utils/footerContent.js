// Assets: logo
import logo from "../assets/logoSomosMas.png"
const footerContent = [
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
export default footerContent
