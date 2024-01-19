import React from 'react';
import {error} from "../../utilities/Images";
import './Error.scss'

const Error = () => {
  return (
    <div className='container'>
        <div className = "flex flex-center error">
            <img src = {error} alt = "error" />
        </div>
    </div>
  )
}

export default Error