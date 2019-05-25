import React, {Component} from 'react';

import './assets/css/base.css';

import Home from 'views/Home/Home';
import Nav from 'components/Nav/Nav';
import getRouter from 'router/router';

export default class App extends Component {
    render() {
        return (
            <div>
                {/*<Home/>*/}
                {getRouter()}
                <Nav/>
            </div>
        )
    }
}