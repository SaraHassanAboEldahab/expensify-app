import React from 'react';
import {Link} from 'react-router-dom';

//here we don't use function because we don't need to access data from redux store , we only need to use dispatch 
const ExpenseListItem=({id,description,amount,createdAt,note})=>(
    <div>
      <Link to={`/edit/${id}`}>
      <h3>{description}</h3> 
      </Link>
       <p>{amount}___{createdAt}</p>
            {note && <h6>{note}</h6>}
      
      
    </div>
)


export default ExpenseListItem;