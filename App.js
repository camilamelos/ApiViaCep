import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  ActivityIndicator, 
  SafeAreaView, 
  Button, 
  Alert,
  ScrollView,
  TouchableOpacity 
} from 'react-native';

import { viacep } from './services/api';
 
export default function App() {
  const [cep, alterarCep] = React.useState("");
  const [logradouro, alterarLogradouro] = React.useState("");
  const [complemento, alterarComplemento] = React.useState("");
  const [bairro, alterarBairro] = React.useState("");
  const [localidade, alterarLocalidade] = React.useState("");
  const [uf, alterarUf] = React.useState("");
  const [ibge, alterarIbge] = React.useState("");
  const [gia, alterarGia] = React.useState("");
  const [ddd, alterarDDD] = React.useState("");
  const [siafi, alterarSiafi] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
 
  // Método de busca do ViaCEP
  const buscarEndereco = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let json;
      const response = await viacep(`/${cep.toString().replace("-", "")}/json/`)
        .then(res => {
          json =  res.data;
        });

      alterarLogradouro(json.logradouro);
      alterarComplemento(json.complemento);
      alterarBairro(json.bairro);
      alterarLocalidade(json.localidade);
      alterarUf(json.uf);
      alterarIbge(json.ibge);
      alterarGia(json.gia);
      alterarDDD(json.ddd);
      alterarSiafi(json.siafi);
 
    } catch (error) {
      Alert.alert(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ScrollView>
        <SafeAreaView style = {styles.container}>
          <View>
            <Text style={styles.texto}>DIGITE UM CEP</Text>
            
            <TextInput
              style = {styles.input}
              onChangeText={text => alterarCep(text)}
              value = { cep }
              keyboardType = "numeric"
              maxLength = {9}
              placeholder={ "00000-000" }
            />
        
            {isLoading ? <ActivityIndicator/> : 
              <TouchableOpacity style = { styles.botao }
                onPress={(e) => buscarEndereco(e)}
                color="#841584"
                accessibilityLabel="Aprendendo mais sobre o consumo de API REST"
              >
                <Text style={ styles.textButton }>Buscar CEP</Text>
              </TouchableOpacity>
            }

            <TextInput
              style = { styles.input }
              onChangeText = { alterarLogradouro }
              value = { logradouro }
              keyboardType = "default"
              hintText = { "Logradouro" }
              multiline ={true}
              placeholder="Logadouro"
            />

            <TextInput
              style = { styles.input }
              onChangeText = { alterarComplemento }
              value = { complemento }
              keyboardType = "default"
              placeholder="Complemento"
            />

            <TextInput
              style = { styles.input }
              onChangeText = { alterarBairro }
              value = { bairro }
              keyboardType = "default"
              placeholder="Bairro"
            />

            <TextInput
              style = { styles.input }
              onChangeText = { alterarLocalidade }
              value = { localidade }
              keyboardType = "default"
              placeholder="Localidade"
            />

            <TextInput
              style = { styles.input }
              onChangeText = { alterarUf }
              value = { uf }
              keyboardType = "default"
              placeholder="UF"
            />

            <TextInput
              style = { styles.input }
              onChangeText = { alterarIbge }
              value = { ibge }
              keyboardType = "numeric"
              placeholder="IBGE"
            />

            <TextInput
              style = { styles.input }
              onChangeText = { alterarGia }
              value = { gia }
              keyboardType = "numeric"
              placeholder="GIA"
            />

            <TextInput
              style = { styles.input }
              onChangeText = { alterarDDD }
              value = { ddd }
              keyboardType = "numeric"
              placeholder="DDD"
            />

            <TextInput
              style = { styles.input }
              onChangeText = { alterarSiafi }
              value = { siafi }
              keyboardType = "numeric"
              placeholder="SIAFI"
            />
            <StatusBar style = "auto"/>
          </View>
        </SafeAreaView>
      </ScrollView>   
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 16,
    marginTop: 48,
  },

  texto: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 16,
    fontSize: 16,
    fontWeight: 'bold'
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 4,
    height: 35,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  inputLarge: {
    height: 40,
    width: "100%", 
    margin: 3, 
    borderWidth: 1,
    padding: 1,
    justifyContent: "center", 
    alignSelf: "center", 
  },

  botao: {
    borderWidth: 0,
    borderRadius: 4,
    height: 35,
    marginBottom: 32,
    marginTop: 8,
    width: "50%",
    padding: 1,
    backgroundColor: '#ff4e0d',
    justifyContent: 'center', 
    alignSelf: 'center', 
    alignItems: 'center',
  },

  textButton: {
    color: 'white',
    
  }
});
