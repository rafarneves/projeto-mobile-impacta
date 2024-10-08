import { Alert, Button, FlatList, Text, View } from "react-native";

import { userService } from "../../services/user.service";
import { User } from "../../models/user.model";
import { useEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import ListItem from "../../components/ListItem";
import { authService } from "../../services/auth.service";

export default function HomePage() {

    const navigation = useNavigation<NavigationProp<any>>()
    const [users, setUsers] = useState<User[]>([])
    const [refreshing, setRefreshing] = useState(false)

    function fetchUsers() {
        setRefreshing(true)
        userService.getList().then(list => {
            setUsers(list)
            setRefreshing(false)
        }).catch(error => {
            navigation.goBack()
        })
    }
    
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <Button title="Sair" onPress={logout} />,
            headerRight: () => (
                <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                    <Button title="Add" onPress={goToNewUser} />
                    <Button title="Roles" onPress={goToRolesPage} />
                </View>
                
            )
        })
        
        fetchUsers()
    },[])

    function logout() {
        authService.logOut()
        navigation.navigate('Login')
    }

    function goToNewUser() {
        navigation.navigate('User')
    }

    function goToRolesPage() {
        navigation.navigate('Roles')
    }

    function remover(id: number) {
        userService.delete(id).then(isDelete => {
            if (isDelete) fetchUsers()
            else Alert.alert('USuário n existe')
        })
    }

    function update(user: User) {
        navigation.navigate('EditUser', user)
    }
    
    return (
        <View>
            <Text>Página inicial</Text>
            <Text>Temos {users.length} usuários cadastrados.</Text>
            <FlatList
                keyExtractor={user => user.username}
                onRefresh={fetchUsers}
                refreshing={refreshing}
                data={users}
                renderItem={({ item }) => (
                    <ListItem title={item.name} subtitle={item.username} onEdit={() => update(item)} onRemove={() => remover(item.id!)}/>
                )}
            />
        </View>
    )
}