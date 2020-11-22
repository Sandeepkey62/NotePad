import React, { Component } from 'react';
import '../style/additem.css';
class Additem extends Component {
  constructor(props){
    super(props);
    this.state={
      title: 'Add Note',
      act: 0,
      index: '',
      items: []
    }
  } 

  componentDidMount(){
    this.refs.name.focus();
  }

  Submit = (e) =>{
    e.preventDefault();
    let items = this.state.items;
    let name = this.refs.name.value;
    let area = this.refs.area.value;
    let date = this.refs.date.value;

    if(this.state.act === 0){   
      let data = {
        name, area,date
      }
      items.push(data);
    }else{                      
      let index = this.state.index;
      items[index].name = name;
      items[index].area = area;
      items[index].date = date;
    }    

    this.setState({
      items: items,
      act: 0
    });

    this.refs.myForm.reset();
    this.refs.name.focus();
  }



  editItem = (i) => {
    let data = this.state.items[i];
    this.refs.name.value = data.name;
    this.refs.area.value = data.area;
    this.refs.date.value = data.date;

    this.setState({
      act: 1,
      index: i
    });

    this.refs.name.focus();
  }  
discard=(e)=>{
	    e.preventDefault();

	 this.refs.myForm.reset();
}
  render() {
    let items = this.state.items;
    return (
      <div id="main">
       
         <div className="addItems">
          <h2 className="heading">{this.state.title}</h2>
        <form ref="myForm" className="myForm">
      <input type="date"
       className="date"
       name="date"
       ref="date"
       value={this.state.date}
       onChange={this.handleChange}
       />
      
        <label className="titleid">Title</label>
          <input
           type="text"
            ref="name"
            className="item" />
          <label className="contentId">Content</label>
            <textarea
             ref="area"
            className="content"
           name="area"
           value={this.state.area}
           onChange={this.handleChange}
        />
     <button
        id="adds" 
       onClick={(e)=>this.Submit(e)} >Save</button>
      <button
        className="discardbtn"
        onClick={this.discard}>Discard</button>
        </form>
      </div>
    <div className="informations">
        <pre>
          {items.map((data, i) =>
            <li key={i} className="myList">
              <h2>{i+1}. {data.name} </h2>
              <pre> {data.area}</pre> 
              {data.date}
              <button
               onClick={()=>this.editItem(i)}
                className="Editbutton">Edit </button>
                <hr/>
            </li>
          )}
        </pre>
        </div>
      </div>
    );
  }
}

export default Additem;