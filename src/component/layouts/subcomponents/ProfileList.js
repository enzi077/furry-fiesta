import React, { Component } from 'react'
import axios from 'axios'
import '../../styles/listWorker.css'

class ProfileList extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             users:[],//do not use users[] in this file; only here for debugging!!
             selectedUsers: props.selectedUsers,
             state: props.state,
             gender:props.gender,
             age:props.age
        }
    }
    
    componentDidMount(){
        //data for only selectedUsers would be retrieved from database here
        //in the below snippet replace users with selectedUsers
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then(res=>{
                const users=res.data
                this.setState({
                    users
                })
            })
    }
    
    //remove Worker from the hirer's selectedUsers List 
    handleChange=(person)=>{
        let removeWorker=this.state.selectedUsers.filter(
            item=> item!==person
        )
        this.setState({
            selectedUsers:removeWorker
        })
    }
    
    //confirms the removal of Worker from the hirer's selectedUsers list
    onDel=(e)=>{
        //delete or remove here
    }
    
    render() {
        return (
            <div className='containerList'>
                <h1>Your picks:</h1>
                <button type="submit" onClick={this.onDel}>Remove</button>
                <ol type="1">
                    {/*In the below react map function users should be replaced by
                    selectedUsers*/}
                    {this.state.users.map(
                        //mapping thorugh each selectedUsers item present in database 
                        //and performing taks with them
                        //as below
                        person=>(
                            <div key={person.id}>
                                <li>
                                    {/* display whatever user/worker info you want to within curly braces
                                        from the database
                                     */}
                                    {person.name} <br/>
                                    {person.website}
                                </li>
                                <input type="checkbox" id={person.id} value={person} 
                                    onChange={()=>this.handleChange(person)}
                                />
                            </div>
                        )
                    )}
                </ol>
            </div>
        )
    }
}

export default ProfileList
