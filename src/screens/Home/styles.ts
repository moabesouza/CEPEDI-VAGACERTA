import styled from "styled-components/native";

export const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;



export const Container = styled.View`
  flex: 1;
  align-items: center;

  width: 100%;
  padding: 16px;
  gap: 10px;

  background-color: #ecfffb;
  margin-bottom: 0px; 
`;


export const Counter = styled.Text`
  font-size: 14px;
  font-weight: bold;
  line-height: 16px;
  text-align: left;
`;

export const Info = styled.Text`
  font-size: 14px;
  line-height: 16px;
  text-align: left;
`;
 
export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

