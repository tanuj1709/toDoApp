import React from 'react';
import './App.css';
import ListItems from "./ListItems";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import Container from 'react-bootstrap/Container'

library.add(faTrash);
library.add(faPlusCircle);
library.add(faPlusSquare);

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            currentItem: {
                text: '',
                key: ''
            }
        };
        this.handleInput = this.handleInput.bind(this);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.setUpdate = this.setUpdate.bind(this);
    }

    handleInput(event) {
        this.setState({
            currentItem: {
                text: event.target.value,
                key: Date.now()
            }
        })
    }

    deleteItem(key) {
        const filteredItems = this.state.items.filter(item => item.key !== key);
        this.setState({items: filteredItems})
    }

    setUpdate(text, key) {
        const items = this.state.items;
        items.map(item => {
            if (item.key === key) {
                item.text = text;
            }
        });
        this.setState({
            items: items

        })
    }

    addItem(event) {
        event.preventDefault();
        const newItem = this.state.currentItem;
        if (newItem.text !== '') {
            const newItems = [...this.state.items, newItem];
            this.setState({
                items: newItems,
                currentItem: {
                    text: '',
                    key: ''
                }
            })
        }
    }

    render() {
        return (
            <Container>
                <div className="app">
                    <div className="heading">
                        <h1>To-Do List</h1>
                    </div>
                    <form id="to-do-form" onSubmit={this.addItem}>
                        <input type="text" placeholder="Enter your text" value={this.state.currentItem.text}
                               onChange={this.handleInput}/>
                        <button type="submit"><FontAwesomeIcon className="faicons" icon={faPlusSquare}/></button>
                    </form>
                    <ListItems items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate}/>
                </div>
            </Container>
        )
    }
}

export default App;
