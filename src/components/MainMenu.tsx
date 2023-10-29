import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AxiosError } from "axios";
import { devices } from "./constants";
import "../mainMenu.css";
import { useRequest } from "../hooks/useRequest";

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
  width: 150px;
  height: 50px;
`;

const TablesDiv = styled.div`
  @media only screen and ${devices.md} {
    display: flex;
    gap: 64px;
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
    TodayGamesInterface[] | undefined
  >();
  const [classification, setClassification] = useState<
    ClassificationInterface[] | undefined
  >();
  const [todayGameMessage, setTodayGameMessage] = useState<string>();
  const [classificationMessage, setClassificationMessage] = useState<string>();

  const request = useRequest();
  const navigate = useNavigate();

  const now = new Date();
  const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;

  useEffect(function onMountFetchTodayGames() {
    const fetchData = async () => {
      try {
        const result = await request.get("/games/today");

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
        const result = await request.get("/users/classification");

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
    <div className="Container">
      <h1>Quiz Halloween 2023</h1>
      <Content className="inner-container">
        <TablesDiv className="tables">
          {classification && classification.length > 0 ? (
            <table
              className="table table-striped table-hover main-table"
              style={{ display: "block", overflowX: "auto" }}
            >
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
                {classification.map(
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
            </table>
          ) : (
            <div style={{ color: "red" }}>{classificationMessage}</div>
          )}
          {todayGames && todayGames.length > 0 ? (
            <TodayTable>
              <TodayGamesHead>
                <tr>
                  <th scope="col" colSpan={3}>
                    {date}
                  </th>
                </tr>
              </TodayGamesHead>
              <tbody className="table-group-divider">
                {todayGames.map(({ players }) => (
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
          ) : (
            <div style={{ color: "red" }}>{todayGameMessage}</div>
          )}
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
