import React from 'react'
import Users from './Users'
import './App.css'
export default class Pagination extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            page:1,
            per_page:10,
            total_pages:0,
            data:[],
        }
    }
    nextPage = ()=>{
        if(this.state.total_pages && this.state.page<this.state.total_pages){
            this.setState({page:this.state.page+1})
            this.getCurrentPageData(this.state.page)
        }
    }
    
    previousPage = ()=>{
        if(this.state.page && this.state.page>1){
            this.setState({page:this.state.page-1})
            this.getCurrentPageData(this.state.page)
        }
    }
    getCurrentPageData = async (page)=>{
        
        const url = `https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`
        const res = await (await fetch(url)).json()
        this.setState({
            total_pages:res.totalPages,
            data:res.data
        })
    }
    async componentDidMount(){
        await this.getCurrentPageData(1)
    }
    renderPageNumber(){
        const Pages = [];
        if(this.state.total_pages){
            for(let i=1;i<=this.state.total_pages;i++){
                Pages.push(i)
            }
        }
        let temp = Pages.map(number=>{
            if(number===1 || number ===this.state.total_pages||(number>=this.state.page-1 && number<=this.state.page+2)){
                return(<span key={number} className={number==this.state.page?"current-page page-number":"page-number"} onClick={() => {
                    this.setState({page:number})
                    this.getCurrentPageData(number);
                    this.renderPageNumber()
                }}>{number}</span>)
            }
            })

        
        return temp
    }
    renderUsers(){
        let temp = this.state.data.map((ele,index)=>{console.log(ele);return (<Users details = {ele} index={index+1} key={index}/>)})
        return temp
    }
    render(){
        return(<>
        <table>
        <thead>
            <tr>
                <td>S.No</td>
                <td>Full Name</td>
                <td>Email</td>
            </tr>
        </thead>
        <tbody>
        {this.renderUsers()}
        </tbody>
        </table>
        <span onClick={()=>{this.previousPage()}}>Previous</span>
        {this.renderPageNumber()}
        <span onClick={()=>{this.nextPage()}}>Next</span>
        </>)
    }
}