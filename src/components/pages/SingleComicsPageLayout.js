import { useParams, Link } from 'react-router-dom';
import { Component, useState, useEffect } from 'react';
import { Helmet } from "react-helmet";


import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from '../appBanner/AppBanner';

import './singleComicsPage.scss';

const SingleComicsPageLayout = () => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {loading, error, getComics, clearError} = useMarvelService();

    useEffect(() => {
        updateItem();
    }, [id]);   
 

    const updateItem = () => {
        clearError();
        // onCharLoading();

        getComics(id)
            .then(onItemLoaded);
                        
    }

    const onItemLoaded = (data) => {
        setData(data);
        // setLoading(false);   
    }

    const errorMessage = error ? <ErrorMessage/> : null;     
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !data) ? <View data = {data}/> : null;

    return (
        <>
    
            <AppBanner/>       
            <div className="single-comic">
                {errorMessage}
                {spinner}
                {content} 
            </div>
        </>
    )
}

const View = ({data}) => {
    const {title, description, pageCount, thumbnail, language, price} = data;

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={`${title} comics book`}
                />
                <title>{title}</title>
            </Helmet>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </>
    )
}

export default SingleComicsPageLayout;