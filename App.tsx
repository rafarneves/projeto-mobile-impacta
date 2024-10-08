import { StatusBar } from 'expo-status-bar';
import UserPage from './src/pages/User';
import LoginPage from './src/pages/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from './src/pages/Home';
import EditPage from './src/pages/User/Edit';
import RolesPage from './src/pages/Roles';
import CreateRoles from './src/pages/Roles/Create';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" options={{ title: 'Página de Acesso'}} component={LoginPage} />
        <Stack.Screen name="Home" options={{ title: 'Página Inicial'}} component={HomePage} />
        <Stack.Screen name="EditUser" component={EditPage} />
        <Stack.Screen name="User" component={UserPage} />
        <Stack.Screen name="Roles" options={{ title: 'Listagem de Roles'}} component={RolesPage} />
        <Stack.Screen name="CreateRole" options={{ title: 'Cadastro de Roles'}} component={CreateRoles} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
