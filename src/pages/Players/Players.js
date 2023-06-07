import { useEffect, useState } from 'react';
import './Players.css';
import axios from 'axios';
import Loader from '../../components/UI/Loader';
import { ArrowUp, ArrowDown} from 'react-bootstrap-icons';

const Players = () => {
    const [players, setPlayers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSortedByRate, setIsSortedByRate] = useState(false);
    const [filterByGender, setFilterByGender] = useState(2);

    const selectedCompetitionId = localStorage.getItem('selectedCompetitionId');

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const {data} = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/competition/${selectedCompetitionId}/players`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
            setPlayers(data.players);
            localStorage.setItem('players', JSON.stringify(data.players));
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    useEffect(() => {
        const players = JSON.parse(localStorage.getItem('players'))
        if(filterByGender < 2) {
            const filterByGenderArr = players.filter(player => player.gender === Number(filterByGender));
            setPlayers(filterByGenderArr);
        } else {
            setPlayers(players);
        }
        setIsSortedByRate(false);
    }, [filterByGender]);

    const sortByRate = () => {
        setIsSortedByRate(!isSortedByRate);
        const sortedData = !isSortedByRate ? players.sort((a, b) => a.currentRating - b.currentRating) : players.sort((a, b) => b.currentRating - a.currentRating);
        setPlayers(sortedData);
    }

    return(
        <div className='players-container'>
            <div className="players-header">
                <h2 className='players-title'>
                    Таблица участников
                </h2>
                <select defaultValue={filterByGender} onChange={e => setFilterByGender(e.target.value)}>
                    <option value={2}>МЖ</option>
                    <option value={0}>М</option>
                    <option value={1}>Ж</option>
                </select>
            </div>
            <div className='players-table-wrapper'>
                {players.length ? 
                <table className='players-table'>
                <thead>
                    <tr>
                        <th>№</th>
                        <th className='players-table-name'>ФИО</th>
                        <th 
                            style={{cursor: 'pointer'}}
                            onClick={() => sortByRate()}>
                                Рейтинг {isSortedByRate ? <ArrowDown /> : <ArrowUp />}
                        </th>
                        <th>И</th>
                        <th>В</th>
                        <th>П</th>
                        <th>ЗМ</th>
                        <th>ПМ</th>
                        <th>РМ</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        players.map((player, index) => {
                            return <tr className='players-table-info' key={player.playerId}>
                                <th>{index + 1}</th>
                                <th className='players-table-name'>{player.middleName} {player.firstName} {player.lastName}</th>
                                <th>{player.currentRating}</th>
                                <th>{player.winGameCount + player.loseGameCount}</th>
                                <th>{player.winGameCount}</th>
                                <th>{player.loseGameCount}</th>
                                <th>{player.scored}</th>
                                <th>{player.missed}</th>
                                <th>{player.scored - player.missed}</th>
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