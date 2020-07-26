import React,{Component} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import './App.css';
import Landing from './component/layouts/Landing';
import WorkerForm from './component/layouts/WorkerForm';

class App extends Component{
    render(){
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Landing}/>
                    <Route path="/form" component={WorkerForm} />
                    {/* <Landing/> */}
                </div>
            </Router>
        )   
    }  
}

export default App;
