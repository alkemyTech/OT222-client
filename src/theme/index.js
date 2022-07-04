export const colors = {
    primary: "#DB5752",
    secondary: "#FAFA88",
    tertiary: "#9AC9FB",
};

export const breakpoints = {
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
}

export const components = {
    Button: {
        variants: {
            login: {
                height: "56px",
                width: "448px",
                maxWidth: "100%",
                borderRadius: "8px",
                fontSize: "24px",
                fontWeight: "600",
                backgroundColor: "#FF0000",
                color: "#FFFFFF",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                _hover: {
                    backgroundColor: "#FFFFFF",
                    color: "#000"
                }
            }
        }
    },
    Input: {
        variants: {
            login: {
                field: {
                    height: "56px",
                    width: "451px",
                    maxWidth: "100%",
                    border: "1px solid #B0B0B0",
                    borderRadius: "8px",
                    backgroundColor: "000"
                }
            }
        }
    },
    Heading: {
        variants: {
            login: {
                fontSize: "32px",
                fontWeight: "500",
                lineHeight: "48px"
            }
        }
    },
    Text: {
        variants: {
            login: {
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "24px"
            }
        }
    }
}