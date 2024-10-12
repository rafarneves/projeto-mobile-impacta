import { Dimensions, StyleSheet } from "react-native"

export default StyleSheet.create({
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
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
    buttonView: {
        marginTop: 40,
        width: Dimensions.get('screen').width - 200
    },
    inputRolesView: {
        width: Dimensions.get('screen').width - 60,
    },
    rolesView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        columnGap: 15
    }
})