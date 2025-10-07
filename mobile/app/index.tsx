import React, { useState } from "react";
import { Link } from "expo-router";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Senha:", senha);
  };

  return (
    <View style={styles.container}>
      {/* Ícone / logo */}
      <Image
        source={require("@/assets/images/logo1.png")} // coloque sua logo branca aqui
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Faça seu Login!</Text>

      {/* Campo Email */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        placeholderTextColor="#C9C9C9"
        value={email}
        onChangeText={setEmail}
      />

      {/* Campo Senha */}
      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        placeholderTextColor="#C9C9C9"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      {/* Botão Login */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Não tem uma conta? <Text style={styles.link}><Link href="/cadastro">Cadastre-se</Link></Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#480D39", // cor primária
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    fontFamily: 'Montserrat',
    paddingTop: 0,
    height: '100%',
    width: '100%'
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    color: "#FCFCFA", // cor secundária
    fontSize: 32,
    fontWeight: "200",
    marginBottom: 30,
  },
  label: {
    alignSelf: "flex-start",
    color: "#FCFCFA",
    marginBottom: 5,
    marginTop: 10,
    fontWeight: "200",
    fontSize: 20,
  },
  input: {
    width: "100%",
    height: 45,
    backgroundColor: "#35072C", // tom escuro para campo
    borderRadius: 10,
    paddingHorizontal: 10,
    color: "#FCFCFA",
    marginBottom: 25,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    fontSize: 16
  },
  button: {
    width: "80%",
    height: 40,
    backgroundColor: "#BFBFBF", // botão cinza
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 15,
  },
  footerText: {
    color: "#FCFCFA",
    fontSize: 15,
    marginTop: 20,
    fontFamily: 'Montserrat'
  },
  link: {
    textDecorationLine: "underline",
  },
  a:{
    color: 'transparent'

  }
});