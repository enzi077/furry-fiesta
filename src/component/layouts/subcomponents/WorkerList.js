import React, { Component } from 'react'
import '../../styles/listWorker.css'
import firebaseOb from '../../../firebase'

class WorkerList extends Component {
    _isMounted=false
    constructor(props) {
        super(props)
    
        this.state = {
             workers: props.workers,
             selectedWorkers: props.selectedWorkers,
             state: props.state,
             gender:props.gender,
             age:props.age,
             isChecked: false
        }
    }
    
    componentDidMount(){
        this._isMounted=true
        //data for both users and selectedUsers would be retrieved from database
        //get them here
        let newState=[]
        var firebaseDb=firebaseOb.database().ref()
        const workersRef=firebaseDb.child('workers')
        workersRef.on('value',(snapshot)=>{
            snapshot.forEach(worker=>{
                if(worker.val().available===true){
                    newState.push({
                        id:worker.key,
                        name: worker.val().name,
                        gender: worker.val().gender,
                        prevWork: worker.val().prevWork,
                        contact: worker.val().contact,
                        city: worker.val().city,
                        age: worker.val().age,
                        state: worker.val().state,
                        available: worker.val().available
                    })
                }
            })
        })
        console.log(newState);
        setInterval(()=>{
            if(this._isMounted){
                this.setState({
                    workers: newState
                })
            }
        },1000)
    }
    
    componentWillUnmount(){
        this._isMounted=false
    }
    
    //sets the value of selectedWorkers with checkbox check
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
    //will send the selectedWorkers state to the database
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
                        //mapping thorugh each item in users present in databse and performing taks with them
                        //as below
                        worker=>(
                            <div key={worker.id}>
                                <li>
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
