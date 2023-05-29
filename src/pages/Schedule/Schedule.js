import { useEffect, useState } from 'react';
import ScheduleItem from '../../components/ScheduleItem/ScheduleItem';
import './Schedule.css';
import axios from 'axios';

const Schedule = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const {data} = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/competition/${localStorage.getItem('selectedCompetitionId')}/schedule`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });
        setData(data);
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

            </div>
        </div>
    );
}

export default Schedule;