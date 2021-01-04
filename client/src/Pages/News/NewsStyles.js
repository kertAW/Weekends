import { StyleSheet } from 'aphrodite-jss';

const sheet = StyleSheet.create({
    news: {
        marginBottom: "174px",
        "& .aNews": {
            marginBottom: "85px",
            "& h1.heading": {
                fontSize: "72px",
                borderBottom: "1px solid black",
                marginBottom: "26px"
            },
            "& .labels": {
                marginBottom: "46px",
                "& ul": {
                    listStyleType: "none",
                    display: "flex",
                    justifyContent: "flex-start",
                    "& li:not(:last-child)": {
                        marginRight: "20px"
                    },
                    "& li": {
                        "& a": {
                            display: "block",
                            minWidth: "82px",
                            height: "25px",
                            textDecoration: "none",
                            textAlign: "center",
                            color: "black",
                            backgroundColor: "#C4C4C4"
                        }
                    }
                }
            },
            "& .body": {
                fontSize: "24px"
            }
        },
        "& .news": {
            display: "flex",
            justifyContent: "space-between",
            "& .item": {
                width: "285px",
                height: "197px",
                backgroundColor: "#C4C4C4"
            }
        }
    }
});

export default sheet;