import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import AppHeader from "../appHeader/AppHeader";
// import MainPage from "../pages/MainPage";
// import ComicsPage from "../pages/ComicsPage";
// import SingleCharPage from "../pages/SingleComicsPage";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicsPageLayout = lazy(() => import('../pages/SingleComicsPageLayout'));
const SingleCharPageLayout = lazy(() => import('../pages/SingleCharPageLayout'));
const SinglePage = lazy(() => import('../pages/SingleCharPageLayout'));


const App = () => {   

    return (
            <Router>
                <div className="app">
                    <AppHeader/>                                  
                    <main>  
                     <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path='/' element={ <MainPage/>}/>      
                            <Route path='/comics' element={ <ComicsPage/>}/> 
                            {/* <Route path='/comics/:id' element={ <SinglePage Component={SingleComicsPageLayout} dataType='comics'/>}/>   */}
                            {/* <Route path='/character/:id' element={ <SinglePage Component={SingleCharPageLayout} dataType='character'/>}/>                             */}
                            <Route path='/comics/:id' element={ <SingleComicsPageLayout/>}/>
                            <Route path='/characters/:id' element={ <SingleCharPageLayout/>}/>
                            <Route path='*' element={<Page404/>}/>           
                        </Routes>
                     </Suspense>
                    </main>
                </div>
            </Router>
        )
}


// class App extends Component {

//     state = {
//         selectedChar: null
//     }

//     onCharSelected = (id) => {
//         this.setState({
//             selectedChar: id
//         })
       
//     }

//     render(){
//         return (
//             <div className="app">
//                 <AppHeader/>
//                 <main>
//                     <ErrorBoundary>
//                         <RandomChar/>
//                     </ErrorBoundary>                    
//                     <div className="char__content"> 
//                         <ErrorBoundary>
//                             <CharList onCharSelected={this.onCharSelected}/>
//                         </ErrorBoundary>                       
//                         <ErrorBoundary>
//                             <CharInfo charId={this.state.selectedChar}/>
//                         </ErrorBoundary>                        
//                     </div>
//                     <img className="bg-decoration" src={decoration} alt="vision"/>
//                 </main>
//             </div>
//         )
//     }

// }

export default App;