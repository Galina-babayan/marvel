import { Component, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);   

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        // setNewItemLoading(true);
        // onCharListLoading();
        getAllCharacters(offset)
            .then(onCharListLoaded);
           
    }

    // const onCharListLoading = () => {
    //     setNewItemLoading(true);
    // }

    const onCharListLoaded = async (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        // setLoading(false);
        setNewItemLoading(false);
        setOffset(offset + 9);
        setCharEnded(ended);
    }

    // const onError = () => {   
    //     setLoading(false);
    //     setError(true);
    // }

    console.log('render')

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        // Я реализовал вариант чуть сложнее, и с классом и с фокусом
        // Но в теории можно оставить только фокус, и его в стилях использовать вместо класса
        // На самом деле, решение с css-классом можно сделать, вынеся персонажа
        // в отдельный компонент. Но кода будет больше, появится новое состояние
        // и не факт, что мы выиграем по оптимизации за счет бОльшего кол-ва элементов

        // По возможности, не злоупотребляйте рефами, только в крайних случаях
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
       
    }

    function renderItems(arr){     
        const items = arr.map((item, i) => {
          
            let imgFit = {'objectFit': 'cover'};
            if (item.imgStyle){
                imgFit = {'objectFit': 'unset'}
            }             
        
            return (
                <li className="char__item"
                tabIndex={0}                
                key = {item.id}
                ref={el => itemRefs.current[i] = el}
                onClick={() => {
                    props.onCharSelected(item.id);
                    focusOnItem(i);
                }}
                onKeyPress={(e) => {
                    if (e.key === ' ' || e.key === "Enter") {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }
                }}>                    
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

    const items = renderItems(charList);
    const errorMessage = error ? <ErrorMessage/> : null;     
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    // const content = !(loading || error) ? items : null;

    return (
        <div className="char__list">
            {errorMessage}   
            {spinner}
            {items}                 
            <button 
            className="button button__main button__long"
            disabled={newItemLoading}
            onClick={() => onRequest(offset)}
            style={{'display': charEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
    
}

// class CharList extends Component {

//     state = {
//         charList: [],
//         loading: true,
//         error: false,
//         newItemLoading: false,
//         offset: 210,
//         charEnded: false
//     }

//     marvelService = new MarvelService();

//     componentDidMount() {
//        this.onRequest();
//     }

    

//     onRequest = (offset) => {
//         this.onCharListLoading();
//         this.marvelService
//             .getAllCharacters(offset)
//             .then(this.onCharListLoaded)
//             .catch(this.onError)
//     }

//     onCharListLoading = () => {
//         this.setState({
//             newItemLoading: true
//         })
//     }

//     onCharListLoaded = (newCharList) => {
//         let ended = false;
//         if (newCharList.length < 9) {
//             ended = true;
//         }

//         this.setState(({offset, charList}) => ({
//             charList: [...charList, ...newCharList],
//             loading: false,
//             newItemLoading: false,
//             offset: offset + 9,
//             charEnded: ended
//         }))
//     }

//     onError = () => {
//         this.setState({
//             loading: false,
//             error: true
//         })
//     }

//     itemRefs = [];

//     setRef = (ref) => {
//         this.itemRefs.push(ref);
//     }    

//     focusOnItem = (id) => {
//         // Я реализовал вариант чуть сложнее, и с классом и с фокусом
//         // Но в теории можно оставить только фокус, и его в стилях использовать вместо класса
//         // На самом деле, решение с css-классом можно сделать, вынеся персонажа
//         // в отдельный компонент. Но кода будет больше, появится новое состояние
//         // и не факт, что мы выиграем по оптимизации за счет бОльшего кол-ва элементов

//         // По возможности, не злоупотребляйте рефами, только в крайних случаях
//         this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
//         this.itemRefs[id].classList.add('char__item_selected');
//         this.itemRefs[id].focus();
       
//     }

//     renderItems(arr){     
//         const items = arr.map((item, i) => {
//             let imgFit = {'objectFit': 'cover'};
//             if (item.imgStyle){
//                 imgFit = {'objectFit': 'unset'}
//             }             
        
//             return (
//                 <li className="char__item"
//                 key = {item.id}
//                 ref={this.setRef}
//                 onClick={() => {
//                     this.props.onCharSelected(item.id);
//                     this.focusOnItem(i);
//                 }}
//                 onKeyPress={(e) => {
//                     if (e.key === ' ' || e.key === "Enter") {
//                         this.props.onCharSelected(item.id);
//                         this.focusOnItem(i);
//                     }
//                 }}>                    
//                     <img src={item.thumbnail} alt={item.name} style={imgFit}/>
//                     <div className="char__name">{item.name}</div>
//                 </li>
//             )
        
//         });

//         return(
//             <ul className="char__grid">
//                 {items}
//             </ul>
//         )
//     }

//     render(){
//         const {charList, loading, error, offset, newItemLoading, charEnded} = this.state;

//         const items = this.renderItems(charList);
//         const errorMessage = error ? <ErrorMessage/> : null;     
//         const spinner = loading ? <Spinner/> : null;
//         const content = !(loading || error) ? items : null;

//         return (
//             <div className="char__list">
//                 {errorMessage}   
//                 {spinner}
//                 {content}                 
//                 <button 
//                 className="button button__main button__long"
//                 disabled={newItemLoading}
//                 onClick={() => this.onRequest(offset)}
//                 style={{'display': charEnded ? 'none' : 'block'}}>
//                     <div className="inner">load more</div>
//                 </button>
//             </div>
//         )
//     }
    
// }

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;