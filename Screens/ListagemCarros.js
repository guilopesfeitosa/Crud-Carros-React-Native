import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, ActivityIndicator, Snackbar } from 'react-native-paper';
import axios from 'axios';
import { CARRO_URL } from '../constants';

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 700,
    color: 'white',
  },
  main: {
    backgroundColor: '#000024',
    flex: 1,
    padding: 15,
  },
  text: {
    color: 'white',
  },
  card: {
    marginTop: 15,
    borderColor: 'white',
    borderRadius: 5,
    borderWidth: 2,
    padding: 5,
  },
  buttonContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  spinner: {
    marginTop: 30,
  },
});

const ListagemCarros = ({ navigation }) => {
  const [listaDeCarros, setListaDeCarros] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [feedbackMessege, setFeedbackMessege] = useState();

  const getCarro = async () => {
    const response = await axios.get(CARRO_URL);
    setListaDeCarros(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getCarro();
  }, []);

  const deletarCarro = async (carroId) => {
    try {
      console.log(carroId);
      await axios.delete(`${CARRO_URL}/${carroId}`);
      getCarro();
      setFeedbackMessege('Carro deletado com sucesso!');
    } catch (error) {
      console.log(error);
      setFeedbackMessege('Erro ao deletar!');
    } finally {
      setIsVisible(true)
    }
  };

  const irParaTelaDeEditar = (carro) => {
    navigation.navigate('Editar', carro);
  };

  const loading = () => {
    if (isLoading === true) {
      return (
        <ActivityIndicator
          style={styles.spinner}
          animating={true}
          color={'white'}
        />
      );
    }
    return listaDeCarros.map((carro) => {
      return (
        <View style={styles.card}>
          <Text style={styles.text}>Modelo: {carro.modelo} </Text>
          <Text style={styles.text}>Ano: {carro.ano} </Text>
          <Text style={styles.text}>Cor: {carro.cor} </Text>
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              icon="delete"
              onPress={() => deletarCarro(carro._id)}
              color="#E63946">
              Deletar
            </Button>
            <Button
              mode="contained"
              icon="pencil-outline"
              onPress={() => irParaTelaDeEditar(carro)}
              color="#336666">
              Alterar
            </Button>
          </View>
        </View>
      );
    });
  };

  return (
    <ScrollView style={styles.main}>
      <Text style={styles.title}>Lista de carros Cadastrados</Text>
      {loading()}
      <Snackbar visible={isVisible} onDismiss={() => setIsVisible(false)}>
        {feedbackMessege}
      </Snackbar>
    </ScrollView>
  );
};

export default ListagemCarros;
