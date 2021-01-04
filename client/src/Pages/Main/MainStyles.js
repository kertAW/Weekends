import { StyleSheet } from "aphrodite-jss";

const sheet = StyleSheet.create({
    main: {
        marginBottom: "240px",
        "& .topNews": {
            maxHeight: "438px",
            marginBottom: "67px",
            display: "flex",
            justifyContent: "space-between",
            overflow: "hidden",
            "& div": {
                height: "438px",
                width: "590px"
            },
            "& .media": {
                backgroundColor: "#C4C4C4"
            },
            "& .about": {
                "& h2.heading": {
                    fontSize: "72px",
                    textAlign: "center",
                    marginBottom: "19px"
                },
                "& .text-about": {
                    fontSize: "32px",
                    textOverflow: "ellipsis"
                }
            }
        },
        "& .middleNews": {
            marginBottom: "38px",
            display: "flex",
            justifyContent: "space-between",
            "& .news": {
                height: "285px",
                width: "285px",
                backgroundColor: "#C4C4C4"
            }
        },
        "& .bottomNews": {
            marginBottom: "38px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "38px 20px",
            "& .news": {
                height: "89px",
                width: "590px",
                backgroundColor: "#C4C4C4"
            }
        },
        "& .showAll": {
            display: "flex",
            justifyContent: "space-between",
            "& input": {
                width: "285px",
                height: "82px",
                backgroundColor: "#C4C4C4",
                border: "none",
                outline: "none",
                verticalAlign: "center",
                textAlign: "center",
                fontSize: "32px",
                fontFamily: "sans-serif",
                cursor: "pointer"
            }
        }
    }
});

export default sheet;