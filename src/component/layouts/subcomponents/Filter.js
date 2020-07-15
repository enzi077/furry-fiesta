import React, { Component } from 'react'
import '../../styles/filter.css'

class Filter extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             state:'',
             gender:'',
             age:''
        }
    }
    
    chngStateFilter=(e)=>{
        this.setState({
            state: e.target.value
        })
    }
    
    chngGenderFilter=(e)=>{
        this.setState({
            gender: e.target.value
        })
    }
    
    chngAgeFilter=(e)=>{
        this.setState({
            age: e.target.value
        })
    }
    
    render() {
        const {state,gender,age}=this.state
        return (
            <div className="filterBar">
                <select onChange={this.chngStateFilter}>
                    <option value="" selected disabled>Location</option>
                    <option value="a">A</option>
                    <option value="b">B</option>
                    <option value="c">C</option>
                </select>
                <select onChange={this.chngGenderFilter}>
                    <option value="" selected disabled>Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other (LGBTQ+)</option>
                </select>
                <select onChange={this.chngAgeFilter}>
                    <option value="" selected disabled>Age</option>
                    <option value="20-30">20-30</option>
                    <option value="30-40">30-40</option>
                    <option value="40-100">40-100</option>
                </select>
            </div>
        )
    }
}


export default Filter
