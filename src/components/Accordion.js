import React, { Component } from 'react';
import client from "../http/PropellerApiClient";
import AccordionElement from "./AccordionElement";
import {List} from "material-ui";

/**
 * Define component - Accordion
 */
class Accordion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }

    componentDidMount(){
        client.getAccordionContent((res) => {
            this.setState({
                accordionContent: res.data
            });
        }, (error) => {
            alert(error);
        });
    }

    render() {
        if (this.state.accordionContent !== null && this.state.accordionContent !== undefined) {
            return (
                <List>
                    {this.state.accordionContent.blocks.map(accordionElement => {
                        return (<AccordionElement label={accordionElement.heading} body={accordionElement.content}/>);
                    })}
                </List>
            );
        } else {
            return null
        }
    }
}

export default Accordion;