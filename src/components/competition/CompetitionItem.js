import { Button } from 'react-bootstrap';
import './CompetitionItem.css';
import { useContext } from 'react';
import { Context } from '../..';

const CompetitionItem = ({date, title}) => {
    const {store} = useContext(Context);

    return(
        <div className="competition-container">
            <div>
                <h2 className="competition-title">{title}</h2>
                <p className="competition-date">Дата: {date.toLocaleDateString().replace('/', ".").replace('/', ".")}, {date.toLocaleTimeString().slice(0, -6)}</p>
            </div>
            <div>
                {store.role === 'Admin' ? 
                    <>
                        <Button variant='primary'>Редактировать</Button>
                        <Button variant='danger' style={{marginLeft: "15px"}}>Удалить</Button>
                    </>
                    :
                    <Button variant='success'>Зарегистрироваться</Button>
                }
            </div>
        </div>
    )
}

export default CompetitionItem;