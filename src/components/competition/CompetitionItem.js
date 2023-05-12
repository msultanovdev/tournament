import { Button } from 'react-bootstrap';
import './CompetitionItem.css';
import { useContext, useState } from 'react';
import { Context } from '../..';
import axios from 'axios';
import Loader from '../UI/Loader';

const CompetitionItem = ({id, date, title}) => {
    const {store} = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);

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

    return(
        <div className="competition-container">
                {isLoading && <div className='loading-wrapper'><Loader /></div>}
            <div>
                <h2 className="competition-title">{title}</h2>
                <p className="competition-date">Дата: {date}</p>
            </div>
            <div>
                {store.role === 'Admin' ? 
                    <>
                        <Button variant='primary'>Редактировать</Button>
                        <Button 
                            onClick={() => onRemoveCompetition(id)}
                            variant='danger' style={{marginLeft: "15px"}}>Удалить</Button>
                    </>
                    :
                    <Button variant='success'>Зарегистрироваться</Button>
                }
            </div>
        </div>
    )
}

export default CompetitionItem;