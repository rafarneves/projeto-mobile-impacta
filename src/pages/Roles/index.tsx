import { Alert, Button, FlatList, Text, View } from "react-native"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { roleService } from "../../services/role.service"
import { Role } from "../../models/role.model"

import styles from "./styles"
import ListRole from "../../components/ListRole"

export default function RolesPage() {

    const navigation = useNavigation<NavigationProp<any>>()

    const [roles, setRoles] = useState<Role[]>([])
    const [refreshing, setRefreshing] = useState(false)

    function goToCreateRole() {
        navigation.navigate('CreateRole')
    }

    function fetchRoles() {
        setRefreshing(true)
        roleService.get().then(list => {
            setRoles(list)
            setRefreshing(false)
        }).catch(error => {
            navigation.goBack()
        })
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <Button title="Cadastrar" onPress={goToCreateRole} />,
        })

        navigation.addListener('focus', () => {
            fetchRoles()
        })
    }, [])

    return (
        <View style={styles.pageRoles}>
            <Text style={styles.title}>Roles Cadastradas</Text>
            <Text>Roles registradas: {roles.length}</Text>
            <FlatList
                keyExtractor={role => role.description}
                onRefresh={fetchRoles}
                refreshing={refreshing}
                data={roles}
                renderItem={({ item }) => (
                    <ListRole name={item.name} description={item.description} />
                )}
            />
        </View>
    )
}