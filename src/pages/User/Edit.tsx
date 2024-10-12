import { Alert, Button, Text, View } from "react-native"
import styles from "./styles"

import { userService } from "../../services/user.service"

import { useEffect, useState } from "react"
import InputGroup from "../../components/InputGroup"
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native"
import { User } from "../../models/user.model"
import { roleService } from "../../services/role.service"
import { Role } from "../../models/role.model"
import InputCheckbox from "../../components/InputCheckbox"

export default function EditPage() {

    const navigation = useNavigation<NavigationProp<any>>()
    const route = useRoute();

    const user = route.params as User

    const [name, setName] = useState(user.name)
    const [username, setUsername] = useState(user.username)
    const [roles, setRoles] = useState(user.roles ? user.roles : [])
    const [rolesList, setRolesList] = useState<Role[]>([])

    useEffect(() => {
        navigation.setOptions({ title: `Usuário: Id ${user.id}` })
        fetchRoles()
    }, [])

    function save() {
        if (name.trim() === '') {
            Alert.alert('O nome é obrigatório')
            return
        }
        if (roles.length === 0) {
            Alert.alert('Selecione ao menos uma role!')
            return
        }

        userService.update({ id: user.id, name, username, roles }).then(saved => {
            navigation.navigate('Home')
        }).catch((error: Error) => {
            if (error.cause === 400) {
                Alert.alert('Usuário já existe!')
            } else {
                navigation.navigate('Login')
            }
        })
    }

    function fetchRoles() {
        roleService.get().then(list => {
            setRolesList(list)
        })
    }

    function handleItem(item: string) {
        const hasItem = roles.includes(item)
        if (hasItem) {
            setRoles(roles.filter(element => element !== item))
        } else {
            setRoles([...roles, item])
        }
    }

    return (
        <View style={styles.page}>
            <InputGroup label="Name" initialValue={name} change={setName} />
            <View style={styles.inputRolesView}>
                <Text style={styles.label}>Roles:</Text>
                <View style={styles.rolesView}>
                    {rolesList && rolesList.map((item) => (
                        <InputCheckbox key={item.name} label={item.name} check={roles.includes(item.name)} change={() => handleItem(item.name)} />
                    ))}
                </View>
            </View>
            <View style={styles.buttonView}>
                <Button title="Salvar" onPress={save}/>
            </View>
        </View>
    )
}