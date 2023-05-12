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
    const [competitions, setCompetitions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreateModal, setIsCreateModal] = useState(false);

    const token = localStorage.getItem('token');

    const {store} = useContext(Context);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const {data} = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/competition`, {headers: {Authorization: `Bearer ${token}`}});
            setCompetitions(data.competition);
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
                {competitions ? competitions.map(competition => {
                    const data = new Date(competition.startDateTime);

                    return <CompetitionItem key={competition.id} date={data} title={competition.title} />
                }) : "Увы, соревнований нет!"}
                {/* <CompetitionItem date={date} title="Турнир выходного дня" /> */}
            {isLoading && <Loader />}
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