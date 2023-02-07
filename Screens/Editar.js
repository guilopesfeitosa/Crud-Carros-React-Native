import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import { CARRO_URL } from '../constants';

const styles = StyleSheet.create({
  input: {
    marginTop: 30,
  },
  button: {
    marginTop: 15,
  },
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
});

const Editar = ({ route, navigation }) => {
  const [modeloCarro, setModeloCarro] = useState();
  const [anoCarro, setAnoCarro] = useState();
  const [corCarro, setCorCarro] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [feedbackMessege, setFeedbackMessege] = useState();

  const editarCarro = async () => {
    try {
      const { _id } = route.params;
      await axios.put(`${CARRO_URL}/${_id}`, {
        modelo: modeloCarro,
        ano: anoCarro,
        cor: corCarro,
      });
      setFeedbackMessege('Alteração feita com sucesso!');
      navigation.navigate('Listagem', { update: true })
    } catch (error) {
      console.log(error);
      setFeedbackMessege('Erro ao alterar!');
    } finally {
      setIsVisible(true)
    }
  };

  useEffect(() => {
    const { ano, cor, modelo } = route.params;

    setModeloCarro(modelo);
    setAnoCarro(ano);
    setCorCarro(cor);
  }, [route.params]);

  return (
    <View style={styles.main}>
      <Text style={styles.title}>Alterar Carro</Text>
      <TextInput
        style={styles.input}
        label="Modelo"
        value={modeloCarro}
        onChangeText={setModeloCarro}
      />
      <TextInput
        style={styles.input}
        label="Ano"
        value={anoCarro}
        onChangeText={setAnoCarro}
      />
      <TextInput
        style={styles.input}
        label="Cor"
        value={corCarro}
        onChangeText={setCorCarro}
      />
      <Button mode="contained" onPress={editarCarro} style={styles.button}>
        Salvar alteração
      </Button>
    </View>
  );
};

export default Editar;
