import './ScheduleItem.css';

const ScheduleItem = ({tableNumber, firstPlayer, secondPlayer, firstPlayerScore, secondPlayerScore}) => {
    return(
        <div className="schedule-item">
            <div className="schedule-item-container">
                <div className="schedule-item-table">
                    <p>{tableNumber} стол</p>
                </div>
                <div className="schedule-item-table-players">
                    <p>{firstPlayer && `${firstPlayer.middleName} ${firstPlayer.firstName.split('')[0]}. ${firstPlayer.lastName.split('')[0]}. `} <span>{firstPlayer.currentRating}</span></p>
                    <span>{firstPlayerScore} : {secondPlayerScore}</span>
                    <p className="schedule-item-table-players-right">{secondPlayer && `${secondPlayer.middleName} ${secondPlayer.firstName.split('')[0]}. ${secondPlayer.lastName.split('')[0]}. `}<span>{secondPlayer.currentRating}</span></p>
                </div>
            </div>
        </div>
    );
}

export default ScheduleItem;