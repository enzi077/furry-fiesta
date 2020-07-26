import React, { Component } from 'react'
import '../../styles/userpicks.css'
import firebaseOb from '../../../firebase'

class UserPicks extends Component {
    _isMounted=false
    constructor(props) {
        super(props)
		
        this.currentHirer=firebaseOb.auth().currentUser
        this.state = {
             selectedWorkers:[]
        }
	}
    
    
    componentDidMount(){
        this._isMounted=true
        let newState=[]
        var hirerRef=firebaseOb.database().ref().child('hirers')
        var myMail=this.currentHirer.email
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
                                age: myWorkers[myWorker].age,
                                gender: myWorkers[myWorker].gender,
                                state: myWorkers[myWorker].state,
                                city: myWorkers[myWorker].city,
                                contact: myWorkers[myWorker].contact,
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
        var myWorkers=this.state.selectedWorkers
        //send mail to the hirer with all the contact details of the worker
        //no need to have a data field for avilability
        // BODY_TXT contains email write up to be sent
        alert("Check your mail.")
        var body_txt=myWorkers.map(worker=>{
            return (
                `Name=${worker.name} \n`+
                `Age=${worker.age} yrs \n`+
                `Gender=${worker.gender} \n`+
                `State=${worker.state} \n`+
                `City=${worker.city} \n`+
                `Contact=${worker.contact} \n`+
                `Previously worked as=${worker.prevWork} || \n\n`
            )
        })
        //console.log(name);
        // var hirer_mail=this.currentHirer.email
        // console.log(hirer_mail);
        // Email.send({
        //     Host : "smtp.yourisp.com",
        //     Username : "kaamdani01@gmail.com",
        //     Password : "**********",
        //     To : hirer_mail,
        //     From : "kaamdani01@gmail.com",
        //     Subject : "Kaamdani (Your workers)",
        //     Body : body_txt
        // }).then(
        // message => alert(message)
        // )
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
