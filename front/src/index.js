import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import UserStore from "./store/UserStore";
import DrivingSchoolStore from "./store/DrivingSchoolStore";

export const Context = createContext(null);

ReactDOM.render(
    <Context.Provider value={
        {
            user: new UserStore(),
            drivingschool: new DrivingSchoolStore(),
        }
    }>
        <App/>
    </Context.Provider>,
    document.getElementById('root')
);
