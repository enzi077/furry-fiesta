import React, { Component } from 'react'
import SignUp from './SignUp'
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
        //this methods checks for authorised user and then signs the user in the site
        //below snippet to be ignored
        const {hirerName}=this.state
        alert(`
            Name: ${hirerName}
        `)
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
        const {hirerName,hirerEmail,hirerPassword,page}=this.state
        if(page==='signin'){
            return (
                <div className="containerSignUp">
                    <form onSubmit={this.submitFormHandler}>
                        <h1>Sign In</h1>
                        <div className="formElementsReg">
                            <input
                                type="text"
                                placeholder="Name / E-Mail *"
                                name="hirerName"
                                value={hirerName}//(or value={hirerEmail}) 
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
        }else{
            return(
                <div>
                    <SignUp page={page}/>
                </div>
            )
        }
    }
}

export default SignIn
