import { useEffect, useState } from 'react';
import './Players.css';
import axios from 'axios';
import Loader from '../../components/UI/Loader';

const Players = ({competitionId}) => {
    const [players, setPlayers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const selectedCompetitionId = localStorage.getItem('selectedCompetitionId');

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const {data} = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/competition/${selectedCompetitionId}/players`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
            setPlayers(data.players);
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <div className='players-container'>
            <h2 className='players-title'>
                Таблица участников
            </h2>
            <div className='players-table-wrapper'>
                {players.length ? 
                <table className='players-table'>
                <thead>
                    <tr>
                        <th>№</th>
                        <th className='players-table-name'>ФИО</th>
                        <th>Рейтинг</th>
                        <th>ЗМ</th>
                        <th>ПМ</th>
                        <th>В</th>
                        <th>П</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        players.map((player, index) => {
                            return <tr className='players-table-info' key={player.playerId}>
                                <th>{index + 1}</th>
                                <th className='players-table-name'>{player.firstName} {player.middleName} {player.lastName}</th>
                                <th>{player.currentRating}</th>
                                <th>{player.scored}</th>
                                <th>{player.missed}</th>
                                <th>{player.winGameCount}</th>
                                <th>{player.loseGameCount}</th>
                            </tr>
                        })
                    }
                </tbody>
            </table> : 'Таблица Пуста'    
            }
                {isLoading && <div className='loader-wrapper'>
                            <Loader />
                        </div>}
            </div>
        </div>
    )
}

export default Players;