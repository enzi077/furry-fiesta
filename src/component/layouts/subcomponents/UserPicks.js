import React, { Component } from 'react'
import '../../styles/userpicks.css'
import firebaseOb from '../../../firebase'
import axios from 'axios'

class UserPicks extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             selectedWorkers:[]
        }
    }
    
    componentDidMount(){
        //here selectedUsers would be retrieved from database
        let newState=[]
        var currentHirer=firebaseOb.auth().currentUser
        var hirerRef=firebaseOb.database().ref().child('hirers')
            hirerRef.on('value',function(snapshot){
                //let newState=[]
                snapshot.forEach(function(hirer) {
                    if(currentHirer.email===hirer.val().hirerEmail){
                        //var firebaseDb=firebaseOb.database().ref('hirers/'+hirer.key)
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
        this.setState({
            selectedWorkers: newState
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
                    {this.state.selectedWorkers.map(myWorker=>(
                        <div key={myWorker.id}>
                            <li>
                                <b>Name:</b> {myWorker.name} <br/>
                                <b>Previous work:</b> {myWorker.prevWork}
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
