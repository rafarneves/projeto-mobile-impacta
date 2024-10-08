import { Text, View } from "react-native";
import styles from "./style";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import DeleteItem from "./DeleteItem";
import EditItem from "./EditItem";

type Props = {
    title: string
    subtitle: string
    onEdit: () => void
    onRemove: () => void
}

export default function ListItem({ title, subtitle, onEdit, onRemove }: Props) {
    return (
        <GestureHandlerRootView>
            <Swipeable renderRightActions={() => <><DeleteItem action={onRemove}/><EditItem action={onEdit} /></>}>
                <View style={styles.listItem}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subTitle}>{subtitle}</Text>
                </View>
            </Swipeable>
        </GestureHandlerRootView>
    )
}