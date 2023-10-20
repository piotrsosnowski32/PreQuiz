import styled from "styled-components";
import { useState, useEffect } from "react";
import Timer from "./TImer";
import { act } from "react-dom/test-utils";
import { Prev } from "react-bootstrap/esm/PageItem";

const game = [
    {
      id: "1", 
      question:"Które miasto to stolica Polski?", 
      answers:[ 
        {value: "a", label:"Kraków"}, 
        {value: "b", label:"Warszawa"}, 
        {value: "c", label:"Rzeszów"},
        {value: "d", label:"Wrocław"} ]
    },
    {
      id: "2", 
      question:"Gdzie raki zimują?", 
      answers:[ 
        {value: "a", label:"Tutaj"}, 
        {value: "b", label:"Tam"}, 
        {value: "c", label:"Nigdzie"},
        {value: "d", label:"Wrocław"} ]
    }
]

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-wrap: break-word;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const QuestionDiv = styled.div`
  width: 95%;
`;

const TimerDiv = styled.div`
  display: flex;
  justi: right;
  width: 5%;
`;

const AnswersDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const AnswerListElement = styled.li`
  background-color: #ffc107;
  border: none;
  margin-top: 15px;
  height: 60px;
`;
/*
const ContinueButton = styled.button`
  width: 150px;
  height: 50px;
  margin-top: 25px;
`;*/

const scoreBoard: { QuestID: string, AnsID: string }[] = [];

function Gameboard() {

const addPoints = () => {
  scoreBoard.push({
    QuestID: game[activeQuestion].id,
    AnsID: "",
  });
}

const [activeQuestion, setActiveQuestion] = useState(0)
const [isFinished, setFinished] = useState(false)

const nextQuestion = () => {
  if (activeQuestion < game.length - 1) {
    setActiveQuestion((prev) => prev + 1);
  } else {
    setFinished(true)
    console.log("podsumowanie");
    console.log(scoreBoard);
  }
}

 return (
    <Container>
      <Header>
        <QuestionDiv>
          <h1>{game[activeQuestion].question}</h1>
        </QuestionDiv>

        <TimerDiv>
            <div className="timer">
              {!isFinished?(
                <Timer key={activeQuestion} onFinish={() => {
                              addPoints();
                              nextQuestion();
              }} initTime={5} />
              ):null}
              
            </div>
        </TimerDiv>
      </Header>

      <AnswersDiv>
        <ul className="list-group">
          {game[activeQuestion].answers.map(({ label, value }) => (
            <AnswerListElement
              key={label}
              value={value}
              className="list-group-item list-group-item-action"
              onClick={() => {
                    addPoints();
                    nextQuestion()
              }} 
            >
              {label}
            </AnswerListElement>
          ))}
        </ul>
      </AnswersDiv>
    </Container>
  );
}

export default Gameboard;
