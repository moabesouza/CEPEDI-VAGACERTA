import { useNavigation } from "@react-navigation/native";
import * as Device from "expo-device";
import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { Empresa } from "../../@types/job";
import { Button } from "../../components/Button";
import { Logo } from "../../components/Logo";
import api from "../../lib/api";
import { INavigationProps } from "../RootStackParams";
import { Container, Counter, Info, Wrapper } from "./styles";

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
  }, []);

  const handleMarkerPress = useCallback((empresa: Empresa) => {
    navigate("Detail", { empresa, vagas: empresa.vagas });
  }, []);
  return (
    <Wrapper>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{
          width: "100%",
          height: "100%",
          flex: 4,
        }}
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
        <Button title="Ver meus dados" onPress={handleGoToProfile} />
      </Container>
    </Wrapper>
  );
}
