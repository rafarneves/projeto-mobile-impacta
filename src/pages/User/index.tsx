import { Alert, Button, View } from "react-native"
import styles from "./styles"

import { userService } from "../../services/user.service"

import { useEffect, useState } from "react"
import InputGroup from "../../components/InputGroup"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { roleService } from "../../services/role.service"
import { Role } from "../../models/role.model"
import InputCheckbox from "../../components/InputCheckbox"

export default function UserPage() {

    const navigation = useNavigation<NavigationProp<any>>()

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [rolesLista, setRolesLista] = useState<Role[]>([])
    const [roles, setRoles] = useState<String[]>([])

    function fetchRoles() {
        roleService.get().then(list => {
            setRolesLista(list)
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

    function save() {
        if (name.trim() === '') {
            Alert.alert('O nome é obrigatório')
            return
        }
        if (username.trim() === '') {
            Alert.alert('O Login é obrigatório')
            return
        }
        if (password.trim() === '') {
            Alert.alert('A senha é obrigatória')
            return
        }
        if (password !== confirmPassword) {
            Alert.alert('A senha não confere')
            return
        }
        if (roles.length === 0) {
            Alert.alert('Selecione ao menos uma role!')
            return
        }

        userService.create({ name, username, password, roles }).then(saved => {
            navigation.navigate('Home')
        }).catch((error: Error) => {
            if (error.cause === 400) {
                Alert.alert('Usuário já existe!')
            } else {
                navigation.navigate('Home')
            }
        })
    }

    useEffect(() => {
        fetchRoles()
    }, [])

    return (
        <View style={styles.page}>

            <InputGroup label="Name" initialValue={name} change={setName} />
            <InputGroup label="Login" initialValue={username} change={setUsername} />
            <InputGroup label="Password" initialValue={password} change={setPassword} secureTextEntry/>
            <InputGroup label="Confirm Password" initialValue={confirmPassword} change={setConfirmPassword} secureTextEntry/>

            <View style={styles.rolesView}>
                {rolesLista && rolesLista.map((item) => (
                    <InputCheckbox key={item.name} label={item.name} change={() => handleItem(item.name)} />
                ))}
            </View>
            
            <View style={styles.buttonView}>
                <Button title="Salvar" onPress={save}/>
            </View>

        </View>
    )
}