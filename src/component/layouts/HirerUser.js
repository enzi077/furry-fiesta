import React,{Component} from 'react'
import '../styles/hirermain.css'
import Filter from './subcomponents/Filter'
import WorkerList from './subcomponents/WorkerList'
import UserPicks from './subcomponents/UserPicks'
import ProfileList from './subcomponents/ProfileList'
import ProfileUpd from './subcomponents/ProfileUpd'
import Landing from './Landing'
import firebaseOb from '../../firebase'

export class HirerUser extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             workers:[],
             selectedWorkers:[],
             state:'',
             gender:'',
             age:'',
             page:'hireruser'
        }
    }
    
    componentDidMount(){
        firebaseOb.auth().onAuthStateChanged(function(user){
            if(user){
                console.log('sign in successful');
            }else{
                console.log('no user');
                this.render()
            }
        })
    }
    
    userProfile=(e)=>{
        if((e.target.value === 'hireruser') || (e.target.value === 'profile')){
            this.setState({
                page: e.target.value
            })
        } else if(e.target.value === 'signout'){
            firebaseOb.auth().signOut()
            this.setState({
                page:'signout'
            })
        } else{
            this.setState({
                page: 'hireruser'
            })
        }
    }
    
    render() {
        const {workers,selectedWorkers,age,gender,state,page}=this.state
        switch (page) {
            case 'hireruser':
                return(
                    <div className='mainHirer'>
                        <div className='headHirer'>
                            <h1>Kaamdani</h1>
                            <select className='userProfile' onChange={this.userProfile}>
                                {/* {users.name will display user's name after authorization } */}
                                <option value="" selected disabled>{}
                                </option>
                                <option value="profile">Profile</option>
                                <option value="signout">Signout</option>
                            </select>
                            <Filter state={state}
                                gender={gender}
                                age={age}
                            />
                            <div className='split2 left2'>
                                {/* users from this page are passed down as props to WorkerList
                                worker list will then handle the props accordingly and return the values here */}
                                <WorkerList workers={workers} 
                                    selectedWorkers={selectedWorkers}
                                    state={state}
                                    gender={gender}
                                    age={age}
                                    />
                            </div>
                            <div className="vertical2"></div>
                            <div className='split2 right2'>
                                <UserPicks selectedWorkers={selectedWorkers}/>
                            </div>
                        </div>
                    </div>
                )
            case 'profile':
                return(
                    <div className='mainHirer'>
                        <div className='headHirer'>
                            <h1>Kaamdani</h1>
                            <select className='userProfile' onChange={this.userProfile}>
                                {/* {users.name will display user's name after authorization } */}
                                <option value="" selected="selected" disabled>{}
                                </option>
                                <option value="hireruser">Worker List</option>
                                <option value="signout">Signout</option>
                            </select>
                            <div className='split2 left2'>
                                <ProfileList
                                    selectedWorkers={selectedWorkers}
                                    state={state}
                                    gender={gender}
                                    age={age}
                                />
                            </div>
                            <div className="vertical2"></div>
                            <div className='split2 right2'>
                                <ProfileUpd/>
                            </div>
                        </div>
                    </div>
                )
            case 'signout':
                return <Landing/>
            default:
                return(
                    <div className='mainHirer'>
                        <div className='headHirer'>
                            <h1>Kaamdani</h1>
                            <select className='userProfile' onChange={this.userProfile}>
                                {/* {users.name will display user's name after authorization } */}
                                <option value="" selected disabled>{}
                                </option>
                                <option value="profile">Profile</option>
                                <option value="signout">Signout</option>
                            </select>
                            <Filter state={state}
                                gender={gender}
                                age={age}
                            />
                            <div className='split2 left2'>
                                {/* users from this page are passed down as props to WorkerList
                                worker list will then handle the props accordingly and return the values here */}
                                <WorkerList workers={workers} 
                                    selectedWorkers={selectedWorkers}
                                    state={state}
                                    gender={gender}
                                    age={age}
                                    />
                            </div>
                            <div className="vertical2"></div>
                            <div className='split2 right2'>
                                <UserPicks selectedWorkers={selectedWorkers}/>
                            </div>
                        </div>
                    </div>
                )
        }
    }
}

export default HirerUser
