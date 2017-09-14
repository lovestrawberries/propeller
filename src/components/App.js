import React, { Component } from 'react';
import Accordion from "./Accordion";
import '../styles/AppContainer.css';

/**
 * Define component - AppContainer
 */
class AppContainer extends Component {

    render() {
        return (
            <div className="app-container">
                <Accordion />
            </div>
        );
    }
}

export default AppContainer;