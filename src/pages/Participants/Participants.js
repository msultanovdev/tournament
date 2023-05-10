import { useContext, useEffect } from 'react';
import './Participants.css';
import { Context } from '../..';
import axios from 'axios';

const Participants = () => {
    const {store} = useContext(Context);
    
    const fetchData = async () => {
        const {data} = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/participant/get-all`, {headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }});
        console.log(data);
    }
    useEffect(() => {
        fetchData();
    }, []);


    const players = [
        {
            playerId: 1,
            firsName: 'Султонов',
            middleName: 'Мухаммадамин',
            lastName: 'Бурханович',
            currentRating: 'Мастер Спорта',
            isParticipation: false,
            isBlocked: false
        }
    ]

    {return store.role === 'Referee' ? 
        (<div className='parts-container'>
            <h2 className='parts-title'>
                Таблица участников
            </h2>
            <div className='parts-table-wrapper'>
                <table className='parts-table'>
                    <thead>
                        <tr>
                            <th className='parts-table-name'>ФИО</th>
                            <th>Рейтинг</th>
                            <th>Участвовал</th>
                            <th>Заблокирован</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='parts-table-info'>
                            <th className='parts-table-name'>Султонов М. Б.</th>
                            <th>Мастер Спорта</th>
                            <th>
                                <input 
                                    type='checkbox'
                                    className='table-checkbox' 
                                />
                            </th>
                            <th>
                                <input 
                                    type='checkbox'
                                    className='table-checkbox'
                                />
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>) : 
        (<div className='parts-container'>
            Not Referee
        </div>)
    }

    // return(
    //     <div>
    //         Participants
    //     </div>
    // );
}

export default Participants;