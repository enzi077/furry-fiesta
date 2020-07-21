import React, { Component } from 'react'
import WorkerForm from './WorkerForm'
import HirerMain from './HirerMain'
import '../styles/landing.css'

class Landing extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             page:'home'
        }
    }
    
    gotoLanding=()=>{
        this.setState({
            page:'home'
        })
    }
    
    gotoWorkerForm=()=>{
        this.setState({
            page:'workerform'
        })
    }
    
    gotoHirerMain=()=>{
        this.setState({
            page:'hirermain'
        })
    }
    
    render() {
        const {page}=this.state
        switch(page){
            case 'home':
                return (
                    <div className='main'>
                        <h1 className='head'>Kaamdani</h1>
                        <div className='split left'>
                            <div className='centered'>
                                <h3>Are you looking for workers ?</h3>
                                <button onClick={this.gotoHirerMain}>Hirer</button>
                            </div>
                        </div>
                        <div className="vertical"></div>
                        <div className='split right'>
                            <div className='centered'>
                                <h3>Are you looking for work ?</h3>
                                <button onClick={this.gotoWorkerForm}>Worker</button>
                            </div>
                        </div>
                    </div>
                ) 
            case 'workerform':
                return <WorkerForm page={page}/>
            case 'hirermain':
                return <HirerMain/>
            default:
                return (
                    <div className='main'>
                        <h1 className='head'>Kaamdani</h1>
                        <div className='split left'>
                            <div className='centered'>
                                <h3>Are you looking for workers ?</h3>
                                <button onClick={this.gotoHirerMain}>Hirer</button>
                            </div>
                        </div>
                        <div className="vertical"></div>
                        <div className='split right'>
                            <div className='centered'>
                                <h3>Are you looking for work ?</h3>
                                <button onClick={this.gotoWorkerForm}>Worker</button>
                            </div>
                        </div>
                    </div>
                )
        }
    }
}

export default Landing
