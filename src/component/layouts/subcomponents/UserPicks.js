import React, { Component } from 'react'
import '../../styles/userpicks.css'
import firebaseOb from '../../../firebase'
import axios from 'axios'

class UserPicks extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             selectedWorkers:props.selectedWorkers
        }
    }
    
    componentDidMount(){
        //here selectedWorkers would be retrieved from database
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
        setInterval(()=>{
            this.setState({
                selectedWorkers: newState
            })
        }, 2000)
    }
    
    onPick=()=>{
        var workerRef=firebaseOb.database().ref().child('workers')
        var myWorkers=this.state.selectedWorkers
            workerRef.on('value',function(snapshot){
                snapshot.forEach(function(worker){
                    myWorkers.map(selectedWorker=>{
                        var firebaseDb=firebaseOb.database().ref('workers/'+worker.key)
                        if(worker.key===selectedWorker.id){
                            firebaseDb.update({
                                available: false
                            })
                        }else{
                            firebaseDb.update({
                                available: true
                            })
                        }
                    })
                })
            })
    }
    
    
    render() {
        return (
            <div className='containerPicks'>
                <h1>Your picks :</h1>
                <button type="submit" onClick={this.onPick}>Hire all</button>
                <ol type="1">
                    {this.state.selectedWorkers
                        .map(myWorker=>(
                            <div key={myWorker.id}>
                                <li>
                                    <b>Name:</b> {myWorker.name} <br/>
                                    <b>Previous work:</b> {myWorker.prevWork}
                                </li>
                            </div>
                            )
                        )
                    }
                </ol>
            </div>
        )
    }
}

export default UserPicks
