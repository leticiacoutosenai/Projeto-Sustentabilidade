import React, { useState } from "react";
import { Link } from "expo-router";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { localhost } from "@/localhost";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [name, setName] = useState("");


    const handleCadastro = async () => {
        try {
            const response = await fetch(`http://${localhost}:9000/cliente/create`, { // 👈 IP do backend
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Cadastro bem-sucedido!", data);

                if (data.token) {
                    await AsyncStorage.setItem("token", data.token);
                }
                // redirecionar, salvar token, etc.
            } else {
                console.log("Erro:", data.error);
            }
        } catch (error) {
            console.error("Erro de conexão:", error);
        }
    };

    return (
        <View style={styles.container}>
          <Image source={require('@/assets/images/logo2.png')} style={styles.logo} />
          <Text style={styles.title}>Faça seu Cadastro!</Text>
    
          <TextInput
            placeholder="Nome"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
    
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
          />
    
          <TextInput
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
             placeholderTextColor="#ccc"
          />
    
          <TextInput
            placeholder="Confirmação da Senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
             placeholderTextColor="#ccc"
          />
    
          <TouchableOpacity style={styles.button} onPress={handleCadastro}>
            <Text style={styles.buttonText}>CADASTRO</Text>
          </TouchableOpacity>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingBottom: 50
      },
      logo: {
        width: 200,
        height: 200,
        marginBottom: 20,
        resizeMode: 'contain',
      },
      title: {
        fontSize: 22,
        fontWeight: '200',
        marginBottom: 20,
      },
      input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
      },
      button: {
        width: '100%',
        height: 50,
        backgroundColor: '#E50914',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
      },
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
      },
      TextInput:{
        color: '#DEDEDE',
        fontSize: 20
      }
    });