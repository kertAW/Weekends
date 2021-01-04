import { StyleSheet } from "aphrodite-jss";

const sheet = StyleSheet.create({
    header: {
        marginBottom: "50px",
        "& .logo": {
            fontFamily: "Shanti",
            fontSize: "72px",
        }
    }
});

export default sheet;