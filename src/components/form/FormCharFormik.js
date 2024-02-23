import { useState, useEffect } from 'react';
import './formChar.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage} from 'formik';
import * as yup from 'yup';


const FormCharFormik = () => {

    const [char, setChar] = useState(null);
    // const [name, setName] = useState('');
    const [errors, setErrors] = useState('');
    const {loading, error, getCharacterByName, clearError} = useMarvelService();

    const updateChar = (name) => {

        clearError();           
    
        getCharacterByName(name)
            .then(onCharLoaded);                               
    }

    const onCharLoaded = (char) => {
        setChar(char);       
    }

   
    // const onNameChange = (e) => {
    //     setName(e.target.value);     
    // }  

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     updateChar(name);      
    //     if(errors.length > 0){
    //         return;
    //     }         
    // }

    const result = !char ? null : char.length > 0 ?         
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
          <Formik
          initialValues={{
            charName: ''
          }}
          validationSchema={yup.object({
            charName: yup.string()
                .required('This field is required')
                .min(2, 'Минимум 2 символа для заполнения!')
          })}
          onSubmit = { ({charName}) => {
            updateChar(charName);
         }}>
            <Form className="form">
                <label className="form__select" htmlFor="charName">Or find a character by name:</label>
                <div className='form__wrapper'>                  
                    <Field
                        id="charName"
                        name="charName"                    
                        type="text"               
                        placeholder='Enter name'
                    />
                     <button 
                        className="button button__main" 
                        type="submit"
                        disabled={loading}>
                        <div className="inner">find</div>
                    </button>   
                </div>  
                <FormikErrorMessage component="div" className="char__search-error" name="charName" />                     
            </Form>
          </Formik>       
          {result}
          {errorMessage}           
        </>
    )
}

export default FormCharFormik;