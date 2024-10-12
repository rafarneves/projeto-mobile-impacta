import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    inputView: {
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        columnGap: 5
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