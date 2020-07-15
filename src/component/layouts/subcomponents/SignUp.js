import React, { Component } from 'react'
import SignIn from './SignIn'
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
             page:'signup'
        }
    }
    
    onChngTxt=(e)=>{
        e.preventDefault()
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    
    submitFormHandler=(e)=>{
        //send hirer details to database from here
        //below is for demo purpose only
        const {hirerName,hirerEmail,hirerContact,hirerOrg}=this.state
        alert(`
            Name: ${hirerName},
            Email: ${hirerEmail},
            Contact:${hirerContact},
            Org:${hirerOrg}
        `)
        e.preventDefault()
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
                    <SignIn page={page}/>
                </div>
            )
        }
    }
}

export default SignUp
