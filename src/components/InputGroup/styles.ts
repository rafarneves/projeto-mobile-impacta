import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    inputView: {
        marginBottom: 10,
    },
    label: {
        fontSize: 22,
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 22,
        padding: 5,
        width: Dimensions.get('screen').width - 60
    },
})