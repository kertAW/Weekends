import { StyleSheet } from "aphrodite-jss";

const sheet = StyleSheet.create({
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        height: "44px",
        marginBottom: "25px",
        "& .links ul": {
            display: "flex",
            listStyleType: "none",
            "& li": {
                width: "183px",
                height: "44px",
                "&:last-child": {
                    width: "241px",
                },
                "&:not(:last-child)": {
                    borderRight: "1px solid black",
                },
                "& .link": {
                    display: "block",
                    padding: "8px",
                    backgroundColor: "#FF3C00",
                    color: "#000",
                    fontSize: "24px",
                    fontFamily: "Roboto, sans-serif",
                    textDecoration: "none",
                    textAlign: "center"
                },
            }
        },
        "& .searchbar": {
            position: "relative",
            "& input": {
                height: "44px",
                width: "285px",
                backgroundColor: "#C7C7C7",
                border: "none",
                outline: "none",
                padding: "5px 19px",
                fontSize: "24px",
                "&#submitBtn": {
                    display: "none"
                }
            },
            "& label": {
                position: "absolute",
                right: "13px",
                top: "7px",
                cursor: "pointer"
            }
        }
    }
});

export default sheet;