
import styled from 'styled-components';
import  { useState } from 'react';



const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
// background-color: white;
background-image: url('src/assets/background2.jpg'); 
background-size: 100% 100%;

background-repeat: no-repeat;
background-position: center center;
width: 100%;


`;

const WinnerInfo = styled.div`
position: absolute;
  top: 10%; 
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
`;

const Header = styled.h1`
font-size: 2rem;
//color: #007bff;
margin-bottom: 10px;

`
const Winner = styled.text`
font-size: 2rem;
color: #007bff; /* Przykładowy kolor */

`

const ButtonContainer = styled.div`
position: absolute;
  display: flex;
  justify-content: center; /* Wyśrodkowanie przycisków */
  top: 50%;
 
`;

const Button = styled.button`
margin: 10px;
  padding: 10px 20px;
  transition: transform 0.5s, background-color 0.5s, box-shadow 0.5s; 
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  border: none;
  border-radius: 20px; 
  cursor: pointer;
  text-align: center;
  line-height: 1.5;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
  
  &:hover {
    transform: scale(1.1);
    background-color: rgba(0, 123, 255, 1); 
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); 
  }
`;
const Thanks = styled.div`
position: absolute;
margin-top: 100px;
text-align: center;
color: red;
background-color: rgba(0, 0, 0, 0.7);
color: #fff;
border-radius: 10px;
padding: 5px;

  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);


  animation: fadeIn 1s ease-in-out;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

`;


const EndingView = ({  }) => {
    const [showThanks, setShowThanks] = useState(false);
    const [showParticipants, setShowParticipants] = useState(false);

    const handleShowThanks = () => {
        setShowThanks(!showThanks); 
      };

      const handleShowParticipants = () => {
        setShowParticipants(!showParticipants); 
      };

  return (
    
    <Container>
      <WinnerInfo>
        <Header>Gratulacje!</Header>
        <Winner>Zwycięzca quizu: Ktoś</Winner>
      </WinnerInfo>
      <ButtonContainer>
      <Button onClick={() => window.close()}>Wyjście z gry</Button>
      <Button onClick={handleShowParticipants}>Pokaż wszystkich uczestników</Button>
      {showParticipants && <Thanks>Tu pokażą się użytkownicy</Thanks>}
      <Button onClick={handleShowThanks}>Podziękowania</Button>
        {showThanks && <Thanks>Dziękujemy serdecznie wszystkim uczestnikom naszego quizu za udział w tym wyjątkowym wydarzeniu. Wasza obecność była dla nas niezwykle cenna, a wasza wiedza, zaangażowanie 
        i pasja wzbogaciły tę grę o niezapomniane chwile.Dziękujemy za tworzenie przyjaznej atmosfery, pełnej emocji i radości. Wasza obecność sprawiła, że to wydarzenie było wyjątkowe, a wasza pozytywna energia przyczyniła 
        się do stworzenia niezapomnianych chwil.</Thanks>}
      </ButtonContainer>
      
      
    </Container>
  );
};

export default EndingView;