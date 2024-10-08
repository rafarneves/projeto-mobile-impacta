import { Alert, Button, View } from "react-native"
import styles from "./styles"

import { userService } from "../../services/user.service"

import { useEffect, useState } from "react"
import InputGroup from "../../components/InputGroup"
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native"
import { User } from "../../models/user.model"

export default function EditPage() {

    const navigation = useNavigation<NavigationProp<any>>()
    const route = useRoute();

    const user = route.params as User

    const [name, setName] = useState(user.name)
    const [username, setUsername] = useState(user.username)

    useEffect(() => {
        navigation.setOptions({ title: `Usuário: Id ${user.id}` })
    }, [])

    function save() {
        if (name.trim() === '') {
            Alert.alert('O nome é obrigatório')
            return
        }

        userService.update({ id: user.id, name, username }).then(saved => {
            navigation.goBack()
        }).catch((error: Error) => {
            if (error.cause === 400) {
                Alert.alert('Usuário já existe!')
            } else {
                navigation.navigate('Login')
            }
        })
    }

    return (
        <View style={styles.page}>

            <InputGroup label="Name" initialValue={name} change={setName} />
            
            <View style={styles.buttonView}>
                <Button title="Salvar" onPress={save}/>
            </View>

        </View>
    )
}