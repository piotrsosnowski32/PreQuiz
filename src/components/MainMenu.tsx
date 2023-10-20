import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import "../mainMenu.css";

const classification = [
    {id: "1", name: "Jula", position: 1, games:{ win:2, draw:1, lose:0 }, points: 7, subPoints:130},
    {id: "2", name: "Paweł", position: 2, games:{ win:1, draw:1, lose:1 }, points: 4, subPoints:100},
    {id: "3", name: "Dawid", position: 3, games:{ win:0, draw:0, lose:3 }, points: 0, subPoints:30},
    {id: "4", name: "Gabi", position: 4, games:{ win:2, draw:1, lose:0 }, points: 7, subPoints:130},
    {id: "5", name: "Grzegorz", position: 5, games:{ win:1, draw:1, lose:1 }, points: 4, subPoints:100},
    {id: "6", name: "Ola", position: 6, games:{ win:0, draw:0, lose:3 }, points: 0, subPoints:30}
]
 
const todayGames = [
    {id: "1", players: [ {id:"1", name:"Jula", isFinished:true}, {id:"2", name:"Paweł", isFinished:true} ]},
    {id: "2", players: [ {id:"3", name:"Dawid", isFinished:true}, {id:"6", name:"Ola", isFinished:true} ]},
    {id: "3", players: [ {id:"5", name:"Grzegorz", isFinished:true}, {id:"4", name:"Gabi", isFinished:true} ]}
]

const Content = styled.div`
    display: flex;
`;



export default function MainMenu() {
    const navigate = useNavigate();

    return (
        <div className='Container'>
            <h1>Siemaneczko!</h1>
            <Content className='inner-container'>
                <div className='tables'>
                    <table className="table table-striped table-hover main-table">
                        <thead className='table-dark' >
                            <tr className='table-headers'>
                                <th className='position' scope="col" >#</th>
                                <th className='name' scope="col">Imię</th>
                                <th scope="col">Punkty</th>
                                <th scope="col">Małe Punkty</th>
                                <th scope="col">Wygrane</th>
                                <th scope="col">Remisy</th>
                                <th scope="col">Przegrane</th>
                            </tr>
                        </thead>
                        <tbody className='table-dark'>
                            {
                                classification.map(({id,position, name, games,points, subPoints}) => (
                                    <tr key={id}>
                                        <th className='position' scope="row">{position}</th>
                                        <td className='name'>{name}</td>
                                        <td>{points}</td>
                                        <td>{subPoints}</td>
                                        <td>{games.win}</td>
                                        <td>{games.draw}</td>
                                        <td>{games.lose}</td>
                                    </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col" colSpan={3}>DATA</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {
                                todayGames.map(({id, players}) => (
                                    <tr>
                                        <td>{players[0].name}</td>
                                        <td>vs</td>
                                        <td>{players[1].name}</td>
                                    </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                </div>
                    <button type="button" className="button-play btn btn-warning" onClick={() =>navigate("/play")}>
                        Zagraj
                    </button>
            </Content>
        </div>
    )
}
