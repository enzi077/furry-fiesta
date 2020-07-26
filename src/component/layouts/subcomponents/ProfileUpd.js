import React, { Component } from 'react'
import firebaseOb from '../../../firebase'
import '../../styles/register.css'

class ProfileUpd extends Component {
    _isMounted=false
    constructor(props) {
        super(props)
        
        //get values of following fields from database here
        this.currentHirer=firebaseOb.auth().currentUser
        this.hirerRef=firebaseOb.database().ref().child('hirers')
        this.state = {
             hirerName:'',
             hirerContact:'',
             hirerOrg:''
        }
    }
    
    componentDidMount(){
        this._isMounted=true
        let newState=[]
        this.hirerRef.on('value',snapshot=>{
            snapshot.forEach(hirer=>{
                if(this.currentHirer.email===hirer.val().hirerEmail){
                    newState.push({
                        hirerName: hirer.val().hirerName,
                        hirerContact: hirer.val().hirerContact,
                        hirerOrg: hirer.val().hirerOrg
                    })
                }else{
                    alert("No data found")
                }
            })
            if(this._isMounted){
                this.setState({
                    hirerName:newState[0].hirerName,
                    hirerContact:newState[0].hirerContact,
                    hirerOrg:newState[0].hirerOrg
                })
            }
        })
    }
    
    componentWillUnmount(){
        this._isMounted=false
    }
    
    onChngTxt=(e)=>{
        e.preventDefault()
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    
    submitFormHandler=(e)=>{
        const {hirerName,hirerContact,hirerOrg}=this.state
        
        this.hirerRef.on('value',(snapshot)=>{
            snapshot.forEach((hirer)=>{
                var firebaseDb=firebaseOb.database().ref('hirers/'+hirer.key)
                if(hirer.key){
                    firebaseDb.update({
                        hirerName: hirerName,
                        hirerContact: hirerContact,
                        hirerOrg: hirerOrg
                    })
                }else{
                    alert("Profile details not found")
                }
            })
        })
    }
    
    render() {
        const {hirerName,hirerContact,hirerOrg}=this.state
            return (
                <div className="containerSignUp">
                    <form onSubmit={this.submitFormHandler}>
                        <h1>Profile</h1>
                        <div className="formElementsReg">
                            <input
                                type="text"
                                placeholder={hirerName}
                                name="hirerName"
                                value={hirerName}
                                onChange={this.onChngTxt}
                            />
                            <input
                                type="tel"
                                placeholder={hirerContact}
                                name="hirerContact"
                                value={hirerContact}
                                onChange={this.onChngTxt}
                            />
                            <input
                                type="text"
                                placeholder={hirerOrg}
                                name="hirerOrg"
                                value={hirerOrg}
                                onChange={this.onChngTxt}
                            />
                            <button type="submit">Update</button>
                        </div>
                    </form>
                </div>
            )
        }
    }

export default ProfileUpd

