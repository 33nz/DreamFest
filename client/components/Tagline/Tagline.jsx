import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'

import Button from '../Button/Button'
import ButtonGroup from '../Button/ButtonGroup'

const Tagline = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const history = useHistory()

  const login = () => {
    history.push('/signIn')
  }

  const register = () => {
    history.push('/register')
  }

  return (
    <div className={`tagline${loaded && ' tagline--loaded'}`}>
      <div role='banner' className='tagline__text-wrapper'>
        <p className='tagline__text'>collate.</p>
        <p className='tagline__text'>recommend.</p>
        <p className='tagline__text'>discover.</p>
      </div>
      <ButtonGroup>
        <Button clickFunction={login} buttonText='Log in' />
        <Button clickFunction={register} style='secondary' buttonText='Register' />
      </ButtonGroup>
    </div>
  )
}

export default Tagline
