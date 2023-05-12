import { Button } from 'react-bootstrap';
import './CreateModal.css';
import { X } from 'react-bootstrap-icons';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../UI/Loader';
import { Context } from '../..';

const CreateModal = ({setModal}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDateTime, setStartDateTime] = useState('');
    const [placeDescription, setPlaceDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFormValidate, setIsFormValidate] = useState(false);

    const [isValidDate, setIsValidDate] = useState(false);

    const {store} = useContext(Context);

    useEffect(() => {
        if(Date.parse(startDateTime) < Date.now()) {
            setIsValidDate(false);
        } else {
            setIsValidDate(true);
        }
    }, [startDateTime]);

    useEffect(() => {
        if(title && description && startDateTime && placeDescription && isValidDate) {
            setIsFormValidate(true);
        } else {
            setIsFormValidate(false);
        }
    }, [title, description, placeDescription, isValidDate]);

    const createCompetition = async () => {
        try {
            setIsLoading(true);
            const formData = {
                title,
                description,
                startDateTime,
                placeDescription
            }
            const {data} = await axios
            .post(`${process.env.REACT_APP_BASE_API_URL}/api/competition/create`, 
            formData, 
            {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
            setModal(false);
            store.setCompetitions(data.competition);
        } catch (e) {
            console.log(e.response.data.message);
        } finally {
            setIsLoading(false);
        }
    }

    return(
        <div className='create-modal'>
            {isLoading && 
                <div className='loader-wrapper'>
                    <Loader />
                </div>
            }
            <div className='create-modal-header'>
                <h2>Создание соревнования</h2>
                <Button 
                    variant='danger'
                    onClick={() => setModal(false)}
                ><X color='white' fontWeight={900} size={"1.5rem"} /></Button>
            </div>
            <form className='form-creation'>
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
                <Button 
                    onClick={() => createCompetition()}
                    disabled={!isFormValidate}
                    variant='success'>Создать турнир</Button>
            </form>
        </div>
    )
}

export default CreateModal;