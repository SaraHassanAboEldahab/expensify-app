import { createStore } from 'redux';

const store = createStore((state = { count: 1 }, action) => {
  

  switch (action.type) {
    case 'INC':
      const incBy= typeof action.incBy ==='number' ? action.incBy : 1;
      return {
        count: state.count+ incBy
      }
    case 'DEC':
      const decBy= typeof action.decBy ==='number' ? action.decBy : 1;
      return {
        count: state.count - decBy
      }
    case 'RES':
      return {
        count: 0
      }
      case'SET':
      return{
        count: action.count
      }
    default:
      return { state }

  }

});
store.subscribe(() => {
  console.log(store.getState());
});


store.dispatch({
  type: 'INC',
  incBy:5
})
store.dispatch({
  type: 'INC'
})
store.dispatch({
  type: 'RES'
})

store.dispatch({
  type: 'DEC',
  decBy:3
})
store.dispatch({
  type:'SET',
  count:25
})




// refactoring and organizing
const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy
});

const decrementCount = ({ decrementBy = 2 } = {}) => ({
  type: 'DECREMENT',
  decrementBy

});

const setBy=({s=1}={})=>({
  type:'SET',
  s
})
const resetBy=()=>({
  type:'RESET'
})
const store = createStore((state = { count: 1 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {count : state.count + action.incrementBy};

    case 'DECREMENT':
      return {count : state.count + action.decrementBy};

      case'SET' :
      return {
        count : action.s
      };

      case 'RESET':
        return{
          count : 0
        }

    default:
      return state.count;
  }


})
store.subscribe(() => {
  console.log(store.getState());
})
store.dispatch(incrementCount({ incrementBy: 5 }));
store.dispatch(decrementCount({ decrementBy: 10 }));
store.dispatch(setBy({s:80}));
store.dispatch(resetBy());




//working with multiple reducers
const expensesDefaultValue=[];
const expensesReducer=(state=expensesDefaultValue,action)=>{
  switch (action.type){
    default:
      return { state}
  }
}

const filterDefaultValue={
  text:' ',
  sortBy:'date',
  startDate: undefined,
  endDate:undefined
};
const filterReducer=( state=filterDefaultValue,action)=>{
  switch(action.type){
    default:
      return{state}
  }
}

const store=createStore(combineReducers({
  expenses:expensesReducer,
  filters:filterReducer
})
)
console.log(store.getState());


//ES6 spread operator in reducers
const addExpense=({discription='',note='',amount=0,createdAt=0}={})=>({
  type:'ADD',
  expenses:{
    id:uuid(),
    discription,
    note,
    amount,
    createdAt
  }
})

const removeExpense=({id}={})=>({
  type:'REMOVE',
  id

})

const expensesDefaultValue=[];
const expensesReducer=(state=expensesDefaultValue,action)=>{
  switch (action.type){
    case 'ADD':
      return [ 
        ...expensesDefaultValue,
        action.expenses ];
        case 'REMOVE':
          return state.filter(({id})=> id !== action.id)
    default:
      return { state}
  }
};

const filterDefaultValue={
  text:' ',
  sortBy:'date',
  startDate: undefined,
  endDate:undefined
};
const filterReducer=( state=filterDefaultValue,action)=>{
  switch(action.type){
    default:
      return{state}
  }
}

const store=createStore(combineReducers({
  expenses:expensesReducer,
  filters:filterReducer
})
)
store.subscribe(()=>{

  console.log(store.getState());
  })
const one = store.dispatch(addExpense({
  discription:'ay 7aga',
  note:'bardo ay 7aga',
  amount:30+'$',
  createdAt:10
}));
const two =store.dispatch(addExpense({
  discription:'ay 7aga',
  note:'mnmnmn',
  amount:620+'$',
  createdAt:170
}));

store.dispatch(removeExpense({id:one.id}))



//Filtering Redux Data  &&   Sorting Redux Data
const addExpense=({discription='',note='',amount=0,createdAt=0}={})=>({
  type:'ADD',
  expenses:{
    id:uuid(),
    discription,
    note,
    amount,
    createdAt
  }
})

const removeExpense=({id}={})=>({
  type:'REMOVE',
  id

})

const editExpense=(id,updates)=>({
 type:'EDIT',
 id,
 updates
})

const expensesDefaultValue=[];
const expensesReducer=(state=expensesDefaultValue,action)=>{
  switch (action.type){
    case 'ADD':
      return [ 
        ...expensesDefaultValue,
        action.expenses ];
        case 'REMOVE':
          return state.filter(({id})=> id !== action.id)

          case 'EDIT': 
          return state.map((expense)=>{
            if(expense.id===action.id){
                return {...expense, ...action.updates}
            }else{
              return expense;
            }
          })
    default:
      return { state}
  }
};


//filters

const setText=(text=' ')=>({
  type:'SETTEXT',
  text
})

const sortByDate=()=>({
  type:'SORTBYDATE'
})
const sortByAmount=()=>({
  type:'SORTBYAMOUNT'
})

const setStartDate=(start)=>({
  type:'SETSTARTDATE',
  start
})
const setEndDate=(end)=>({
  type:'SETENDDATE',
  end
})

const filterDefaultValue={
  text:' ',
  sortBy:'date',
  startDate: undefined,
  endDate:undefined
};
const filterReducer=( state=filterDefaultValue,action)=>{
  switch(action.type){
    case 'SETTEXT':
      return {...filterDefaultValue,text:action.text}

      case 'SORTBYDATE':
        return {...filterDefaultValue,sortBy:'date'}

        case 'SORTBYAMOUNT':
        return {...filterDefaultValue,sortBy:'amount'}

        case 'SETSTARTDATE' :
          return{...filterDefaultValue,startDate:action.start}

          case 'SETENDDATE' :
          return{...filterDefaultValue,endDate:action.end}
    default:
      return{state}
  }
}
//get visible expenses 
const getVisibleExpense=(expenses,{text,sortBy,startDate,endDate})=>{
  return expenses.filter((expense)=>{
      const startDateMatch= typeof startDate !== 'number' || expense.createdAt >= startDate;
      const endDateMatch= typeof endDate !== 'number' || expense.createdAt <= endDate;
      const textMatch = expense.discription.toLowerCase().includes(text.toLowerCase());
      return startDateMatch && endDateMatch && textMatch;

  }).sort((a,b)=>{
      if(sortBy==='date'){
        return a.createdAt < b.createdAt ? 1 : -1;
      }
      else if (sortBy==='amount'){
        return a.amount < b.amount ? 1 : -1;
      }
  })
};


const store=createStore(combineReducers({
  expenses:expensesReducer,
  filters:filterReducer
})
)
store.subscribe(()=>{
    const visibleState=store.getState();
    const visibleExpense=getVisibleExpense(visibleState.expenses,visibleState.filters);
  console.log(visibleExpense);
  })
const one = store.dispatch(addExpense({discription:'Rent',note:'bardo ay 7aga',amount:30+'$',createdAt:1000}));//1000 means 1sec after 1/1/1970
const two =store.dispatch(addExpense({discription:'ay 7aga',note:'mnmnmn',amount:620+'$',createdAt:-1000}));//-1000 means 1sec before 1/1/1970

//store.dispatch(removeExpense(one.expenses.id))

//store.dispatch(editExpense(two.expenses.id, {amount:500}));

//store.dispatch(setText('rent'));
//store.dispatch(setText());
//store.dispatch(sortByAmount());
//store.dispatch(sortByDate());
store.dispatch(setStartDate(2000));
//store.dispatch(setStartDate());
store.dispatch(setEndDate(999));
