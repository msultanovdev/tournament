import { Button } from 'react-bootstrap';
import './CreateModal.css';
import { X } from 'react-bootstrap-icons';
import { useContext } from 'react';
import { Context } from '../..';

const CreateModal = ({setModal}) => {
    const {store} = useContext(Context);

    return(
        <div className='create-modal'>
            <div className='create-modal-header'>
                <h2>Создание соревнования</h2>
                <Button 
                    variant='danger'
                    onClick={() => setModal(false)}
                ><X color='white' fontWeight={900} size={"1.5rem"} /></Button>
            </div>
            <form>
                <input className='input'></input>
            </form>
        </div>
    )
}

export default CreateModal;