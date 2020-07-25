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
    _isMounted=false
    constructor(props) {
        super(props)
    
        this.state = {
             workers:[],
             selectedWorkers:[],
             state:'',
             gender:'',
             age:'',
             page:'hireruser',
             username:''
        }
    }
    
    componentDidMount(){
        this._isMounted=true
        var currentHirer=firebaseOb.auth().currentUser
        var myMail=currentHirer.email
        this.setState({
            username: myMail
        })
    }
    
    componentWillUnmount(){
        this._isMounted=false
    }
    
    chngStateFilter=(value)=>{
        this.setState({
            state: value
        })
    }
    
    chngAgeFilter=(value)=>{
        this.setState({
            age: value
        })
    }
    
    chngGenderFilter=(value)=>{
        this.setState({
            gender: value
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
        const {workers,selectedWorkers,age,gender,state,page,username}=this.state
        switch (page) {
            case 'hireruser':
                return(
                    <div className='mainHirer'>
                        <div className='headHirer'>
                            <h1>Kaamdani</h1>
                            <select className='userProfile' onChange={this.userProfile}>
                                {/* {users.name will display user's name after authorization } */}
                                <option value="" selected disabled>{username}
                                </option>
                                <option value="profile">Profile</option>
                                <option value="signout">Signout</option>
                            </select>
                            <Filter state={state}
                                gender={gender}
                                age={age}
                                chngStateFilter={(value)=>this.chngStateFilter(value)}
                                chngAgeFilter={(value)=>this.chngAgeFilter(value)}
                                chngGenderFilter={(value)=>this.chngGenderFilter(value)}
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
                                {/* <button onClick={this.yourPicks}>Your Picks</button> */}
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
                                <option value="" selected="selected" disabled>{username}
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
                                <option value="" selected disabled>{username}
                                </option>
                                <option value="profile">Profile</option>
                                <option value="signout">Signout</option>
                            </select>
                            <Filter state={state}
                                gender={gender}
                                age={age}
                                chngStateFilter={(value)=>this.chngStateFilter(value)}
                                chngAgeFilter={(value)=>this.chngAgeFilter(value)}
                                chngGenderFilter={(value)=>this.chngGenderFilter(value)}
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
