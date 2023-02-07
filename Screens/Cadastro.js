import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
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

const Cadastro = () => {
  const [modeloCarro, setModelo] = useState();
  const [anoCarro, setAno] = useState();
  const [corCarro, setCor] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [feedbackMessege, setFeedbackMessege] = useState();

  const salvarCarro = async () => {
    try {
      await axios.post(CARRO_URL, {
        modelo: modeloCarro,
        ano: anoCarro,
        cor: corCarro,
      });
      setFeedbackMessege('Carro cadastrado com sucesso!');
      setModelo('');
      setAno('');
      setCor('');
    } catch (error) {
      setFeedbackMessege('Erro ao cadastrar!');
      console.log(error.message);
    } finally {
      setIsVisible(true);
    }
  };

  return (
    <View style={styles.main}>
      <Text style={styles.title}>Cadastro Carro</Text>
      <TextInput
        style={styles.input}
        label="Modelo"
        value={modeloCarro}
        onChangeText={setModelo}
      />
      <TextInput
        style={styles.input}
        label="Ano"
        value={anoCarro}
        onChangeText={setAno}
      />
      <TextInput
        style={styles.input}
        label="Cor"
        value={corCarro}
        onChangeText={setCor}
      />
      <Button mode="contained" onPress={salvarCarro} style={styles.button}>
        Salvar carro
      </Button>
      <Snackbar visible={isVisible} onDismiss={() => setIsVisible(false)}>
        {feedbackMessege}
      </Snackbar>
    </View>
  );
};

export default Cadastro;
