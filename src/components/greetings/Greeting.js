import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
import ReactQuill from 'react-quill';
import '../../../node_modules/react-quill/dist/quill.snow.css';
import Parser from 'html-react-parser';
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

    @action handleChangeQuill = e => {
        this.text = e;
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

    quillModules = {
        toolbar: [
            [{ 'font': [] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'direction': 'rtl' }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['clean']
        ],
    }

    render() {
        const { greeting } = this.props;

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
                            <div className='buttons'>
                                <span onClick={this.handleSaveText} title='Save'><FontAwesomeIcon icon={faSave} /></span>
                                <span onClick={this.handleCancel} title='Cancel'><FontAwesomeIcon icon={faTimes} /></span>
                            </div>
                        </div>
                        :
                        <div className='readonly'>
                            {Parser(greeting.text)}
                            <div className='buttons'>
                                <span onClick={this.toggleEdit} title='Edit'><FontAwesomeIcon icon={faEdit} /></span>
                                <span onClick={this.handleDelete} title='Delete'><FontAwesomeIcon icon={faTrash} /></span>
                            </div>
                        </div>
                    }

                </div>
                <div className='right'>
                    <div>{greeting.user && greeting.user.name}</div>
                </div>
            </div>
        );
    }
}

export default Greeting;