import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#000024',
    flex: 1,
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 10,
  },
});

const Home = ({ navigation }) => {
  const irParaCadastro = () => {
    navigation.navigate('Cadastro');
  };

  const irParaListagem = () => {
    navigation.navigate('Listagem');
  };

  return ( 
    <View style={styles.main}>
      <Button style={styles.button} mode="contained" onPress={irParaCadastro}>
        Ir para tela de cadastro
      </Button>
      <Button style={styles.button} mode="contained" onPress={irParaListagem}>
        Ir para tela de listagem
      </Button>
    </View>
  );
};

export default Home;
