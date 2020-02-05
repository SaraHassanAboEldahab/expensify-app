import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const now = moment();
console.log(now.format('Do MMM YYYY'));
export default class ExpenseForm extends React.Component {
  constructor(props){
      super(props);
      //l fekra hena eny 3ayza ama ados 3 l expense ala2y l data bta3to mogoda fel form w a2dr a3dl 3alyha
      //expense d l props l mogoda fel EditExpensePage 
      this.state = {
        description: props.expense ? props.expense.description : '',
        note: props.expense ? props.expense.note : '',
        amount: props.expense ? (props.expense.amount).toString() : '',
        createdAt:props.expense ? moment(props.expense.createdAt) : moment(),
        calenderFocused:false,
        error:""
    }
  }
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    }
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    }

    onAmountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        }

    }

    onDateChange=(createdAt)=>{
        if (createdAt){
            this.setState(()=>({createdAt}))
        }
    }

    onFocusChange=({focused})=>{
        this.setState(()=>({calenderFocused:focused}))
    }

    onSubmit=(e)=>{
       e.preventDefault();
       if(!this.state.description || !this.state.amount){
         this.setState(()=>({error:'there is an error'}))
       }else{
        this.setState(()=>({error:''}));
        this.props.onSubmit({
            description:this.state.description,
            amount:parseFloat(this.state.amount,10) * 100,
            createdAt:this.state.createdAt.valueOf(),
            note:this.state.note
        });

       }
    }
    render() {

        return (
            <div>
                {this.state.error}
                <form onSubmit={this.onSubmit}>
                    <input type="text" placeholder="description" autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input type="number" placeholder="amount" value={this.state.amount} onChange={this.onAmountChange} />
                   
                   
                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calenderFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={()=>false}
                    />

                    <textarea onChange={this.onNoteChange} placeholder="add note for ur expenses (optional)"></textarea>
                    <button>Add Expense</button>
                </form>
            </div>
        )
    }
}