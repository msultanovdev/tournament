import { Button } from 'react-bootstrap';
import './CompetitionItem.css';
import { useContext, useState } from 'react';
import { Context } from '../..';
import axios from 'axios';
import Loader from '../UI/Loader';
import {Table} from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

const CompetitionItem = ({id, date, title}) => {
    const {store} = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    useEffect(() => {
        if(user.competitionId) {
            store.isJoinDisabled = true;
            store.setJoinedCompetition(store.competitions.filter(comp => comp.id === user.competitionId));
        }
    }, []);

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
            const {data} = await axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/competition/join`, {participantId: user.id, competitionId: id}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
            localStorage.setItem('user', JSON.stringify(data));
            setUser(data);
            store.setJoinedCompetition(store.competitions.filter(comp => comp.id === data.competitionId));
            store.isJoinDisabled = true;
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }

    const leaveCompetition = async (id) => {
        try {
            setIsLoading(true);
            const {data} = await axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/competition/leave`, {participantId: user.id, competitionId: id}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
            localStorage.setItem('user', JSON.stringify(data));
            setUser(data);
            store.setJoinedCompetition([]);
            store.isJoinDisabled = false;
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }

    const navigateToChoice = () => {
        localStorage.setItem('selectedCompetitionId', id);
        navigate('/choice');
    }

    return(
        <div className="competition-container" onClick={() => navigateToChoice()}>
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
                    <>
                       {!(user.competitionId === id) ? 
                       <>
                       <Button 
                        onClick={() => {navigate('/choice/players'); localStorage.setItem('selectedCompetitionId', `${id}`)}}
                        style={{marginRight: '15px'}}><Table /></Button>
                       <Button variant='success' 
                        disabled={store.isJoinDisabled}
                        onClick={() => joinToCompetition(id)}>Зарегистрироваться</Button>
                       </> : 
                       <>
                       <Button 
                        onClick={() => {navigate('/choice/players'); localStorage.setItem('selectedCompetitionId', `${id}`)}}
                        style={{marginRight: '15px'}}><Table /></Button>
                       <Button variant='danger' onClick={() => leaveCompetition(id)}>Покинуть Турнир</Button>
                       </>} 
                    </>
                }
            </div>

        </div>
    )
}

export default observer(CompetitionItem);