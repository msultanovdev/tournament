import { useContext, useEffect, useRef, useState } from 'react';
import './Participants.css';
import { Context } from '../..';
import axios from 'axios';
import Loader from '../../components/UI/Loader';
import { Button } from 'react-bootstrap';

const Participants = () => {
    const {store} = useContext(Context);
    const [participants, setParticipants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckedParts, setIsCheckedParts] = useState([]);
    const [isCheckedBlocked, setIsCheckedBlocked] = useState([]);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const {data} = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/competition/players/88d3eefc-af3c-4ffa-bd2f-ba02f81a7b3a`, {headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }});
            setParticipants(data.players);
            store.setPlayers(data.players);
            const boolsParts = data.players.map(player => player.isParticipation);
            const boolsBlocked = data.players.map(player => player.isBlocked);
            setIsCheckedParts(boolsParts);
            setIsCheckedBlocked(boolsBlocked);
        } catch (e) {
            console.log(e.response.data.message);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    const handleIsParticipation = (e, playerId, index) => {
        const newBools = isCheckedParts.map((bool, idx) => idx === index ? !bool : bool);
        setIsCheckedParts(newBools);
        const newPlayers = store.players.map((player) => { 
            return {
                    playerId: player.playerId,
                    firstName: player.firstName,
                    middleName: player.middleName,
                    lastName: player.lastName,
                    isParticipation: player.playerId === playerId ? !player.isParticipation : player.isParticipation,
                    isBlocked: player.isBlocked
                }
        });

        store.setPlayers(newPlayers);
    }

    const handleIsBlocked = (e, playerId, index) => {
        const newBools = isCheckedBlocked.map((bool, idx) => idx === index ? !bool : bool);
        setIsCheckedBlocked(newBools);
        const newPlayers = store.players.map((player) => { 
            return {
                    playerId: player.playerId,
                    firstName: player.firstName,
                    middleName: player.middleName,
                    lastName: player.lastName,
                    isParticipation: player.isParticipation,
                    isBlocked: player.playerId === playerId ? !player.isBlocked : player.isBlocked
                }
        });

        store.setPlayers(newPlayers);
    }

    const saveChanges = async () => {
        try {
            setIsLoading(true);
            const res = await axios.put(`${process.env.REACT_APP_BASE_API_URL}/api/competition/players/88d3eefc-af3c-4ffa-bd2f-ba02f81a7b3a`, store.players, 
            {headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }});
            console.log(res);
        } catch (e) {
            console.log(e.response.data.message); 
        } finally {
            setIsLoading(false);
        }
    }

    return(
        <div className='parts-container'>
            <h2 className='parts-title'>
                Таблица участников
            </h2>
            <div className='parts-table-wrapper'>
                <table className='parts-table'>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th className='parts-table-name'>ФИО</th>
                            <th>Рейтинг</th>
                            <th>Участвовал</th>
                            <th>Заблокировать</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            participants && participants.map((player, index) => {
                                // const initMiddleName = player.middleName[0];
                                // const initLastName = player.lastName[0];
                                return <tr className='parts-table-info' key={player.playerId}>
                                    <th>{index + 1}</th>
                                    <th className='parts-table-name'>{player.firstName} {player.middleName} {player.lastName}</th>
                                    <th>{player.currentRating}</th>
                                    {store.role === 'Referee' && 
                                        <>
                                            <th>
                                                <input 
                                                    onChange={(e) => handleIsParticipation(e, player.playerId, index)}
                                                    checked={isCheckedParts[index]}
                                                    type='checkbox'
                                                    className='table-checkbox' 
                                            />
                                            </th>
                                            <th>
                                                <input 
                                                    onChange={(e) => handleIsBlocked(e, player.playerId, index)}
                                                    checked={isCheckedBlocked[index]}
                                                    type='checkbox'
                                                    className='table-checkbox'
                                                />
                                            </th>
                                        </>
                                    }
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                {isLoading && <div className='loader-wrapper'>
                            <Loader />
                        </div>}
                <Button variant='success' onClick={() => saveChanges()}>Сохранить</Button>
            </div>
        </div>
    );
}

export default Participants;