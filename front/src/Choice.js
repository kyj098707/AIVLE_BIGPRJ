import React from 'react';
import { Link } from 'react-router-dom';
import './Choice.css'

function Choice({id, title, image, answer, help}) {
    return(
        <div className="choice">
            <div className="choice_info">
                <p>{title}</p>
                <p className="choice_answer">
                    <small>{answer}</small>

                </p>

                <div className="choice_help">
                   
                </div>

            </div>

            {id === '2323' && (
                <Link to={'/board'}>
                    <img className="choice_image" src={image} alt=""/>
                </Link>
            )}
            {id === '2322' && (
                <Link to={'/rival'}>
                    <img className="choice_image" src={image} alt=""/>
                </Link>
            )}
            {id === '2321' && (
                <Link to={'/register'}>
                    <img className="choice_image" src={image} alt=""/>
                </Link>
            )}
        </div>
    );
}

export default Choice;