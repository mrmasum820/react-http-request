import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const UserForm = ({ btnText, handleFormData, selectedUser }) => {
    const [user, setUser] = useState({
        name: '',
        email: ''
    })

    //handle input
    const { name, email } = user;
    const handleChange = (e) => {
        const selectedField = e.target.name;
        const selectedValue = e.target.value;

        setUser(prevState => {
            return { ...prevState, [selectedField]: selectedValue }
        })
    }

    //handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        handleFormData(user);
        setUser({
            name: '',
            email: ''
        })
    }

    useEffect(() => {
        setUser({
            name: selectedUser.name,
            email: selectedUser.email
        })
    }, [selectedUser])

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" id="name" value={name} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" id="email" value={email} onChange={handleChange} required />
            </div>
            <button type='submit' className='btn'>{btnText}</button>
        </form>
    )
}

UserForm.defaultProps = {
    selectedUser: {
        name: '',
        email: ''
    }
}
