import { useContext, useEffect, useState } from 'react';
import ScheduleItem from '../../components/ScheduleItem/ScheduleItem';
import './Schedule.css';
import axios from 'axios';
import { Context } from '../..';
import { Button } from 'react-bootstrap';

const Schedule = () => {
    const [data, setData] = useState([]);
    const {store} = useContext(Context);

    const fetchData = async () => {
        const {data} = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/competition/${localStorage.getItem('selectedCompetitionId')}/schedule`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        setData(data);
        console.log(data);
    }
    
    const generateSchedule = async () => {
        const {data} = await axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/tournament/competition/generate-schedule`, {competitionId: localStorage.getItem('selectedCompetitionId')}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <div className="schedule">
            <h2>Расписание</h2>

            <div className="schedule-items">
                {data ? data.map(item => {
                    return <ScheduleItem 
                        key={item.scheduleId}
                        tableNumber={item.tableNumber} 
                        firstPlayer={item.firstPlayer} 
                        secondPlayer={item.secondPlayer}
                        firstPlayerScore={item.firstPlayerScore}
                        secondPlayerScore={item.secondPlayerScore}
                     />
                }) : ''
            }
                {(!data.length && store.role === 'Admin') && 
                <div className="generate-btn-wrapper">
                    <Button
                        onClick={() => generateSchedule()}
                    >Сгенерировать расписание</Button>
                </div>
                }
            </div>
        </div>
    );
}

export default Schedule;