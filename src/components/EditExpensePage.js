import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';


const EditExpensePage = (props) => {
  return (
    <div>
      <ExpenseForm
        expense={props.expense}
        onSubmit={(expense) => {
          props.dispatch(editExpense(props.expense.id, expense));
          props.history.push('/')
        }}
      />
      
      { /*<Link to={'/'}>
       <button onClick={() => {
         props.dispatch(removeExpense({id:props.expense.id}));
       }}>Remove</button>
       </Link>*/}
      <button onClick={() => {
        props.dispatch(removeExpense({ id: props.expense.id }));
        props.history.push('/')

      }}>Remove</button>

    </div>
  );
};
//where find allow us to search through array looking for single item (y3ny ama ados 3 l expense haly l id l match m3 l expense da)
const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  }
}

export default connect(mapStateToProps)(EditExpensePage);
