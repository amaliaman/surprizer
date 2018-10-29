import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
import ReactQuill from 'react-quill';
import '../../../node_modules/react-quill/dist/quill.snow.css';
import Parser from 'html-react-parser';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';

@inject(stores => ({
    updateGreeting: stores.store.updateGreeting,
    deleteGreeting: stores.store.deleteGreeting,
    currentUser: stores.store.currentUser
}))
@observer
class Greeting extends Component {
    @observable text = '';
    @observable isEditMode = false;
    @observable isPrivate = false;

    @action componentDidMount = () => {
        this.text = this.props.greeting.text;
        this.isPrivate = this.props.greeting.isPrivate;
    };

    @action handleChange = e => {
        this[e.target.name] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    };

    @action handleChangeQuill = e => {
        this.text = e;
    };

    @action handleCancel = () => {
        this.toggleEdit();
        this.text = this.props.greeting.text;
    };

    @action handleSaveText = () => {
        this.props.updateGreeting(this.props.greeting.id, { text: this.text, isPrivate: this.isPrivate });
        this.toggleEdit();
    };

    @action handleDelete = () => {
        this.props.deleteGreeting(this.props.greeting.id);
    };

    @action toggleEdit = () => {
        this.isEditMode = !this.isEditMode;
    };

    quillModules = {
        toolbar: [
            [{ 'font': [] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'direction': 'rtl' }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['clean']
        ],
    }

    render() {
        const { greeting, currentUser } = this.props;

        return (
            <div className='greeting-wrapper'>
                <div className='left'>
                    {this.isEditMode ?
                        <div>
                            <ReactQuill
                                theme='snow'
                                value={this.text}
                                onChange={this.handleChangeQuill}
                                modules={this.quillModules}
                            />
                            <label>Private:</label>
                            <input
                                name='isPrivate'
                                type='checkbox'
                                checked={this.isPrivate}
                                onChange={this.handleChange}
                            />
                            {greeting.user.id === currentUser.id &&
                                <div className='buttons'>
                                    <span onClick={this.handleSaveText} title='Save'><FontAwesomeIcon icon={faSave} /></span>
                                    <span onClick={this.handleCancel} title='Cancel'><FontAwesomeIcon icon={faTimes} /></span>
                                </div>
                            }
                        </div>
                        :
                        <div className='readonly'>
                            {Parser(greeting.text)}
                            {greeting.user && greeting.user.id === currentUser.id &&
                                <div className='buttons'>
                                    <span onClick={this.toggleEdit} title='Edit'><FontAwesomeIcon icon={faEdit} /></span>
                                    <span onClick={this.handleDelete} title='Delete'><FontAwesomeIcon icon={faTrash} /></span>
                                </div>
                            }
                        </div>
                    }

                </div>
                <div className='right'>
                    <div>{greeting.user ? greeting.user.name : this.props.currentUser.name}, {moment(greeting.createdAt).format('L HH:mm')}</div>
                </div>
            </div>
        );
    }
}

export default Greeting;