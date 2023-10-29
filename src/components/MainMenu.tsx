import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AxiosError } from "axios";
import { devices } from "./constants";
import "../mainMenu.css";
import { useRequest } from "../hooks/useRequest";
import Placeholder from 'react-bootstrap/Placeholder';

export interface PlayersInterface {
  id: string;
  name: string;
  isFinished: boolean;
  subPoints: number;
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
  @media only screen and ${devices.md} {
    width: 50%;
  }
  width: 100%;
`;

const TodayTablePlayers = styled.td`
  text-align: center;
  font-size: 20px;
  width: 40%;
`;

const PlayButton = styled.button`
  height: 50px;
  width: 90%;
  position: fixed;
  bottom: 16px;
`;

const TablesDiv = styled.div`
  margin-bottom: 70px;

  @media only screen and ${devices.md} {
    display: flex;
    gap: 64px;
  }
`;

const ClassificationTable = styled.table`
  width: 100%;
  
  @media only screen and ${devices.md} {
    display: block;
    overflow-x: auto;
    width: 50%;
  }
`;

const Position = styled.th`
  @media only screen and ${devices.md} {
    width: 1% !important;
  }
`;

const NameHeader = styled.th`
  @media only screen and ${devices.md} {
    width: 50%;
  }
`;
const NameRow = styled.td`
  @media only screen and ${devices.md} {
    width: 30%;
  }
  width: 20%;
`;

const TableHeader = styled.th`
  @media only screen and ${devices.md} {
    text-align: center;
  }
`;

const TableRow = styled.th`
  @media only screen and ${devices.md} {
  }
  text-align: center;
`;

const GameTableRow = styled.td`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const TodayGamesHead = styled.thead`
  height: 40px;
`;

export default function MainMenu() {
  const [todayGames, setTodayGames] = useState<
    { data?: TodayGamesInterface[]; errorMessage?: string; isLoading?: boolean; }
  >();
  const [classification, setClassification] = useState<
    { data?: ClassificationInterface[]; errorMessage?: string; isLoading?: boolean }
  >();

  const request = useRequest();
  const navigate = useNavigate();

  const now = new Date();
  const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;

  useEffect(function onMountFetchTodayGames() {
    setTodayGames(prevState => ({ ...prevState, isLoading: true }));
    
    const fetchData = async () => {
      try {
        const result = await request.get("/games/today");

        if (result.data) {
          setTodayGames({ data: result.data, isLoading: false });
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.data.message) {
            setTodayGames({ errorMessage: error.response.data.message, isLoading: false });
          }
        }
      }
    };

    fetchData();
  }, []);

  useEffect(function onMountFetchClassification() {
    setClassification(prevState => ({ ...prevState, isLoading: true }));
    
    const fetchData = async () => {
      try {
        const result = await request.get("/users/classification");

        if (result.data) {
          setClassification({ data: result.data, isLoading: false });
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.data.message) {
            setClassification({ errorMessage: error.response.data.message, isLoading: false });
          }
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="Container">
      <h1>Quiz Halloween 2023</h1>
      <Content className="inner-container">
        <TablesDiv className="tables">
          {classification?.isLoading ? (
            <Placeholder animation="glow" style={{ width: '50%' }}>
              <Placeholder xs={12} style={{ height: 291 }} />
            </Placeholder>
          ) : null}
          {classification?.data && classification.data.length > 0 ? (
            <ClassificationTable className="table table-striped table-hover main-table">
              <thead className="table-dark">
                <tr className="table-headers">
                  <Position scope="col">#</Position>
                  <NameHeader scope="col">Imię</NameHeader>
                  <TableHeader scope="col">Punkty</TableHeader>
                  <TableHeader scope="col">Małe Punkty</TableHeader>
                  <TableHeader scope="col">Wygrane</TableHeader>
                  <TableHeader scope="col">Remisy</TableHeader>
                  <TableHeader scope="col">Przegrane</TableHeader>
                </tr>
              </thead>
              <tbody className="table-dark">
                {classification.data.map(
                  ({ id, position, name, games, points, subPoints }) => (
                    <tr key={id}>
                      <Position>{position}</Position>
                      <NameRow>{name}</NameRow>
                      <TableRow>{points}</TableRow>
                      <TableRow>{subPoints}</TableRow>
                      <TableRow>{games.won}</TableRow>
                      <TableRow>{games.draw}</TableRow>
                      <TableRow>{games.lose}</TableRow>
                    </tr>
                  )
                )}
              </tbody>
            </ClassificationTable>
          ) : null}
          {classification?.errorMessage ? (
            <div style={{ color: "red" }}>{classification?.errorMessage}</div>
          ) : null}
          {todayGames?.isLoading ? (
            <Placeholder animation="glow" style={{ width: '50%' }}>
              <Placeholder xs={12} style={{ height: 191 }} />
            </Placeholder>
          ) : null}
          {todayGames?.data && todayGames.data.length > 0 ? (
            <TodayTable>
              <TodayGamesHead>
                <tr>
                  <th scope="col" colSpan={3}>
                    {date}
                  </th>
                </tr>
              </TodayGamesHead>
              <tbody className="table-group-divider">
                {todayGames.data.map(({ players }) => (
                  <GameTableRow>
                    <TodayTablePlayers>
                      {players[0].name}{" "}
                      {players[0].subPoints != undefined ? (
                        <> &bull; {players[0].subPoints}</>
                      ) : null}
                    </TodayTablePlayers>
                    <td> vs </td>
                    <TodayTablePlayers>
                      {players[1].subPoints != undefined ? (
                        <>{players[1].subPoints} &bull; </>
                      ) : null}
                      {players[1].name}{" "}
                    </TodayTablePlayers>
                  </GameTableRow>
                ))}
              </tbody>
            </TodayTable>
          ) : null}
          {todayGames?.errorMessage ? (
            <div style={{ color: "red" }}>{todayGames?.errorMessage}</div>
          ) : null}
        </TablesDiv>

        <PlayButton
          type="button"
          className="button-play btn btn-warning"
          onClick={() => navigate("/play")}
        >
          Zagraj
        </PlayButton>
      </Content>
    </div>
  );
}
