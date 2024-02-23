import { useState, useEffect } from 'react';
import './formChar.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';

const FormChar = (props) => {

    const [char, setChar] = useState(null);
    const [name, setName] = useState('');
    const [errors, setErrors] = useState('');
    const {loading, error, getCharacterByName, clearError} = useMarvelService();

    const updateChar = (name) => {
   
        if (!name) {
            setErrors('Username is required');
        }else {

        clearError();           
    
        getCharacterByName(name)
            .then(onCharLoaded);
        }                        
    }

    const onCharLoaded = (char) => {
        setChar(char);       
    }

   
    const onNameChange = (e) => {
        setName(e.target.value);     
    }  

    const handleSubmit = (e) => {
        e.preventDefault();
        updateChar(name);      
        if(errors.length > 0){
            return;
        }         
    }

    const result = !char ? 
        <div className="form__search-error">
            {errors}
        </div> :
        char.length > 0 ? 
        <div className='form__wrapper'>
            <div className="form__search-success">There is! Visit {char[0].name} page?</div>
            <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                <div className="inner">to page</div>
            </Link>
        </div> : 
        <div className="form__search-error">
                The character was not found. Check the name and try again
        </div>;

    const errorMessage = error ? <div className="form__critical-error"><ErrorMessage/></div> : null;  

    return (
        <>
          
            <form className="form" onSubmit={handleSubmit}>
            <label className="form__select">Or find a character by name:</label>
                <div className='form__wrapper'>                  
                    <input
                        id="name"
                        name="name"
                        value={name}
                        type="text"
                        onChange={onNameChange}
                        placeholder='Enter name'
                    />
                     <button className="button button__main" type="submit">
                        <div className="inner">find</div>
                    </button>   
                </div>                       
            </form>
            {result}
            {errorMessage}
           
        </>
    )
}

export default FormChar;