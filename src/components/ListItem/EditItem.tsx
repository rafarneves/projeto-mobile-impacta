import { StyleSheet, Text, View } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";

type Props = {
    action: () => void
}

export default function EditItem(props: Props) {
    return (
        <View style={styles.container}>
            <BorderlessButton onPress={() => props.action()}>
                <Text style={styles.text}>Editar</Text>
            </BorderlessButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E9BB01',
        padding: 10
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    }
})