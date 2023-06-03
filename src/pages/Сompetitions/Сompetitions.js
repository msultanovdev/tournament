import './Competitions.css';
import CompetitionItem from '../../components/competition/CompetitionItem';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Context } from '../..';
import { Button } from 'react-bootstrap';
import Loader from '../../components/UI/Loader';
import CreateModal from '../../components/createModal/CreateModal';
import { observer } from 'mobx-react-lite';

const Competitions = () => {
    const {store} = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreateModal, setIsCreateModal] = useState(false);

    const token = localStorage.getItem('token');

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const {data} = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/competition`, {headers: {Authorization: `Bearer ${token}`}});
            store.setCompetitions(data.value.competition);
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const addCompetition = async () => {
        setIsCreateModal(true);
    }

    return(
        <div className="competitions-container">
            <div 
                className={`${isCreateModal && 'competitions-mask'}`}
                onClick={() => setIsCreateModal(false)}
            ></div>
            <h2 className="competitions-title">Соревнования</h2>
            <div className="competitions-items">
                {store.joinedCompetition && store.joinedCompetition.map(competition => {
                    const data = new Date(competition.startDateTime);
                    const parsedData = new Intl.DateTimeFormat('ru', {weekday: 'short', month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'}).format(data);
                    return (<div key={competition.id} style={{display: 'flex', flexDirection: 'column', width: '100%', textAlign: 'center'}}>
                        <p style={{fontSize: '1.2rem'}}>Вы зарегистрированы:</p>
                        <CompetitionItem id={competition.id} date={parsedData} title={competition.title} />
                        <hr />
                    </div>)
                })}
            <p className="competition-danger-text">*Внимание. Вы можете зарегистрироваться только на один турнир!*</p>
                {(store.competitions.length && store.joinedCompetition.length) ? store.competitions.map(competition => {
                        if(competition.id === store.joinedCompetition[0].id) {
                            return null;
                        }
                        const data = new Date(competition.startDateTime);
                        const parsedData = new Intl.DateTimeFormat('ru', {weekday: 'short', month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'}).format(data);
                        return <CompetitionItem key={competition.id} id={competition.id} date={parsedData} title={competition.title} />
                }) : (store.competitions.length) ? store.competitions.map(competition => {
                    const data = new Date(competition.startDateTime);
                    const parsedData = new Intl.DateTimeFormat('ru', {weekday: 'short', month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'}).format(data);
                    return <CompetitionItem key={competition.id} id={competition.id} date={parsedData} title={competition.title} />
            }) : "Увы, соревнований нет!"}
            {isLoading && <div className='loader-wrapper'>
                <Loader /></div>}
            </div>
            {store.role === 'Admin' && 
                <Button 
                    style={{margin: "15px 0"}} 
                    variant='success'
                    onClick={() => addCompetition()}
                >Добавить Соревнование</Button>
            }
            {isCreateModal && <CreateModal setModal={setIsCreateModal} />}

        </div>
    );
}

export default observer(Competitions);