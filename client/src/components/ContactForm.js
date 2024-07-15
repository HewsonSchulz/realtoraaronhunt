import { useState } from 'react'
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import { updateStateObj } from '../helper'
import { submitContactInfo } from '../managers/userManager'
import './ContactForm.css'

export const ContactForm = ({ loggedInUser }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [isWithAgent, setIsWithAgent] = useState(null)
  const [agentName, setAgentName] = useState('')
  const [isInvalid, setIsInvalid] = useState({ name: false, email: false, phone_num: false, agent_name: false })
  const [message, setMessage] = useState({
    name: 'Please enter your name',
    email: 'Please enter your email',
    phoneNum: 'Please enter your phone number',
    agentName: 'Please enter the name of your current agent',
  })
  const [hasSubmit, setHasSubmit] = useState(false)

  const resetValidity = () => {
    setIsInvalid({ name: false, email: false, phone_num: false, agent_name: false })
    setMessage({
      name: 'Please enter your name',
      email: 'Please enter your email',
      phoneNum: 'Please enter your phone number',
      agentName: 'Please enter the name of your current agent',
    })
  }

  const stringToBoolean = (str) => {
    if (str === null) {
      return false
    }
    return str.toLowerCase() === 'true'
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setHasSubmit(true)

    const contactInfo = { name, email, phone_num: phoneNum }
    if (stringToBoolean(isWithAgent)) {
      contactInfo.agent_name = agentName
    }

    submitContactInfo(contactInfo).then((res) => {
      if (res.valid) {
        window.alert('Your contact information has been submitted. Thank you!')
        window.location.reload()
      } else {
        resetValidity()
        setIsInvalid(res.is_invalid)
        setHasSubmit(false)
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

      <Label className='contact-form__input-label'>Are you already working with an agent?</Label>
      <FormGroup check id='contact-form__agent-checkbox-yes'>
        <Label check>
          <Input
            type='radio'
            name='isWithAgent'
            value='true'
            checked={isWithAgent === 'true'}
            onChange={(e) => {
              setIsWithAgent(e.target.value)
              updateStateObj(setIsInvalid, 'agent_name', false)
            }}
          />
          Yes
        </Label>
      </FormGroup>
      <FormGroup check id='contact-form__agent-checkbox-no'>
        <Label check>
          <Input
            type='radio'
            name='isWithAgent'
            value='false'
            checked={isWithAgent === 'false'}
            onChange={(e) => {
              setIsWithAgent(e.target.value)
              updateStateObj(setIsInvalid, 'agent_name', false)
            }}
          />
          No
        </Label>
      </FormGroup>

      {stringToBoolean(isWithAgent) && (
        <FormGroup id='contact-form__agent-name'>
          <Label className='contact-form__input-label' for='agent-name'>
            Agent name:
          </Label>
          <Input
            id='agent-name'
            className='contact-form__agent-name-input'
            type='text'
            value={agentName}
            placeholder='Joe Smith'
            invalid={isInvalid.agent_name}
            onChange={(e) => {
              updateStateObj(setIsInvalid, 'agent_name', false)
              setAgentName(e.target.value)
            }}
          />
          <FormFeedback>{message.agentName}</FormFeedback>
        </FormGroup>
      )}

      {hasSubmit ? (
        <Button color='primary' disabled>
          Submit
        </Button>
      ) : (
        <Button color='primary' onClick={handleSubmit}>
          Submit
        </Button>
      )}
    </Form>
  )
}
