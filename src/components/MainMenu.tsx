import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AxiosError } from 'axios';

import '../mainMenu.css';
import { useRequest } from '../hooks/useRequest';

export interface PlayersInterface {
	id: string;
	name: string;
	isFinished: boolean;
}

export interface TodayGamesInterface {
	id: string;
	players: PlayersInterface[];
}

export interface GamesInterface {
	won: number;
	draw: number;
	lose: number;
}

export interface ClassificationInterface {
	id: string;
	name: string;
	position: number;
	games: GamesInterface;
	points: number;
	subPoints: number;
}

const Content = styled.div`
	display: flex;
`;

const TodayTable = styled.table`
	width: 100%;
`;

const TodayTablePlayers = styled.td`
	width: 45%;
`;

const PlayButton = styled.button`
	width: 50%;
	height: 50%;
`;

export default function MainMenu() {
	const [todayGames, setTodayGames] = useState<TodayGamesInterface[] | undefined>();
	const [classification, setClassification] = useState<ClassificationInterface[] | undefined>();
	const [todayGameMessage, setTodayGameMessage] = useState<string>();
	const [classificationMessage, setClassificationMessage] = useState<string>();

	const request = useRequest();
	const navigate = useNavigate();

	const now = new Date();
	const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;

	useEffect(function onMountFetchTodayGames() {
		const fetchData = async () => {
			try {
				const result = await request.get('/games/today');

				if (result.data) {
					setTodayGames(result.data);
				}
			} catch (error) {
				if (error instanceof AxiosError) {
					if (error.response?.data.message) {
						setTodayGameMessage(error.response.data.message);
					}
				}
			}
		};

		fetchData();
	}, []);

	useEffect(function onMountFetchClassification() {
		const fetchData = async () => {
			try {
				const result = await request.get('/users/classification');

				if (result.data) {
					setClassification(result.data);
				}
			} catch (error) {
				if (error instanceof AxiosError) {
					if (error.response?.data.message) {
						setClassificationMessage(error.response.data.message);
					}
				}
			}
		};

		fetchData();
	}, []);

	return (
		<div className='Container'>
			<h1>Siemaneczko!</h1>
			<Content className='inner-container'>
				<div className='tables'>
					{classification && classification.length > 0 ? (
						<table className='table table-striped table-hover main-table'>
							<thead className='table-dark'>
								<tr className='table-headers'>
									<th className='position' scope='col'>
										#
									</th>
									<th className='name' scope='col'>
										Imię
									</th>
									<th scope='col'>Punkty</th>
									<th scope='col'>Małe Punkty</th>
									<th scope='col'>Wygrane</th>
									<th scope='col'>Remisy</th>
									<th scope='col'>Przegrane</th>
								</tr>
							</thead>
							<tbody className='table-dark'>
								{classification.map(({ id, position, name, games, points, subPoints }) => (
									<tr key={id}>
										<th className='position' scope='row'>
											{position}
										</th>
										<td className='name'>{name}</td>
										<td>{points}</td>
										<td>{subPoints}</td>
										<td>{games.won}</td>
										<td>{games.draw}</td>
										<td>{games.lose}</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<div style={{ color: 'red' }}>{classificationMessage}</div>
					)}
					{todayGames && todayGames.length > 0 ? (
						<TodayTable>
							<thead>
								<tr>
									<th scope='col' colSpan={3}>
										{date}
									</th>
								</tr>
							</thead>
							<tbody className='table-group-divider'>
								{todayGames.map(({ players }) => (
									<tr>
										<TodayTablePlayers>{players[0].name}</TodayTablePlayers>
										<td>vs</td>
										<TodayTablePlayers>{players[1].name}</TodayTablePlayers>
									</tr>
								))}
							</tbody>
						</TodayTable>
					) : (
						<div style={{ color: 'red' }}>{todayGameMessage}</div>
					)}
				</div>
				<PlayButton
					type='button'
					className='button-play btn btn-warning'
					onClick={() => navigate('/play')}
				>
					Zagraj
				</PlayButton>
			</Content>
		</div>
	);
}
