import React, { Component } from 'react'
import '../../styles/listWorker.css'
import firebaseOb from '../../../firebase'

class WorkerList extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             workers: props.workers,
             selectedWorkers: [],
             state: props.state,
             gender:props.gender,
             age:props.age,
             isChecked: false
        }
    }
    
    componentDidMount(){
        //data for both users and selectedUsers would be retrieved from database
        //get them here
        var firebaseDb=firebaseOb.database().ref()
        const workersRef=firebaseDb.child('workers')
        workersRef.on('value',(snapshot)=>{
            let workers=snapshot.val()
            let newState=[]
            for(let worker in workers){
                newState.push({
                    id: worker,
                    name: workers[worker].name,
                    gender: workers[worker].gender,
                    prevWork: workers[worker].prevWork,
                    contact: workers[worker].contact,
                    city: workers[worker].city,
                    age:workers[worker].age,
                    state:workers[worker].state
                })
            }
            
            this.setState({
                workers: newState
            })
        })
    }
    
    //sets the value of selectedUsers with checkbox check
    handleChange=(worker,e)=>{
        if(e.target.checked===true){
            this.setState({
                selectedWorkers:[...this.state.selectedWorkers,worker]
            })
        }else{
            this.setState({
                selectedWorkers:this.state.selectedWorkers.filter(function(person){
                    return person!==worker
                })
            })
        }
    }
    //this method calls on pick button listener
    //will send the selectedUsers state to the database
    onPick=()=>{
        var currentHirer=firebaseOb.auth().currentUser
        var hirerRef=firebaseOb.database().ref().child('hirers')
        if(currentHirer)
        {
            var myWorkers= []
            myWorkers=this.state.selectedWorkers
            hirerRef.on('value',function(snapshot){
                snapshot.forEach(function(hirer){
                    if(currentHirer.email===hirer.val().hirerEmail){
                        var firebaseDb=firebaseOb.database().ref('hirers/'+hirer.key)
                            firebaseDb.update({
                                selectedWorkers: myWorkers
                            })
                    }
                })
            })
        }else{
            this.render()
        }
    }
    
    render() {
        return (
            <div className='containerList'>
                <h1>Applicants:</h1>
                <button type="submit" onClick={this.onPick}>Pick</button>
                <ol type="1">
                    {this.state.workers.map(
                        //users will be a state as well as a database object
                        //mapping thorugh each item in users present in databse and performing taks with them
                        //as below
                        worker=>(
                            <div key={worker.id}>
                                <li>
                                    {/* display whatever user/worker info you want to within curly braces
                                        from the database
                                     */}
                                    <b>Name:</b> {worker.name} <br/>
                                    <b>Previous work:</b> {worker.prevWork}
                                </li>
                                <input type="checkbox" id={worker.id} 
                                    value={worker} 
                                    onChange={(e)=>this.handleChange(worker,e)}
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
