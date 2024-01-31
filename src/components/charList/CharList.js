import { Component } from 'react';
import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError)
        // this.timerId = setInterval(this.updateChar, 3000);
    }

    onCharListLoaded = (charList) => {
        this.setState({
            charList,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    renderItems(arr){     
        const items = arr.map((item) => {
            let imgFit = {'objectFit': 'cover'};
            if (item.imgStyle){
                imgFit = {'objectFit': 'unset'}
            }     
          
        
            return (
                <li className="char__item"
                key = {item.id}
                onClick={() => this.props.onCharSelected(item.id)}>                    
                    <img src={item.thumbnail} alt={item.name} style={imgFit}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        
        });

        return(
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render(){
        const {charList, loading, error} = this.state;

        const items = this.renderItems(charList);
        const errorMessage = error ? <ErrorMessage/> : null;     
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}   
                {spinner}
                {content}                 
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
    
}

export default CharList;