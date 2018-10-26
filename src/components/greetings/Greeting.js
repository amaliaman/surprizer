import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';

@inject(stores => ({
    updateGreeting: stores.store.updateGreeting,
    deleteGreeting: stores.store.deleteGreeting,
}))
@observer
class Greeting extends Component {
    @observable text = '';
    @observable isEditMode = false;

    @action componentDidMount = () => {
        this.text = this.props.greeting.text;
    };

    @action handleChange = e => {
        this[e.target.name] = e.target.value;
    };

    @action handleCancel = () => {
        this.toggleEdit();
        this.text = this.props.greeting.text;
    };

    @action handleSaveText = () => {
        this.props.updateGreeting(this.props.greeting.id, { text: this.text });
        this.toggleEdit();
    };

    @action handleDelete = () => {
        this.props.deleteGreeting(this.props.greeting.id);
    };

    @action toggleEdit = () => {
        this.isEditMode = !this.isEditMode;
    };

    render() {
        const { greeting } = this.props;

        return (
            <div className='greeting-wrapper'>
                <div className='left'>
                    {this.isEditMode ?
                        <div>
                            <textarea value={this.text} name='text' onChange={this.handleChange} rows={4} />
                            <div className='buttons'>
                                <span onClick={this.handleSaveText} title='Save'><FontAwesomeIcon icon={faSave} /></span>
                                <span onClick={this.handleCancel} title='Cancel'><FontAwesomeIcon icon={faTimes} /></span>
                            </div>
                        </div>
                        :
                        <div>
                            {greeting.text}
                            <div className='buttons'>
                                <span onClick={this.toggleEdit} title='Edit'><FontAwesomeIcon icon={faEdit} /></span>
                                <span onClick={this.handleDelete} title='Delete'><FontAwesomeIcon icon={faTrash} /></span>
                            </div>
                        </div>
                    }

                </div>
                <div className='right'>
                    <div>{greeting.user.name}</div>
                </div>
            </div>
        );
    }
}

export default Greeting;