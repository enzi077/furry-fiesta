import React, { Component } from 'react'
import WriteUp from './WorkerformWriteUp'
import '../styles/worker.css'
import Landing from './Landing'
import firebaseOb from '../../firebase'

class WorkerForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             workers:[],
             name:'',
             gender:'',
             age:'',
             city:'',
             state:'',
             prevWork:'',
             contact:'',
             available:true,
             page: 'worker_form'
        }
    }
    
    chngState=(e)=>{
        e.preventDefault()
        this.setState({
            state:e.target.value
        })
    }
    
    getGender=(e)=>{
        e.preventDefault()
        this.setState({
            gender: e.target.value
        })
    }
    
    chngAge=(e)=>{
        e.preventDefault()
        this.setState({
            age: e.target.value
        })
    }
    
    onChngTxt=(e)=>{
        e.preventDefault()
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    
    submitFormHandler=(e)=>{
        //upload/add worker data to database in this method
        const {name,gender,age,city,state,prevWork,contact,available}=this.state
        var firebaseDb=firebaseOb.database().ref()
        const data={
            name,
            gender,
            age,
            city,
            state,
            prevWork,
            contact,
            available
        }
        
        firebaseDb.child('workers').push(
            data,
            err=>{
                if(err)
                    console.log(err);
            }
        )
        this.setState({
            page:'home'
        })
        e.preventDefault()
    }
    
    render() {
        const {name,age,city,state,prevWork,page,contact}=this.state
        if(page!=='home'){
            return (
                <div className="containerWorker">
                    <WriteUp goback={this.props.goback}/>
                    <form onSubmit={this.submitFormHandler}>
                        <div className="formElementsWorker">
                            <label>Name *</label>
                            <input
                                type="text"
                                placeholder="Your name"
                                name="name"
                                value={name}
                                onChange={this.onChngTxt}
                            />
                        </div>
                        <div className="genderRadio" onChange={this.getGender}>
                            <label>Gender *</label><br/><br/>
                                <input type="radio" id="male" name="gender" value="male" 
                                    />
                                <label htmlFor="male">Male</label><br/>
                                <input type="radio" id="female" name="gender" value="female" 
                                    />
                                <label htmlFor="female">Female</label><br/>
                                <input type="radio" id="other" name="gender" value="other" 
                                    />
                                <label htmlFor="other">Other (LGBTQ+)</label><br/><br/>
                        </div>
                        <div className="formElementsWorker">
                            <label>Age *</label>
                            <select value={age} selected onChange={this.chngAge}>
                                <option value="" selected disabled>Age Range</option>
                                <option value="20-30">20-30 yrs</option>
                                <option value="31-40">31-40 yrs</option>
                                <option value="41-50">41-50 yrs</option>
                                <option value="51-60">51-60 yrs</option>
                            </select>
                        </div>
                        <div className="formElementsWorker">
                            <label>City *</label>
                            <input
                                type="text"
                                placeholder="Where do you live ?"
                                name="city"
                                value={city}
                                onChange={this.onChngTxt}
                            />
                        </div>
                        <div className="formElementsWorker">
                            <label>State *</label>
                            <select value={state} selected onChange={this.chngState}>
                                <option value="" selected disabled>Location</option>
                                <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                <option value="Assam">Assam</option>
                                <option value="Bihar">Bihar</option>
                                <option value="Chandigarh">Chandigarh</option>
                                <option value="Chhattisgarh">Chhattisgarh</option>
                                <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Goa">Goa</option>
                                <option value="Gujarat">Gujarat</option>
                                <option value="Haryana">Haryana</option>
                                <option value="Himachal Pradesh">Himachal Pradesh</option>
                                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                <option value="Jharkhand">Jharkhand</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Kerala">Kerala</option>
                                <option value="Ladakh">Ladakh</option>
                                <option value="Lakshadweep">Lakshadweep</option>
                                <option value="Madhya Pradesh">Madhya Pradesh</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Manipur">Manipur</option>
                                <option value="Meghalaya">Meghalaya</option>
                                <option value="Mizoram">Mizoram</option>
                                <option value="Nagaland">Nagaland</option>
                                <option value="Odisha">Odisha</option>
                                <option value="Puducherry">Puducherry</option>
                                <option value="Punjab">Punjab</option>
                                <option value="Rajasthan">Rajasthan</option>
                                <option value="Sikkim">Sikkim</option>
                                <option value="Tamil Nadu">Tamil Nadu</option>
                                <option value="Telangana">Telangana</option>
                                <option value="Tripura">Tripura</option>
                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                <option value="Uttarakhand">Uttarakhand</option>
                                <option value="West Bengal">West Bengal</option>
                            </select>
                        </div>
                        <div className="formElementsWorker">
                            <label>Previously worked as</label>
                            <input
                                type="text"
                                placeholder="Your answer"
                                name="prevWork"
                                value={prevWork}
                                onChange={this.onChngTxt}
                            />
                        </div>
                        <div className="formElementsWorker">
                            <label>Contact Number *</label>
                            <input
                                type="tel"
                                placeholder="Your contact number"
                                name="contact"
                                value={contact}
                                onChange={this.onChngTxt}
                            />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )
        }else{
            return <Landing/>
        }
    }
}

export default WorkerForm
