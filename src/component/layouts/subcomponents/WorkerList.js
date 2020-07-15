import React, { Component } from 'react'
import '../../styles/listWorker.css'
import axios from 'axios'

class WorkerList extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             users: props.users,
             selectedUsers: props.selectedUsers,
             state: props.state,
             gender:props.gender,
             age:props.age
        }
    }
    
    componentDidMount(){
        //data for both users and selectedUsers would be retrieved from database
        //get them here
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then(res=>{
                const users=res.data
                this.setState({
                    users
                })
            })
    }
    
    //sets the value of selectedUsers with checkbox check
    //onPick method confirms this state to the database
    handleChange=(person)=>{
        this.setState({
            selectedUsers:[...this.state.selectedUsers,person]
        })
    }
    
    //this method calls on pick button listener
    //will send the selectedUsers state to the database
    onPick=(e)=>{
        // axios.post("https://jsonplaceholder.typicode.com/users",{
        //     selectedUsers
        // })
    }
    
    render() {
        return (
            <div className='containerList'>
                <h1>Applicants:</h1>
                <button type="submit" onClick={this.onPick}>Pick</button>
                <ol type="1">
                    {this.state.users.map(
                        //users will be a state as well as a database object
                        //mapping thorugh each item in users present in databse and performing taks with them
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

export default WorkerList
