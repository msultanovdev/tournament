import { Button } from 'react-bootstrap';
import './CompetitionItem.css';
import { useContext, useState } from 'react';
import { Context } from '../..';
import axios from 'axios';
import Loader from '../UI/Loader';
import {Table} from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CompetitionItem = ({id, date, title}) => {
    const {store} = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const fetchData = async () => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/competition/players/${selectedCompetitionId}`, {headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }});
            console.log(data.players);
        } catch (e) {
            console.log(e.response.data.message);
        }
    }

    useEffect(() => {
        fetchData();
    });

    const onRemoveCompetition = async (id) => {
        try {
            setIsLoading(true);
            const {data} = await axios.delete(`${process.env.REACT_APP_BASE_API_URL}/api/competition/delete/${id}`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
            store.setCompetitions(data.competition);
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }

    const joinToCompetition = async (id) => {
        try {
            setIsLoading(true);
            await axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/competition/join`, {participantId: user.id, competitionId: id}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }

    return(
        <div className="competition-container">
                {isLoading && <div className='loading-wrapper'><Loader /></div>}
            <div>
                <h2 className="competition-title">{title}</h2>
                <p className="competition-date">Дата: {date}</p>
            </div>
            <div>
                {(store.role === 'Referee' || store.role === 'Admin') && 
                <Button 
                onClick={() => {navigate('/participants'); localStorage.setItem('selectedCompetitionId', `${id}`)}}
                style={{marginRight: '15px'}}><Table /></Button>}
                {store.role === 'Admin' ? 
                    <>
                        <Button variant='primary'>Редактировать</Button>
                        <Button 
                            onClick={() => onRemoveCompetition(id)}
                            variant='danger' style={{marginLeft: "15px"}}>Удалить</Button>
                    </>
                : store.role === 'Referee' ? <Button>Подробно</Button>
                    :
                    <Button variant='success' onClick={() => joinToCompetition(id)}>Зарегистрироваться</Button>
                }
            </div>
        </div>
    )
}

export default CompetitionItem;