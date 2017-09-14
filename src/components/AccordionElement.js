import React, { Component } from 'react';
import '../styles/AccordionElement.css'

/**
 * Define component - AccordionElement
 */
class AccordionElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            className: ''
        };
    }

    /**
     * Handler - accordion onclick
     */
    toggleExpand = () => {
        this.setState({
            active: !this.state.active,
            className: "active"
        });
    };

    render() {
        let active = this.state.active ? "active" : null;
        return (
            <div className={active} onClick={this.toggleExpand}>
                <div className="section-heading-button">{this.props.label}</div>
                <div className="section-content">{this.props.body}</div>
            </div>
        )
    }
}

export default AccordionElement;