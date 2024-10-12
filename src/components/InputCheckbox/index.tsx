import { Text, TextInput, View } from "react-native";
import Checkbox from "expo-checkbox";
import styles from "./styles";
import { useEffect, useState } from "react";

type Props = {
    label: string
    check?: boolean
    change: () => void
}

export default function InputCheckbox(props: Props) {

    const [isChecked, setChecked] = useState(false);

    useEffect(() => {
        if (props.check && props.check === true) {
            setChecked(true)
        }
    }, [])

    return (
        <View style={styles.inputView}>
            <Text style={styles.label}>{props.label}</Text>
            <Checkbox value={isChecked} onValueChange={setChecked} onTouchEnd={props.change} />
        </View>
    )
}