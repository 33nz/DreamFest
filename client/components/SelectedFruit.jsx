import React, { useState, useEffect } from 'react'

import { GridForm, ColOne, ColTwo, Button } from './Styled'

import { updateFruit, deleteFruit } from '../api'
import { useSelector } from 'react-redux'

function SelectedFruit ({ selected, clearSelected, setError, setFruits }) {
  const user = useSelector(state => state)
  const [editing, setEditing] = useState(selected)

  function handleEditChange (e) {
    const { name, value } = e.target
    setEditing({
      ...editing,
      [name]: value
    })
  }

  function handleUpdate () {
    updateFruit(editing, user.auth0Id, user.token)
      .then(remoteFruits => setFruits(remoteFruits))
      .then(clearSelected)
      .then(() => setError(''))
      .catch(err => setError(err.message))
  }

  function handleDelete () {
    deleteFruit(editing.id, user.auth0Id, user.token)
      .then(setFruits)
      .then(clearSelected)
      .then(() => setError(''))
      .catch(err => setError(err.message))
  }

  useEffect(() => {
    setEditing(selected)
  }, [selected])

  const { name: editingName, calories: editingCalories } = editing

  return (
    <>
      <h2>Selected</h2>
      <GridForm>
        <ColOne>Name:</ColOne>
        <ColTwo type='text'
          name='name'
          aria-label='selected-name'
          data-testid='selected-name'
          value={editingName || ''}
          onChange={handleEditChange} />

        <ColOne>Calories:</ColOne>
        <ColTwo type='text'
          name='calories'
          aria-label='selected-calories'
          data-testid='selected-calories'
          value={editingCalories || ''}
          onChange={handleEditChange} />

        <Button type='button'
          data-testid='update-button'
          onClick={handleUpdate}>Update fruit</Button>
        <Button type='button'
          data-testid='delete-button'
          onClick={handleDelete}>Delete fruit</Button>
        <Button type='button'
          data-testid='clear-button'
          onClick={clearSelected}>Clear selection</Button>
      </GridForm>
    </>
  )
}

export default SelectedFruit
