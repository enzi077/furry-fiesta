import React, { Component } from 'react'
import SignUp from './subcomponents/SignUp'
import WorkerList from './subcomponents/WorkerList'
import Filter from './subcomponents/Filter'
// import firebaseOb from '../../firebase'
import HirerUser from './HirerUser'
import '../styles/hirermain.css'

class HirerMain extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            workers:[],
            selectedUsers:[],
            state:'',
            gender:'',
            age:'',
            page:'hirermain' 
        }
    }
    
    onSignIn=()=>{
        this.setState({
            page: 'signin'
        })
    }
    
    render() {
        const{workers,selectedUsers,state,gender,age,page}=this.state
        if(page==='hirermain'){
            return(
                <div className='mainHirer'>
                    <div className='headHirer'>
                        <h1>Kaamdani</h1>
                        <Filter state={state}
                            gender={gender}
                            age={age}
                        />
                        <div className='split2 left2'>
                            <WorkerList workers={workers}
                                selectedUsers={selectedUsers}
                                state={state}
                                gender={gender}
                                age={age}
                            />
                        </div>
                        <div className="vertical2"></div>
                        <div className='split2 right2'>
                            <SignUp page={page} onSignIn={this.onSignIn}/>
                        </div>
                    </div>
                </div>
            )
        }else{
            return(
                <HirerUser/>
            )
        }
    }
}

export default HirerMain
