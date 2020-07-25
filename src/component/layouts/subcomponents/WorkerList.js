import React, { Component } from 'react'
import '../../styles/listWorker.css'
import firebaseOb from '../../../firebase'

class WorkerList extends Component {
    _isMounted=false
    constructor(props) {
        super(props)
    
        this.state = {
             workers: [],
             selectedWorkers: [],
             state: '',
             gender:'',
             age:'',
             isChecked: false
        }
    }
    
    componentDidMount(){
        this._isMounted=true
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
        e.preventDefault()
    }
    //this method calls on pick button listener
    //will send the selectedWorkers state to the database
    onPick=()=>{
        var currentHirer=firebaseOb.auth().currentUser
        var hirerRef=firebaseOb.database().ref().child('hirers')
        if(currentHirer)
        {
            var myWorkers= []
            //let workersList=this.state.workers.slice()
            //let selectedList=this.state.selectedWorkers.slice()
            myWorkers=this.state.selectedWorkers
            hirerRef.once('value',function(snapshot){
                snapshot.forEach(function(hirer){
                    if(currentHirer.email===hirer.val().hirerEmail){
                        var firebaseDb=firebaseOb.database().ref('hirers/'+hirer.key)
                            firebaseDb.update({
                                selectedWorkers: myWorkers
                            })
                    }
                })
            })
            
            // this.setState({
            //     workers: workersList.filter((obj)=>{ return selectedList.indexOf(obj) === -1; })
            // })
        }else{
            this.render()
        }
    }
    
    render() {
        const{state,gender,age}=this.props
        let workersList=this.state.workers.slice()
        if(state){
            workersList=workersList.filter(worker=>worker.state===state)
        }
        if(gender){
            workersList=workersList.filter(worker=>worker.gender===gender)
        }
        if(age){
            workersList=workersList.filter(worker=>worker.age===age)
        }
        if(workersList){
            return (
                <div className='containerList'>
                    <h1>Applicants:</h1>
                    <button type="submit" onClick={this.onPick}>Pick</button>
                    <ol type="1">
                        {workersList
                        .map(
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
        }else{
            return(
                <div className='containerList'>
                    <h1>No workers avilable</h1>
                </div>
            )
        }
    }
}

export default WorkerList