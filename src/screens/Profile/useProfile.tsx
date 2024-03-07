import { useNavigation } from "@react-navigation/native";
import { useCallback, useContext } from "react";
import { INavigationProps } from "../RootStackParams";
import { UserContext } from '../../contexts/userContext'; 
import api from '../../lib/api'; 
import * as Yup from "yup";

interface FormStructure {
  name: string;
  email: string;
  senha: string;
}

const ProfileSchema = Yup.object().shape({
  name: Yup.string().required("Campo obrigatório"),
  email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
  senha: Yup.string().required("Campo obrigatório"),
});

export default function useProfile() {
  const { goBack, navigate } = useNavigation<INavigationProps>();
  const { user, setUser } = useContext(UserContext) || { user: null }; 

  const initialValues: FormStructure = {
    name: user ? user.name : "", 
    email: user ? user.email : "",
    senha: user ? user.senha : ""
  };

  const handleGoBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleNavigateToHome = useCallback(() => {
    navigate("Home");
  }, [navigate]);

  const handleFormSubmit = async (values: FormStructure) => {
    if (!user) {
      console.error("Usuário não encontrado.");
      return;
    }

    const updatedUser = { ...user, ...values };

    try {
      await api.updateUser(updatedUser);
      setUser(updatedUser);
      console.log("Dados do usuário atualizados com sucesso!");
      handleNavigateToHome();
    } catch (error) {
      console.error("Erro ao atualizar os dados do usuário:", error);
    }
  };

  return {
    initialValues,
    ProfileSchema,
    handleGoBack,
    handleFormSubmit,
  };
}
