import { useEffect, useState } from 'react';
import './ConfirmModal.css';
import { Button } from 'react-bootstrap';
import Loader from '../UI/Loader';
import axios from 'axios';

const ConfirmModal = ({selectedResult, setIsModal}) => {
    const [firstPlayerScore, setFirstPlayerScore] = useState(selectedResult.firstPlayerScore.firstPlayerScored);
    const [secondPlayerScore, setSecondPlayerScore] = useState(selectedResult.firstPlayerScore.secondPlayerScored);
    const [isScoreValid, setIsScoreValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if((firstPlayerScore >= 0 && firstPlayerScore <= 11) && (secondPlayerScore >= 0 && secondPlayerScore <= 11)) {
            setIsScoreValid(true);
        } else {
            setIsScoreValid(false);
        }
    }, [firstPlayerScore, secondPlayerScore]);

    const saveResults = async () => {
        try {
            setIsLoading(true);
            const obj = {...selectedResult, firstPlayerScore: {
                firstPlayerScored: firstPlayerScore,
                secondPlayerScored: secondPlayerScore,
                isConfirmed: true
            }, secondPlayerScore: {
                firstPlayerScored: firstPlayerScore,
                secondPlayerScored: secondPlayerScore,
                isConfirmed: true
            }}
            await axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/tournament/competition/${localStorage.getItem('selectedCompetitionId')}/save`, obj, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setIsModal(false);
        } catch (e) {

        } finally {
            setIsLoading(false);
        }
    }

    return(
        <div className="confirm-modal"
            onClick={() => setIsModal(false)}
        >
            {isLoading && <div className="loader-wrapper"><Loader /></div>}
            <div className="confirm-modal-container" onClick={(e) => {e.stopPropagation()}}>
                <h2>Подтверждение счёта</h2>
                <div className="player-score-changes">
                    <div className="player-change-score">
                        <p>{selectedResult.firstPlayerModel.middleName} {selectedResult.firstPlayerModel.firstName} {selectedResult.firstPlayerModel.lastName}</p>
                            <input 
                                onChange={(e) => setFirstPlayerScore(e.target.value)}
                                value={firstPlayerScore}
                                type="number" 
                                className="player-change-score-input" 
                                placeholder="0"
                            />
                            </div>
                            <div className="player-change-score">
                            <input 
                                onChange={(e) => setSecondPlayerScore(e.target.value)}
                                value={secondPlayerScore}
                                type="number" 
                                className="player-change-score-input" 
                                placeholder="0"
                            />
                        <p>{selectedResult.secondPlayerModel.middleName} {selectedResult.secondPlayerModel.firstName} {selectedResult.secondPlayerModel.lastName}</p>
                    </div>
                </div>
                <div className="confirm-save">
                    <Button 
                        onClick={() => saveResults()}
                        disabled={!isScoreValid}
                        variant="success" 
                        className="confirm-save-btn">Сохранить
                    </Button>
                    <Button 
                        onClick={() => setIsModal(false)}
                        variant="danger" 
                        className="confirm-save-btn">Отменить
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;