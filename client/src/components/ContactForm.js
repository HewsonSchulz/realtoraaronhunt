import { useState } from 'react'
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import { updateStateObj } from '../helper'
import { submitContactInfo } from '../managers/userManager'
import './ContactForm.css'

export const ContactForm = ({ loggedInUser }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [isInvalid, setIsInvalid] = useState({ name: false, email: false, phone_num: false })
  const [message, setMessage] = useState({
    name: 'Please enter your name',
    email: 'Please enter your email',
    phoneNum: 'Please enter your phone number',
  })

  const resetValidity = () => {
    setIsInvalid({ name: false, email: false, phone_num: false })
    setMessage({
      name: 'Please enter your name',
      email: 'Please enter your email',
      phoneNum: 'Please enter your phone number',
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    submitContactInfo({ name, email, phone_num: phoneNum }).then((res) => {
      if (res.valid) {
        //!
      } else {
        resetValidity()
        setIsInvalid(res.is_invalid)
      }
    })
  }

  return (
    <Form className='contact-form'>
      <h5 className='contact-form__title'>Please submit your contact information below.</h5>
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

      <FormGroup id='contact-form__phone-num'>
        <Label className='contact-form__input-label' for='phone-num'>
          Phone number:
        </Label>
        <Input
          id='phone-num'
          className='contact-form__phone-num-input'
          type='tel'
          value={phoneNum}
          placeholder='123-456-7890'
          invalid={isInvalid.phone_num}
          onChange={(e) => {
            updateStateObj(setIsInvalid, 'phone_num', false)
            setPhoneNum(e.target.value)
          }}
        />
        <FormFeedback>{message.phoneNum}</FormFeedback>
      </FormGroup>

      <Button color='primary' onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  )
}
