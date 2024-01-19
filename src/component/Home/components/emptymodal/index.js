import React from 'react'
import './emptymodal.scss';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
export default function EmptyModal() {
  const history = useHistory()
  return (
    <div className='empty-modal-wrapper'>
        <div className='modal-md'>
          
            <div className='modal-body'>
                <h4>Your movie list is empty</h4>
            </div>
            <div className='button-alignment'>
                <button onClick={()=>history.push('/create-movie')}>Add a new movie</button>
            </div>

        </div>
    </div>
  )
}
