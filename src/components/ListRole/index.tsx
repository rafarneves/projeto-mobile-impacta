import { Text, View } from "react-native";
import styles from "./style";

type Props = {
    name: string
    description: string
}

export default function ListRole({ name, description }: Props) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{name}</Text>
            <Text>{description}</Text>
        </View>
    )
}