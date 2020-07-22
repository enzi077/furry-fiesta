import React, { Component } from 'react'
import SignIn from './SignIn'
import firebaseOb from '../../../firebase'
import '../../styles/register.css'

class SignUp extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             hirerName:'',
             hirerEmail:'',
             hirerPassword:'',
             hirerContact:'',
             hirerOrg:'',
             selectedWorkers: [],
             page:props.page
        }
    }
    
    componentDidMount=()=>{
        this.setState({
            page: 'signup'
        })
    }
    
    onChngTxt=(e)=>{
        e.preventDefault()
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    
    submitFormHandler=(e)=>{
        //send hirer details to database from here
        const {hirerName,hirerEmail,hirerPassword,hirerContact,hirerOrg,selectedWorkers}=this.state
        const hirerData={
            hirerName,
            hirerEmail,
            hirerContact,
            hirerOrg,
            selectedWorkers: []
        }
        var firebaseDb=firebaseOb.database().ref()
        firebaseOb.auth().createUserWithEmailAndPassword(hirerEmail,hirerPassword)
        .then(function() {
            firebaseDb.child('hirers').push(
                hirerData,
                err=>{
                    if(err)
                        console.log(err);
                }
            )
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code
            var errorMessage = error.message
            // ...
            if (errorCode === 'auth/weak-password') {
                alert('The password is too weak.')
            } else {
                alert(errorMessage)
            }
            console.log(error)
        })
        
        e.preventDefault()
        this.setState({
            page:'signin'
        })
    }
    
    gotoSignIn=()=>{
        //link loads signin component
        this.setState({
            page:'signin'
        })
    }
    
    render() {
        const {hirerName,hirerEmail,hirerPassword,hirerContact,hirerOrg,page}=this.state
        if(page === 'signup'){
            return (
                <div className="containerSignUp">
                    <form onSubmit={this.submitFormHandler}>
                        <h1>Sign Up</h1>
                        <div className="formElementsReg">
                            <input
                                type="text"
                                placeholder="Name *"
                                name="hirerName"
                                value={hirerName}
                                onChange={this.onChngTxt}
                            />
                            <input
                                type="email"
                                placeholder="E-Mail"
                                name="hirerEmail"
                                value={hirerEmail}
                                onChange={this.onChngTxt}
                            />
                            <input
                                type="password"
                                placeholder="Password *"
                                name="hirerPassword"
                                value={hirerPassword}
                                onChange={this.onChngTxt}
                            />
                            <input
                                type="tel"
                                placeholder="Contact Number *"
                                name="hirerContact"
                                value={hirerContact}
                                onChange={this.onChngTxt}
                            />
                            <input
                                type="text"
                                placeholder="Company/Organization"
                                name="hirerOrg"
                                value={hirerOrg}
                                onChange={this.onChngTxt}
                            />
                            <button type="submit">Sign Up</button>
                        </div>
                    </form>
                    <br/>
                    <button className="linkBtn" onClick={this.gotoSignIn}>
                        Already registered ? Sign In here.
                    </button>
                </div>
            )
        }
        else{
            return(
                <div>
                    <SignIn onSignIn={this.props.onSignIn}/>
                </div>
            )
        }
    }
}

export default SignUp
