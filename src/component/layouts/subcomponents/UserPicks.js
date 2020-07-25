import React, { Component } from 'react'
import '../../styles/userpicks.css'
import firebaseOb from '../../../firebase'

class UserPicks extends Component {
    _isMounted=false
    constructor(props) {
        super(props)
		
        this.state = {
             selectedWorkers:[]
        }
	}
    
    
    componentDidMount(){
        this._isMounted=true
        let newState=[]
        var currentHirer=firebaseOb.auth().currentUser
        var hirerRef=firebaseOb.database().ref().child('hirers')
        var myMail=currentHirer.email
        // console.log(myMail);
        hirerRef.on('value',function(snapshot,prevChildKey){
            snapshot.forEach(function(hirer) {
                if(myMail===hirer.val().hirerEmail){
                    let myWorkers=hirer.val().selectedWorkers
                    for(let myWorker in myWorkers){
                        if(myWorkers[myWorker].id!==prevChildKey){
                            newState.push({
                                id: myWorkers[myWorker].id,
                                name: myWorkers[myWorker].name,
                                prevWork: myWorkers[myWorker].prevWork
                            })
                        }
                    }
                }
            })
        })
        
        setInterval(()=>{
            //console.log(newState);
            if(this._isMounted)
            {
                this.setState({
                    selectedWorkers: newState
                })
            }
        }, 1000)
    }
    
    componentWillUnmount(){
        this._isMounted=false
    }
    
    onPick=()=>{
        var workerRef=firebaseOb.database().ref().child('workers')
        var myWorkers=this.state.selectedWorkers
        //send mail to the hirer with all the contact details of the worker
        //no need to have a data field for avilability
        ///console.log(myWorkers)
            // workerRef.once('value',(snapshot)=>{
            //     snapshot.forEach((worker)=>{
            //         myWorkers.forEach(selectedWorker=>{
            //             var firebaseDb=firebaseOb.database().ref('workers/'+worker.key)
            //             if(worker.key===selectedWorker.id){
            //                 firebaseDb.update({
            //                     available: false
            //                 })
            //             }else{
            //                 firebaseDb.update({
            //                     available: true
            //                 })
            //             }
            //         })
            //     })
            // })
    }
    
    render() {
        //let myList=this.state.selectedWorkers.slice()
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
