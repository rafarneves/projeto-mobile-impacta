import { Button, Dimensions, TextInput, Text, View, StyleSheet, Alert } from "react-native"
import styles from './styles'
import { useState } from "react"
import InputGroup from "../../components/InputGroup"
import { NavigationProp, useNavigation } from "@react-navigation/native"

import { authService } from "../../services/auth.service"

export default function LoginPage() {

    const navigation = useNavigation<NavigationProp<any>>()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function signIn() {
        authService.login(username, password).then(isLogged => {
            if (isLogged) {
                navigation.navigate("Home")
            } else {
                Alert.alert("Login/Senha inválido(a)!")
            }
        })
    }

    return (
        <View style={styles.page}>
            <InputGroup label="Login" initialValue={username} change={setUsername} />
            <InputGroup label="Password" initialValue={password} change={setPassword} secureTextEntry/>
            <View style={styles.buttonView}>
                <Button title="Entrar" onPress={signIn}/>
            </View>
        </View>
    )
}