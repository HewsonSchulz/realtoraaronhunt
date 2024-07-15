import { useState } from 'react'
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import { updateStateObj } from '../helper'
import './ContactForm.css'

export const ContactForm = ({ loggedInUser }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [isInvalid, setIsInvalid] = useState({ name: false, email: false })
  const [message, setMessage] = useState({ name: '', email: '' })

  const resetValidity = () => {
    setIsInvalid({ name: false, email: false })
    setMessage({ name: '', email: '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    //! logInUser({ email, password }).then((userData) => {
    //!   if (userData.valid) {
    //!     const { valid, ...newUser } = userData
    //!     localStorage.setItem('cqc_user', JSON.stringify(newUser))

    //!     const { token, ...loggedInUser } = newUser
    //!     setLoggedInUser(loggedInUser)
    //!     navigate('/') //?
    //!   } else {
    //!     resetValidity()

    //!     switch (userData.message) {
    //!       case 'Missing properties: email, password':
    //!         updateStateObj(setMessage, 'email', 'Please enter an email')
    //!         updateStateObj(setIsInvalid, 'email', true)
    //!         updateStateObj(setMessage, 'password', 'Please enter a password')
    //!         updateStateObj(setIsInvalid, 'password', true)
    //!         break
    //!       case 'Missing property: email':
    //!         updateStateObj(setMessage, 'email', 'Please enter an email')
    //!         updateStateObj(setIsInvalid, 'email', true)
    //!         break
    //!       case 'Missing property: password':
    //!         updateStateObj(setMessage, 'password', 'Please enter a password')
    //!         updateStateObj(setIsInvalid, 'password', true)
    //!         break
    //!       default:
    //!         updateStateObj(setMessage, 'password', userData.message)
    //!         updateStateObj(setIsInvalid, 'email', true)
    //!         updateStateObj(setIsInvalid, 'password', true)
    //!     }
    //!   }
    //! })
  }

  return (
    <Form className='contact-form'>
      <h1 className='contact-form__title'>Please submit your contact info below.</h1>
      <FormGroup id='contact-form__name'>
        <Label className='contact-form__input-label' for='name'>
          Full name:
        </Label>
        <Input
          id='name'
          className='contact-form__name-input'
          type='text'
          value={name}
          placeholder='John Doe'
          invalid={isInvalid.name}
          autoFocus
          onChange={(e) => {
            updateStateObj(setIsInvalid, 'name', false)
            setName(e.target.value)
          }}
        />
        <FormFeedback>{message.name}</FormFeedback>
      </FormGroup>

      <FormGroup id='contact-form__email'>
        <Label className='contact-form__input-label' for='email'>
          Email:
        </Label>
        <Input
          id='email'
          className='contact-form__email-input'
          type='email'
          value={email}
          placeholder='johndoe@example.com'
          invalid={isInvalid.email}
          onChange={(e) => {
            updateStateObj(setIsInvalid, 'email', false)
            setEmail(e.target.value.replace(/\s+/g, '').toLowerCase())
          }}
        />
        <FormFeedback>{message.email}</FormFeedback>
      </FormGroup>

      <Button color='primary' onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  )
}
