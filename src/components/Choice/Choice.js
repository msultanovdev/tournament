import React, { useEffect, useState } from 'react';
import './Сhoice.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../UI/Loader';


const Choice = () => {
  const id = localStorage.getItem('selectedCompetitionId');
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="choice">
      {isLoading && <div className="loader-wrapper"><Loader /></div>}
      <div className="choice-mask"></div>
      <h2>{data ? data.value.title : ''}</h2>
      <div className="choice__links">
          <Link to="schedule">Расписание</Link>
          <Link to="players">Рейтинг участников</Link>
      </div>
    </div>
  );
};

export default Choice;
