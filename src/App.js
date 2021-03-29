import './App.css';
import React , { Component } from 'react';
import Button from './components/Buttons'

class App extends Component{

  constructor(props){
    super(props);

    this.state = {
      current:'',
      previous: [],
      next : false,
      result:0,
      sign:''
    }
  }

   reset = () => {
    this.setState({current:'0',previous:[] , sign:''});
  }

  addToCurrent = (symbol) => {

    if(['/','*','-','+'].indexOf(symbol) > -1 ){
      let {current , previous} = this.state
      if(previous.length > 0){
        previous.push( String(eval(String(previous[previous.length -1 ] + this.state.sign + current)) ))
        this.setState({current:'', sign:''})
      }else{
        previous.push(this.state.current)
      }
      this.setState({previous , next:true , sign:symbol})
      console.log(this.state.previous)
    }else{
      if(this.state.current === '0' && symbol !== '.' || this.state.next){
        this.setState({current:symbol , next:false})
      }else{
        this.setState({current:this.state.current + symbol})
      }
    }
  }

  calculate = (s) => {
    let {current , previous , next} = this.state;
    if(previous.length > 0 ){
      current = eval(String(previous[previous.length -1 ] + this.state.sign + current))
      this.setState({current , previous:[] , next:true ,sign:''})
    }
  }

  render(){

    const variables = [
      {symbol:'c' , cols:3 , action: this.reset},
      {symbol:'/' , cols:1 , action: this.addToCurrent},
      {symbol:'7' , cols:1 , action: this.addToCurrent},
      {symbol:'8' , cols:1 , action: this.addToCurrent},
      {symbol:'9' , cols:1 , action: this.addToCurrent},
      {symbol:'*' , cols:1 , action: this.addToCurrent},
      {symbol:'4' , cols:1 , action: this.addToCurrent},
      {symbol:'5' , cols:1 , action: this.addToCurrent},
      {symbol:'6' , cols:1 , action: this.addToCurrent},
      {symbol:'-' , cols:1 , action: this.addToCurrent},
      {symbol:'1' , cols:1 , action: this.addToCurrent},
      {symbol:'2' , cols:1 , action: this.addToCurrent},
      {symbol:'3' , cols:1 , action: this.addToCurrent},
      {symbol:'+' , cols:1 , action: this.addToCurrent},
      {symbol:'0' , cols:2 , action: this.addToCurrent},
      {symbol:'.' , cols:1 , action: this.addToCurrent},
      {symbol:'=' , cols:1 , action: this.calculate},

    ]

    return (
      <div>

        {this.state.previous.length > 0 ?  <div className="floaty-last">{this.state.previous[this.state.previous.length - 1]}</div> : null}
        {this.state.sign ? <div className='sign'>{this.state.sign}</div> : '' }
        <input type="text" className='result' value ={this.state.current} />
        <br></br>

        { variables.map((btn , i) => {
          return <Button key={i} symbol={btn.symbol} cols={btn.cols} action={ (symbol) => btn.action(symbol)} />
        } )}
      </div>
    )
  }
}


export default App;
