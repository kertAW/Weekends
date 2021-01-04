import { StyleSheet } from "aphrodite-jss";

const sheet = StyleSheet.create({
    rates: {
        height: "50px",
        "& pre": {
            fontSize: "24px",
            fontFamily: "monospace",
            backgroundColor: "#C4C4C4",
            padding: "10px 20px"
        }
    }
});

export default sheet;