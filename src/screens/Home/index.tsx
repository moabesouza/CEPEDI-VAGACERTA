import React from 'react';
import { Button } from '../../components/Button';
import { Logo } from "../../components/Logo";
import { Container, Counter, Info, Wrapper, ButtonContainer } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { INavigationProps } from "../RootStackParams";
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import api from "../../lib/api";
import { Empresa } from "../../@types/job";

export default function Home() {
  const [currentLocation, setCurrentLocation] = useState<Region>();
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const { navigate } = useNavigation<INavigationProps>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const empresasData = await api.empresa.get();
        if (empresasData) setEmpresas(empresasData);
      } catch (error) {
        console.error("Erro ao obter empresas:", error);
      }
    };

    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permissão negada");
          return;
        }

        let location = await Location.getCurrentPositionAsync();
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (error) {
        console.error("Erro ao obter a localização:", error);
      }
    };

    fetchData();
    getLocation();
  }, []);

  const handleGoToProfile = useCallback(() => {
    navigate("Profile");
  }, [navigate]);

  const handleGoToLogin = useCallback(() => {
    navigate("Login");
  }, [navigate]);

  const handleMarkerPress = useCallback((empresa: Empresa) => {
    navigate("Detail", { empresa, vagas: empresa.vagas });
  }, [navigate]);

  return (
    <Wrapper>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ width: "100%", height: "100%", flex: 4 }}
        initialRegion={currentLocation}
      >
        {empresas.length > 0 &&
          empresas.map((empresaItem) => (
            <Marker
              key={empresaItem.id}
              onPress={() => handleMarkerPress(empresaItem)}
              coordinate={{
                latitude: empresaItem.latitude,
                longitude: empresaItem.longitude,
              }}
            />
          ))}
      </MapView>
      <Container>
        <Logo />
        <Counter>{empresas.length} empresas contratando.</Counter>
        <Info>Clique no marcador para saber mais sobre a vaga.</Info>
        <ButtonContainer>
          <Button title="Ver meus dados" onPress={handleGoToProfile} style={{ width: 150 }} />
          <Button title="Sair" onPress={handleGoToLogin} style={{ width: 150, backgroundColor: '#2d767f' }} />
        </ButtonContainer>
      </Container>
    </Wrapper>
  );
}
