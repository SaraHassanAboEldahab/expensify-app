import React from 'react';
import {connect} from 'react-redux';
import {addExpense} from '../actions/expenses';
import ExpenseForm from './ExpenseForm';

const AddExpensePage = (props) => (
  <div>
     <ExpenseForm onSubmit={(expense)=>{
           props.dispatch(addExpense(expense))
           props.history.push('/')
     }} />
  </div>
);

export default connect()(AddExpensePage);
