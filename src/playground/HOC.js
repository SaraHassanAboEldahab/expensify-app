import React from 'react';
import ReactDOM from 'react-dom';

const Info = () => (
    <div>
        <h1>Sara</h1>
        <p> ya raaaaaaaaaaaab</p>
    </div>
)

//higher order component
const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>this is very special</p>}
            <WrappedComponent {...props} />
        </div>
    )
}
const AdminInfo = withAdminWarning(Info) // this componenet which will access redux store

//ReactDOM.render(<AdminInfo isAdmin={false}  info="ay 7aga"/>, document.getElementById('app'));



//challenge
const MyInfo = (props) => (
    <div>
        <h1>Sara Aboeldahab</h1>
        {props.info} : <span>Web designer</span>
    </div>
)

const require = (Regular) => {
    return (props) => (
        <div>
            {props.isAdmin ? (<Regular {...props} />)
                : (<div>
                    <h3>sorry u must login to view the web</h3>
                </div>)}
        </div>
    )
}

const Auth = require(MyInfo);
ReactDOM.render(<Auth isAdmin={false} info="job" />, document.getElementById('app'));

