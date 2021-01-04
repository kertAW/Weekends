import { StyleSheet } from "aphrodite-jss";

const sheet = StyleSheet.create({
    footer: {
        backgroundColor: "#5B5B5B",
        height: "262px",
        padding: "15px 0",
        "& .subscribe": {
            width: "791px",
            margin: "0 auto",
            marginBottom: "23px",
            "& form": {
                display: "flex",
                justifyContent: "space-between",
                "& input.emailInput": {
                    width: "486px",
                    height: "56px",
                    fontSize: "24px",
                    outline: "none",
                    border: "none",
                    padding: "13px 42px",
                    backgroundColor: "#C4C4C4"
                },
                "& button.submitBtn": {
                    width: "283px",
                    height: "56px",
                    fontSize: "24px",
                    position: "relative",
                    cursor: "pointer",
                    backgroundColor: "#DF0000",
                    outline: "none",
                    border: "none",
                    "& .content": {
                        position: "absolute",
                        top: "14px",
                        left: "40px"
                    },
                    "& .pointer": {
                        position: "absolute",
                        top: "10px",
                        right: "20px"
                    }
                }
            }
        },
        "& .line": {
            height: "1px",
            backgroundColor: "white",
            marginBottom: "23px"
        },
        "& .social-networks": {
            marginBottom: "30px",
            "& ul": {
                listStyleType: "none",
                display: "flex",
                justifyContent: "space-between",
                width: "366px",
                margin: "0 auto",
                "& a": {
                    width: "60px",
                    height: "60px"
                }
            }
        },
        "& .links": {
            marginBottom: "40px",
            "& ul": {
                listStyleType: "none",
                display: "flex",
                justifyContent: "space-between",
                width: "291px",
                margin: "0 auto",
                "& a": {
                    fontSize: "14px",
                    fontFamily: "sans-serif",
                    textDecoration: "none",
                    color: "white"
                }
            }
        }
    }
});

export default sheet;