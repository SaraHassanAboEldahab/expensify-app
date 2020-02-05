import React from 'react';
import { connect } from "react-redux";
import ExpensesListItem from './ExpenseListItem';
import selectExpense from '../selectors/expenses';

//note => when we connct new component to redux store , as the store changes this component will rerender with new values
const ExpensesList =(props)=>(
    <div>
        <h1>Expenses List</h1>
        {props.expenses.map((expense)=>{
            return <ExpensesListItem key={expense.id} {...expense}/>
 
        })}
        
    </div>
)
const mapStateToProps=(state)=>{
    return{
        expenses:selectExpense(state.expenses,state.filters)
    }
}
export default connect(mapStateToProps)(ExpensesList);