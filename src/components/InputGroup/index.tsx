import { Text, TextInput, View } from "react-native";

import styles from "./styles";

type Props = {
    label: string,
    initialValue?: string,
    secureTextEntry?: boolean,
    change?: (value: string) => void
}

export default function InputGroup(props: Props) {
    return (
        <View style={styles.inputView}>
            <Text style={styles.label}>{props.label}:</Text>
            <TextInput 
                style={styles.input} 
                value={props.initialValue}
                readOnly={!props.change}
                onChangeText={props.change} 
                secureTextEntry={props.secureTextEntry} />
        </View>
    )
}