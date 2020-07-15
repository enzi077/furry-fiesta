import React, { Component } from 'react'
import '../../styles/userpicks.css'
import axios from 'axios'

class UserPicks extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             selectedUsers:props.selectedUsers
        }
    }
    
    componentDidMount(){
        //here selectedUsers would be retrieved from database
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then(res=>{
                this.setState({
                    selectedUsers: res.data
                })
            })
    }
    
    onPick=()=>{
        //send hired messages to the workers cell phone 
        //with important hirer details
    }
    
    
    render() {
        return (
            <div className='containerPicks'>
                <h1>Your picks :</h1>
                <button type="submit" onClick={this.onPick}>Hire all</button>
                <ol type="1">
                    {this.state.selectedUsers.map(user=>(
                        <div key={user.id}>
                            <li>
                                {user.name}<br/>
                                {user.email}
                            </li>
                        </div>
                        ))
                    }
                </ol>
            </div>
        )
    }
}

export default UserPicks
