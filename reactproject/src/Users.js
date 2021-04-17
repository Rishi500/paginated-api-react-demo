import React from 'react'
export default class Users extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        console.log(this.props.details)
        return(<tr>
                <td>{this.props.index}</td>
                <td>{this.props.details.name}</td>
                <td>{this.props.details.trips}</td>
                </tr>
        )
    }
}