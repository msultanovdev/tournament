import React, { useEffect, useState } from 'react';
import './Сhoice.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../UI/Loader';


const Choice = () => {
  const id = localStorage.getItem('selectedCompetitionId');
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isDescriptionFull, setIsDescriptionFull] = useState(false);
  const [isPlaceDescriptionFull, setIsPlaceDescriptionFull] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const {data} = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/competition/${id}`,
      {headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
        }}
      );
      console.log(data);
      setData(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const showTextHandler = () => {
    setIsDescriptionFull(!isDescriptionFull);
  }

  return (
    <div className="choice">
      {isLoading && <div className="loader-wrapper"><Loader /></div>}
      <div className="choice-mask"></div>
      <h2>{data ? data.value.title : ''}</h2>
      <div className="choice-description-wrapper">
        <p className={`choice-description ${isDescriptionFull ? 'active' : ''}`} >
          {data ? data.value.description : ''} 
        </p>
        <button 
          className="show-btn"
          onClick={() => showTextHandler()}>{!isDescriptionFull ? 'Показать...' : 'Скрыть'}</button>
      </div>
      <div className="choice-description-wrapper">
        <p className={`choice-description ${isPlaceDescriptionFull ? 'active' : ''}`} >
          {data ? data.value.placeDescription : ''} 
        </p>
        <button 
          className="show-btn"
          onClick={() => setIsPlaceDescriptionFull(!isPlaceDescriptionFull)}>{!isPlaceDescriptionFull ? 'Показать...' : 'Скрыть'}</button>
      </div>
      <div className="choice__links">
          <Link to="schedule">Расписание</Link>
          <Link to="players">Рейтинг участников</Link>
      </div>
    </div>
  );
};

export default Choice;
