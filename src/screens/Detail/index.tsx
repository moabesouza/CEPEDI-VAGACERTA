import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCallback } from "react";
import { Linking, ScrollView } from 'react-native'; 
import { Empresa, Vaga } from "../../@types/job";
import { Button } from "../../components/Button";
import { Logo } from "../../components/Logo";
import { INavigationProps } from "../RootStackParams";
import {Content,Description,Header,Splitter,Title,Wrapper,} from "./styles";

export default function Detail() {
  const route = useRoute();
  const { empresa, vagas } = route.params as { empresa: Empresa, vagas: Vaga[] };
  const { goBack } = useNavigation<INavigationProps>();

  const handleGoBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleContact = useCallback((telefone: string) => {
    const url = `whatsapp://send?phone=${telefone}`;

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        console.log("Não é possível abrir o WhatsApp");
      }
    });
  }, []);

  return (
    <Wrapper>
      <Header>
        <Button
          noSpacing
          title="< voltar"
          variant="secondary"
          onPress={handleGoBack}
        />
        <Logo />
      </Header>

      <Splitter />

      <ScrollView> 
        <Content>
          <Title>{empresa.nome}</Title>
          <Description>Localização: {empresa.localizacao}</Description>
          <Description>Telefone: {empresa.telefone}</Description>
          <Splitter />
          {vagas.map(vaga => ( 
            <React.Fragment key={vaga.id}>
              <Title>{vaga.titulo}</Title>
              <Description>{vaga.descricao}</Description>
              <Button title="Entrar em contato" onPress={() => handleContact(empresa.telefone)} />
              <Splitter />
            </React.Fragment>
          ))}
        </Content>
      </ScrollView> 
    </Wrapper>
  );
}
