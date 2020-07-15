import React, { Component } from 'react'
import axios from 'axios'
import SignUp from './subcomponents/SignUp'
import WorkerList from './subcomponents/WorkerList'
import UserPicks from './subcomponents/UserPicks'
import Filter from './subcomponents/Filter'
import Landing from './Landing'
import ProfileList from './subcomponents/ProfileList'
import ProfileUpd from './subcomponents/ProfileUpd'
import '../styles/hirermain.css'

class HirerMain extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            users:[],
            selectedUsers:[],
            state:'',
            gender:'',
            age:'',
            page:'hirermain',
            signedIn:true //set it true after user authorization is successful
        }
    }
    
    componentDidMount(){
        //mount component after authorization check
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then(res=>{
                this.setState({
                    users: res.data
                })
            })
    }
    
    userProfile=(e)=>{
        if(e.target.value==='signout'){
            //signout the user here (already done in front end)
            //signout from database also
            this.setState({
                page:'home',
                signedIn:false
            })
        }else if(e.target.value==='profile'){
            this.setState({
                page:e.target.value
            })
        }else{
            this.setState({
                page: 'hirermain'
            })
        }
    }
    
    render() {
        const{users,selectedUsers,state,gender,age,page,signedIn}=this.state
        if(signedIn===true && page==='hirermain'){
            return(
                <div className='mainHirer'>
                    <div className='headHirer'>
                        <h1>Kaamdani</h1>
                        <select className='userProfile' onChange={this.userProfile}>
                            {/* {users.name will display user's name after authorization } */}
                            <option value="" selected disabled>{users.name}
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
                            <WorkerList users={users} 
                                selectedUsers={selectedUsers}
                                state={state}
                                gender={gender}
                                age={age}
                                />
                        </div>
                        <div className="vertical2"></div>
                        <div className='split2 right2'>
                            <UserPicks selectedUsers={selectedUsers}/>
                        </div>
                    </div>
                </div>
            )
        }else if(signedIn===false && page !=='home'){
            return(
                <div className='mainHirer'>
                    <div className='headHirer'>
                        <h1>Kaamdani</h1>
                        <Filter state={state}
                            gender={gender}
                            age={age}
                        />
                        <div className='split2 left2'>
                            <WorkerList users={users}
                                selectedUsers={selectedUsers}
                                state={state}
                                gender={gender}
                                age={age}
                            />
                        </div>
                        <div className="vertical2"></div>
                        <div className='split2 right2'>
                            <SignUp/>
                        </div>
                    </div>
                </div>
            ) 
        }else if(signedIn===true && page==='profile'){
            return(
                <div className='mainHirer'>
                    <div className='headHirer'>
                        <h1>Kaamdani</h1>
                        <select className='userProfile' onChange={this.userProfile}>
                            {/* {users.name will display user's name after authorization } */}
                            <option value="" selected="selected" disabled>{users.name}
                            </option>
                            <option value="hirermain">Worker List</option>
                            <option value="signout">Signout</option>
                        </select>
                        <div className='split2 left2'>
                            <ProfileList
                                selectedUsers={selectedUsers}
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
        }else{
            return <Landing/>
        }
    }
}

export default HirerMain
