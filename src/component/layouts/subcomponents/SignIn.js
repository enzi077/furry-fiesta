import React, { Component } from 'react'
import SignUp from './SignUp'
import firebaseOb from '../../../firebase'
import '../../styles/register.css'

class SignIn extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             hirerName:'',
             hirerEmail:'',
             hirerPassword:'',
             page:'signin'
        }
    }
    
    submitFormHandler=(e)=>{
        firebaseOb.auth().signInWithEmailAndPassword(this.state.hirerEmail, this.state.hirerPassword)
        .then(()=>{
            this.props.onSignIn()
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        })
        e.preventDefault()
    }
    
    onChngTxt=(e)=>{
        e.preventDefault()
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    
    forgotPassword=(e)=>{
        //code for reset of passoword
    }
    
    gotoSignUp=()=>{
        this.setState({
            page:'signup'
        })
    }
    
    render() {
        const {hirerEmail,hirerPassword,page}=this.state
        switch (page) {
            case 'signin':
                return (
                    <div className="containerSignUp">
                        <form onSubmit={this.submitFormHandler}>
                            <h1>Sign In</h1>
                            <div className="formElementsReg">
                                <input
                                    type="text"
                                    placeholder="E-Mail *"
                                    name="hirerEmail"
                                    value={hirerEmail}//(or value={hirerName}) 
                                    onChange={this.onChngTxt}
                                />
                                <input
                                    type="password"
                                    placeholder="Password *"
                                    name="hirerPassword"
                                    value={hirerPassword}
                                    onChange={this.onChngTxt}
                                />
                                <button type="submit">Sign In</button>
                            </div>
                        </form>
                        <br/>
                        <button className="linkBtn" onClick={this.forgotPassword}>
                            Forgot password ?
                        </button>
                        <br/>
                        <button className="linkBtn" onClick={this.gotoSignUp}>
                            Not a registered user ? Sign Up here.
                        </button>
                    </div>
                )
            case 'signup':
                return(
                    <div>
                        <SignUp page={page}/>
                    </div>
                )
            default:
                return (
                    <div className="containerSignUp">
                        <form onSubmit={this.submitFormHandler}>
                            <h1>Sign In</h1>
                            <div className="formElementsReg">
                                <input
                                    type="text"
                                    placeholder="E-Mail *"
                                    name="hirerEmail"
                                    value={hirerEmail}//(or value={hirerName}) 
                                    onChange={this.onChngTxt}
                                />
                                <input
                                    type="password"
                                    placeholder="Password *"
                                    name="hirerPassword"
                                    value={hirerPassword}
                                    onChange={this.onChngTxt}
                                />
                                <button type="submit">Sign In</button>
                            </div>
                        </form>
                        <br/>
                        <button className="linkBtn" onClick={this.forgotPassword}>
                            Forgot password ?
                        </button>
                        <br/>
                        <button className="linkBtn" onClick={this.gotoSignUp}>
                            Not a registered user ? Sign Up here.
                        </button>
                    </div>
                )
        }
    }
}

export default SignIn
