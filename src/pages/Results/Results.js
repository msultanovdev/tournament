import { useEffect, useState } from 'react';
import './Results.css';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import ConfirmModal from '../../components/ ConfirmModal/ConfirmModal';

const Results = () => {
    const competitionId = localStorage.getItem('selectedCompetitionId');
    const [results, setResults] = useState([]);
    const [isConfirmModal, setIsConfirmModal] = useState(false);
    const [selectedResult, setSelectedResult] = useState({});

    const fetchData = async () => {
        const {data} = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/tournament/competition/${competitionId}/match-results`,
            {headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }}
        );
        setResults(data.resultLookups);
    } 

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <div className="results">
            {isConfirmModal && <ConfirmModal selectedResult={selectedResult} setIsModal={setIsConfirmModal} />}
            <h2 className="results-title">Результаты</h2>
            {
                results.length ? 
                results.map(result => {
                    if(result.firstPlayerScore || result.secondPlayerScore) {
                        let isValidScore = true;
                        if((result.firstPlayerScore.firstPlayerScored === result.secondPlayerScore.firstPlayerScored) && (result.secondPlayerScore.firstPlayerScored === result.firstPlayerScore.firstPlayerScored)) {
                            isValidScore = false;
                        } else {
                            isValidScore = true;
                        }
                        return (
                            <div key={result.scheduleId} className="result">
                                <div className={`result-first-player-confirmation ${isValidScore ? 'invalid-score' : 'valid-score'}`}>
                                    <p>{result.firstPlayerModel.middleName} {result.firstPlayerModel.firstName[0]}. {result.firstPlayerModel.lastName[0]}. ввёл счёт: </p>
                                    <div className="result-first-player-confirmation-wrapper">
                                        <div className="result-first-player">
                                            <p>{result.firstPlayerModel.middleName} {result.firstPlayerModel.firstName} {result.firstPlayerModel.lastName} <span>{result.firstPlayerScore.firstPlayerScored}</span></p>
                                        </div>
                                        <div className="result-first-player">
                                            <p><span>{result.firstPlayerScore.secondPlayerScored}</span> {result.secondPlayerModel.middleName} {result.secondPlayerModel.firstName} {result.secondPlayerModel.lastName}</p>
                                        </div>
                                    </div>
                                </div>
                                <hr style={{border: "1px solid #fff", width: "100%"}} />
                                <div className={`result-first-player-confirmation ${isValidScore ? 'invalid-score' : 'valid-score'}`}>
                                    <p>{result.secondPlayerModel.middleName} {result.secondPlayerModel.firstName[0]}. {result.secondPlayerModel.lastName[0]}. ввёл счёт:</p>
                                    <div className="result-first-player-confirmation-wrapper">
                                        <div className="result-second-player">
                                            <p>{result.firstPlayerModel.middleName} {result.firstPlayerModel.firstName} {result.firstPlayerModel.lastName} <span>{result.secondPlayerScore.firstPlayerScored}</span></p>
                                        </div>
                                        <div className="result-second-player">
                                            <p><span>{result.secondPlayerScore.secondPlayerScored}</span> {result.secondPlayerModel.middleName} {result.secondPlayerModel.firstName} {result.secondPlayerModel.lastName}</p>
                                        </div>
                                    </div>
                                </div>
                                {isValidScore && <p className="invalid-score-message">*Так как счета игроков не совпали,<br /> Вам придётся ввести их самостоятельно!*</p>}
                                <div>
                                    <Button
                                        onClick={() => {setIsConfirmModal(true); setSelectedResult(result)}}
                                        className="confirm-result-btn"
                                        variant={`${!isValidScore ? 'success' : 'warning'}`}
                                    >Подтвердить</Button>
                                </div>
                            </div> 
                        );
                    }
                })
                : 
                    ''
            }
        </div>
    );
}

export default Results;