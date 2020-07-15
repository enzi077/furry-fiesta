import React, { Component } from 'react'
import Landing from './Landing'

class WorkerformWriteUp extends Component {
    goback=()=>{
        return <Landing/>
    }
    render() {
        return (
            <div>
                {/* <button style={goback}>
                    <i class="fa fa-arrow-left" aria-hidden="true"></i>
                </button> */}
                <h1 style={heading}>Labour Details Form</h1>
                <p style={writeUp}>We all are going through this COVID-19 pandemic.
                There is one lesson we all have learnt from this is,
                dragging through difficult times is easier if we are together.
                With this feeling, we are here to bring back the jobs which our
                labourers have lost. Here you are not supposed to travel to different
                states and the job will be provided within your native state. 
                Please fill out the form below and convey the same to your fellow 
                workers so that no one goes hungry again.</p>
            </div>
        )
    }
}


const heading={
    textAlign:'center'
}

const writeUp={
    float:'left',
    display:'inline-block',
    marginBottom:'50px'
}

export default WorkerformWriteUp
