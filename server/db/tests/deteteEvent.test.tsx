import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import { connection } from '../index.ts'
import request from 'supertest'
import server from '../../server.ts'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})

describe('deleteEvent testing', () => {
  it('returns successful delete event status code', async () => {
    const event = 1

    const deleteEvent = await request(server).delete(`/api/v1/events/${event}`)

    expect(deleteEvent.status).toStrictEqual(201)
  })

  it('proves deleted event from day schedule with count', async () => {
    const response = await request(server).get('/api/v1/schedule/friday')
    const { events } = response.body
    const eventToDelete = events[1]
    const firstEventCount = events.length

    await request(server).delete(`/api/v1/events/${eventToDelete.id}`)

    const updatedResponse = await request(server).get('/api/v1/schedule/friday')
    const updatedEvents = updatedResponse.body.events

    expect(updatedEvents.length).toBeLessThan(firstEventCount)
  })
})
