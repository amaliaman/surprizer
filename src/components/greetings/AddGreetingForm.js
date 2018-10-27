import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
import ReactQuill from 'react-quill';
import '../../../node_modules/react-quill/dist/quill.snow.css';

import CustomLoader from '../general/CustomLoader';

@inject(stores => ({
    createGreeting: stores.store.createGreeting,
    isLoading: stores.store.isLoading
}))
@observer
class AddGreetingForm extends Component {
    @observable text = '';
    @observable isPrivate = false;
    @observable typeId = 1;

    @action handleChange = e => {
        this[e.target.name] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    };

    @action handleChangeQuill = e => {
        this.text = e;
    };

    @action handleSubmit = e => {
        e.preventDefault();
        this.props.createGreeting(this.text, this.isPrivate, this.typeId);
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
        return (
            <div>
                <h2>Add Greeting</h2>
                <form className='form new-greeting-form' onSubmit={this.handleSubmit}>
                    <label>{this.typeId === 1 ? 'Greeting' : 'Title'}:</label>

                    {this.typeId === 1 ?
                        //  Rich text editor for text greetings }
                        (<ReactQuill
                            theme='snow'
                            value={this.text}
                            onChange={this.handleChangeQuill}
                            modules={this.quillModules}
                        />)
                        :
                        // Simple text input for file greetings }
                        (<input
                            name='text'
                            type='text'
                            placeholder='Greeting'
                            onChange={this.handleChange}
                            value={this.text}
                            required
                        />)
                    }

                    <label>Private:</label>
                    <input
                        name='isPrivate'
                        type='checkbox'
                        checked={this.isPrivate}
                        onChange={this.handleChange}
                    />

                    <CustomLoader isLoading={this.props.isLoading} height={40}>
                        <button type='submit'>Save</button>
                    </CustomLoader>
                </form>
            </div>
        );
    }
}

export default AddGreetingForm;