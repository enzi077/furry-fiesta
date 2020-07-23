import React, { Component } from 'react'
import firebaseOb from '../../../firebase'
import '../../styles/listWorker.css'

class ProfileList extends Component {
    _isMounted=false
    constructor(props) {
        super(props)
    
        this.state = {
             selectedWorkers: props.selectedWorkers,
             updateWorker:[],
             workerAvailable:[]
        }
    }
    
    componentDidMount(){
        this._isMounted=true
        let newState=[]
        var currentHirer=firebaseOb.auth().currentUser
        var hirerRef=firebaseOb.database().ref().child('hirers')
        hirerRef.on('value',function(snapshot){
            snapshot.forEach(function(hirer) {
                if(currentHirer.email===hirer.val().hirerEmail){
                    let myWorkers=hirer.val().selectedWorkers
                    for(let myWorker in myWorkers){
                        newState.push({
                            id: myWorkers[myWorker].id,
                            name: myWorkers[myWorker].name,
                            prevWork: myWorkers[myWorker].prevWork
                        })
                    }
                }
            })
        })
        
        //setInterval(()=>{
            console.log(newState);
            if(this._isMounted)
            {
                this.setState({
                    selectedWorkers: newState
                })
            }
        //}, 50)
    }
    
    componentWillUnmount(){
        this._isMounted=false
    }
    
    //remove Worker from the hirer's selectedWorkers List 
    handleChange=(worker,e)=>{
        if(e.target.checked===true){
            this.setState({
                // updateWorker:this.state.updateWorker.filter(function(person){
                //     return person!==worker
                // })
                workerAvailable:[...this.state.workerAvailable,worker]
            })
        }else{
            this.setState({
                updateWorker:[...this.state.updateWorker,worker]
            })
        }
    }
    
    //confirms the removal of Worker from the hirer's selectedWorkers list
    onDel=()=>{
        var currentHirer=firebaseOb.auth().currentUser
        var hirerRef=firebaseOb.database().ref().child('hirers')
        var workerRef=firebaseOb.database().ref().child('workers')
        if(currentHirer)
        {
            var setNewWorker= []
            setNewWorker=this.state.updateWorker
            hirerRef.on('value',function(snapshot){
                snapshot.forEach(function(hirer){
                    if(currentHirer.email===hirer.val().hirerEmail){
                        var firebaseDb=firebaseOb.database().ref('hirers/'+hirer.key)
                            firebaseDb.update({
                                selectedWorkers: setNewWorker
                            })
                    }
                })
            })
            
            var updtWorkerList=this.state.workerAvailable
            workerRef.on('value',function(snapshot){
                snapshot.forEach(function(worker){
                    updtWorkerList.forEach(updtWorker=>{
                        var firebaseDb=firebaseOb.database().ref('workers/'+worker.key)
                        if(worker.key===updtWorker.id){
                            firebaseDb.update({
                                available: true
                            })
                        }else{
                            firebaseDb.update({
                                available: false
                            })
                        }
                    })
                })
            })
        }else{
            this.render()
        }
    }
    
    render() {
        return (
            <div className='containerList'>
                <h1>Your picks:</h1>
                <button type="submit" onClick={this.onDel}>Remove</button>
                <ol type="1">
                    {this.state.selectedWorkers
                        .map(worker=>(
                            <div key={worker.id}>
                                <li>
                                    <b>Name:</b>{worker.name} <br/>
                                    <b>Previous work:</b>{worker.prevWork}
                                </li>
                                <input type="checkbox" id={worker.id} value={worker} 
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

export default ProfileList