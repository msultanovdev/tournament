import { Button } from 'react-bootstrap';
import './EditModal.css';
import { X } from 'react-bootstrap-icons';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../UI/Loader';
import { Context } from '../..';

const EditModal = ({id, setModal}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDateTime, setStartDateTime] = useState('');
    const [placeDescription, setPlaceDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFormValidate, setIsFormValidate] = useState(false);
    const [roundsCount, setRoundsCount] = useState('');
    const [tablesCount, setTablesCount] = useState('');

    const [isValidDate, setIsValidDate] = useState(false);

    const {store} = useContext(Context);

    const fetchCompetition = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/competition/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            ).then(res => res.data);
            setTitle(res.value.title);
            setStartDateTime(res.value.startDateTime);
            setDescription(res.value.description);
            setTablesCount(res.value.tableCount);
            setRoundsCount(res.value.roundsCount);
            setPlaceDescription(res.value.placeDescription);
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchCompetition();
    }, []);

    useEffect(() => {
        if(Date.parse(startDateTime) < Date.now()) {
            setIsValidDate(false);
        } else {
            setIsValidDate(true);
        }
    }, [startDateTime]);

    useEffect(() => {
        if(title && description && startDateTime && placeDescription && isValidDate && tablesCount >= 0 && roundsCount >= 0) {
            setIsFormValidate(true);
        } else {
            setIsFormValidate(false);
        }
    }, [title, description, placeDescription, isValidDate, tablesCount, roundsCount]);

    const saveCompetition = async () => {
        try {
            setIsLoading(true);
            const formData = {
                id,
                title,
                description,
                startDateTime,
                placeDescription,
                tableCount: tablesCount,
                roundsCount
            }
            const {data} = await axios
            .put(`${process.env.REACT_APP_BASE_API_URL}/api/competition/update`, 
            formData, 
            {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
            setModal(false);
            // store.setCompetitions(data.competition);
        } catch (e) {
            console.log(e.response.data.message);
        } finally {
            setIsLoading(false);
        }
    }

    return(
        <div className="edit-container" onClick={(e) => {setModal(false); e.stopPropagation();}}>
            <div className='edit-modal'>
            {isLoading && 
                <div className='loader-wrapper'>
                    <Loader />
                </div>
            }
                <div className='edit-modal-header'>
                    <h2>Редактирование соревнования</h2>
                    <Button 
                        variant='danger'
                        onClick={(e) => {setModal(false); e.stopPropagation()}}
                    ><X color='white' fontWeight={900} size={"1.5rem"} /></Button>
                </div>
                <form className='form-creation' onClick={(e) => e.stopPropagation()}>
                    <input 
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                        className='input'
                        placeholder='Название'
                    ></input>
                    <textarea 
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                        className='input'
                        placeholder='Описание'
                    ></textarea>
                    <input 
                        onChange={e => setStartDateTime(e.target.value)}
                        value={startDateTime}
                        type="datetime-local"
                        className='input'
                        placeholder='Дата начала турнира'
                    ></input>
                    <input 
                        onChange={e => setPlaceDescription(e.target.value)}
                        value={placeDescription}
                        className='input'
                        placeholder='Описание места проведения'
                    ></input>
                    <div className="inputs-wrapper">
                        <input 
                            onChange={e => setRoundsCount(e.target.value)}
                            value={roundsCount}
                            className='input'
                            type="number"
                            placeholder="Число раундов"
                        ></input>
                        <input 
                            onChange={e => setTablesCount(e.target.value)}
                            value={tablesCount}
                            className='input'
                            type="number"
                            placeholder="Число столов"
                        ></input>
                    </div>
                    <Button 
                        onClick={() => saveCompetition()}
                        disabled={!isFormValidate}
                        variant='success'>Сохранить</Button>
                </form>
            </div>
        </div>
    )
}

export default EditModal;