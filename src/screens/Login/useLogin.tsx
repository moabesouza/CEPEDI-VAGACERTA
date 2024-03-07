import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { Alert } from "react-native";
import * as Yup from "yup";
import api from "../../lib/api";
import { INavigationProps } from "../RootStackParams";
import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';

interface FormStructure {
  email: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Campo obrigatório"),
  password: Yup.string()
    .required("Campo obrigatório")
    .min(6, "Mínimo 6 dígitos"),
});

export const useLogin = () => {
  const { navigate } = useNavigation<INavigationProps>();
  const { setUser } = useContext(UserContext) || { setUser: () => {} }; 

  const initialValues: FormStructure = {
    email: "",
    password: "",
  };

  const handleNavigateToRegister = useCallback(() => {
    navigate("Register");
  }, [navigate]);

  const handleNavigateToHome = useCallback(() => {
    navigate("Home");
  }, [navigate]);

  const handleFormSubmit = useCallback(async (values: FormStructure) => {
    try {
      const foundUser = await api.login(values.email, values.password);
      if (foundUser) {
 
        setUser(foundUser);
        handleNavigateToHome();
      } else {
        Alert.alert("Erro no login", "E-mail ou senha incorretos");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      Alert.alert("Erro no login", "Ocorreu um erro ao fazer login");
    }
  }, [navigate, setUser]);

  return {
    initialValues,
    LoginSchema,
    handleFormSubmit,
    handleNavigateToRegister,
  };
};
