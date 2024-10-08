import { Alert, Button, View } from "react-native"
import styles from "./styles"

import { userService } from "../../services/user.service"

import { useState } from "react"
import InputGroup from "../../components/InputGroup"
import { NavigationProp, useNavigation } from "@react-navigation/native"

export default function UserPage() {

    const navigation = useNavigation<NavigationProp<any>>()

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

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

        userService.create({ name, username, password }).then(saved => {
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
            <InputGroup label="Login" initialValue={username} change={setUsername} />
            <InputGroup label="Password" initialValue={password} change={setPassword} secureTextEntry/>
            <InputGroup label="Confirm Password" initialValue={confirmPassword} change={setConfirmPassword} secureTextEntry/>
            
            <View style={styles.buttonView}>
                <Button title="Salvar" onPress={save}/>
            </View>

        </View>
    )
}