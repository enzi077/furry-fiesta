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
             page: props.page
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
                            <input
                                type="number"
                                placeholder="Your age in years"
                                name="age"
                                value={age}
                                onChange={this.onChngTxt}
                            />
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
                                <option value="a">A</option>
                                <option value="b">B</option>
                                <option value="c">C</option>
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
