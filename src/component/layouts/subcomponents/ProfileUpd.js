import React, { Component } from 'react'
import '../../styles/register.css'

class ProfileUpd extends Component {
    constructor(props) {
        super(props)
        
        //get values of following fields from database here
        this.state = {
             hirerName:'',
             hirerEmail:'',
             hirerPassword:'',
             hirerContact:'',
             hirerOrg:''
        }
    }
    
    onChngTxt=(e)=>{
        e.preventDefault()
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    
    submitFormHandler=(e)=>{
        //receive hirer details from database here
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
    
    render() {
        const {hirerName,hirerEmail,hirerPassword,hirerContact,hirerOrg}=this.state
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
                                type="email"
                                placeholder={hirerEmail}
                                name="hirerEmail"
                                value={hirerEmail}
                                onChange={this.onChngTxt}
                            />
                            <input
                                type="password"
                                placeholder={hirerPassword}
                                name="hirerPassword"
                                value={hirerPassword}
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

