import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

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

const AnswerListElement = styled.li<{ disabled: boolean }>`
	background-color: #ffc107;
	border: none;
	margin-top: 15px;
	height: 60px;
	opacity: ${({ disabled }) => disabled ? '0.5' : '1'};
`;

function Gameboard() {
	const [game, setGame] = useState<{ data?: GameInterface[]; errorMessage?: string }>();
	const [isSaving, setIsSaving] = useState(false);
	const [activeQuestion, setActiveQuestion] = useState(0);
	const [isFinished, setFinished] = useState(false);

	const request = useRequest();
	const navigate = useNavigate();

	useEffect(function onMountFetchGameData() {
		const fetchData = async () => {
			try {
				const result = await request.get(`/games/current`);

				if (result.data?.questions) {
					setGame({ data: result.data.questions });
				} else {
					setGame({ errorMessage: 'Nie udało się pobrać pytań dla gry.' });
				}
			} catch (error) {
				if (error instanceof AxiosError) {
					if (error.response?.data.message) {
						setGame({ errorMessage: error.response?.data.message });
					}
				} else {
					setGame({ errorMessage: 'Nie udało się pobrać pytań dla gry.' });
				}
			}
		};

		fetchData();
	}, []);

	useEffect(
		function onFinish() {
			if (isFinished) {
				navigate('/over');
			}
		},
		[isFinished]
	);

	const gameError = game?.errorMessage;
	const gameData = game?.data;

	if (gameError) {
		return <span style={{ color: 'red', textAlign: 'center', display: 'flex', alignItems: 'center' }}>{game.errorMessage}</span>;
	}

	if (!gameData?.length) {
		return <span style={{ textAlign: 'center', display: 'flex', alignItems: 'center' }}>Trwa pobieranie pytań dla rozgrywki...</span>;
	}

	const gameQuestion = gameData[activeQuestion];

	const addPoints = async (answer?: string) => {
		setIsSaving(true);
		await request.post('/games/current', {
			answer: {
				questionId: gameQuestion.id,
				value: answer ?? '',
			},
		});

		setIsSaving(false);
	};

	const nextQuestion = async () => {
		if (activeQuestion < gameData.length - 1) {
			setActiveQuestion((prev) => prev + 1);
		} else {
			setFinished(true);
		}
	};

	return (
		<Container>
			<Header>
				<QuestionDiv>
					<h1>{gameQuestion.question}</h1>
				</QuestionDiv>

				<TimerDiv>
					<div className='timer'>
						{!isFinished ? (
							<Timer
								key={activeQuestion}
								onFinish={async () => {
									await addPoints();
									nextQuestion();
								}}
								initTime={10}
							/>
						) : null}
					</div>
				</TimerDiv>
			</Header>

			<AnswersDiv key={activeQuestion}>
				<ul className='list-group'>
					{gameQuestion.answers.map(({ label, value }) => (
						<AnswerListElement
							key={label}
							value={value}
							className='list-group-item list-group-item-action'
							disabled={isSaving}
							onClick={async () => {
								if (isSaving) {
									return;
								}
								
								await addPoints(value);
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
