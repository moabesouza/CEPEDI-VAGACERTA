
import { Container, Title } from "./styles";
import { TouchableOpacityProps, GestureResponderEvent } from "react-native"; // Importe GestureResponderEvent

interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  variant?: "primary" | "secondary";
  noSpacing?: boolean;
}

export function Button({
  title,
  variant = "primary",
  noSpacing = false,
  ...others
}: ButtonProps) {
  return (
    <Container {...others} $variant={variant} $noSpacing={noSpacing}>
      <Title $variant={variant}>{title}</Title>
    </Container>
  );
}

