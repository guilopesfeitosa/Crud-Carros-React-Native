import Cadastro from './Screens/Cadastro';
import ListagemCarros from './Screens/ListagemCarros';
import Editar from './Screens/Editar';
import Home from './Screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const options = {
  headerShown: false,
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={options}/>
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Listagem" component={ListagemCarros} />
        <Stack.Screen name="Editar" component={Editar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
