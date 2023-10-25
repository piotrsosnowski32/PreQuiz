import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Timer from './TImer';
import { useRequest } from '../hooks/useRequest';

export interface AnswerInterface {
	value: string;
	label: string;
}

export interface GameInterface {
	id: string;
	question: string;
	answers: AnswerInterface[];
}

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

// TYLKO NA POTRZEBĘ TESTOWANIA
const playerId = '652ebc23b6ad104b4c442d76';

function Gameboard() {
	const [game, setGame] = useState<GameInterface[] | undefined | null>();
	const [activeQuestion, setActiveQuestion] = useState(0);
	const [isFinished, setFinished] = useState(false);
	const [scoreboard, setScoreboard] = useState<{ questionId: string; value: string }[]>([]);

	const request = useRequest();
	const navigate = useNavigate();

	useEffect(function onMountFetchGameData() {
		const fetchData = async () => {
			try {
				const result = await request.get(`/games/${playerId}`);

				if (result.data?.questions) {
					setGame(result.data.questions);
				} else {
					setGame(null);
				}
			} catch {
				setGame(null);
			}
		};

		fetchData();
	}, []);

	useEffect(
		function onFinish() {
			if (isFinished) {
				const saveData = async () => {
					// TODO: to powinno być wysyłane po każdym pytaniu żeby nie utracić odpowiedzi użytkownika
					await request.post(`/games/${playerId}`, {
						answers: scoreboard,
					});
				};

				saveData();
				navigate('/over')
			}
		},
		[isFinished]
	);

	if (game === null) {
		return <span style={{ color: 'red' }}>Nie udało się pobrać pytań dla gry.</span>;
	}

	if (!game?.length) {
		return <span>Trwa pobieranie pytań dla rozgrywki...</span>;
	}

	const addPoints = (answer?: string) => {
		setScoreboard((prev) => [
			...prev,
			{ questionId: game[activeQuestion].id, value: answer ?? '' },
		]);
	};

	const nextQuestion = async () => {
		if (activeQuestion < game.length - 1) {
			setActiveQuestion((prev) => prev + 1);
		} else {
			setFinished(true);
		}
	};

	return (
		<Container>
			<Header>
				<QuestionDiv>
					<h1>{game[activeQuestion].question}</h1>
				</QuestionDiv>

				<TimerDiv>
					<div className='timer'>
						{!isFinished ? (
							<Timer
								key={activeQuestion}
								onFinish={() => {
									addPoints();
									nextQuestion();
								}}
								initTime={5}
							/>
						) : null}
					</div>
				</TimerDiv>
			</Header>

			<AnswersDiv>
				<ul className='list-group'>
					{game[activeQuestion].answers.map(({ label, value }) => (
						<AnswerListElement
							key={label}
							value={value}
							className='list-group-item list-group-item-action'
							onClick={() => {
								addPoints(value);
								nextQuestion();
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
