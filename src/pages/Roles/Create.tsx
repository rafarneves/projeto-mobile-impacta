import { Alert, Button, Text, View } from "react-native"
import styles from "./styles"

import { roleService } from "../../services/role.service"

import { useState } from "react"
import InputGroup from "../../components/InputGroup"
import { NavigationProp, useNavigation } from "@react-navigation/native"

export default function CreateRoles() {

    const navigation = useNavigation<NavigationProp<any>>()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    function save() {
        if (name.trim() === '') {
            Alert.alert('O nome da role é obrigatório')
            return
        }
        if (description.trim() === '') {
            Alert.alert('A descrição da role é obrigatória')
            return
        }

        roleService.create({ name, description }).then(saved => {
            navigation.navigate('Roles')
        }).catch((error: Error) => {
            if (error.cause === 400) {
                Alert.alert('Role já existe!')
            } else {
                navigation.navigate('Roles')
            }
        })
    }

    return (
        <View style={styles.page}>
            <InputGroup label="Nome" initialValue={name} change={setName} />
            <InputGroup label="Descrição" initialValue={description} change={setDescription} />
            
            <View style={styles.buttonView}>
                <Button title="Salvar" onPress={save}/>
            </View>

        </View>
    )
}