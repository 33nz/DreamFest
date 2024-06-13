// @vitest-environment jsdom
import { setupApp } from './setup.tsx'
import { beforeAll, describe, it, expect } from 'vitest'
import nock from 'nock'
import userEvent from '@testing-library/user-event'

beforeAll(() => {
  nock.disableNetConnect()
})

const mockEvent = {
  id: 1,
  day: 'saturday',
  time: '2pm - 3pm',
  name: 'Sandwhich Eating Contest',
  locationId: 1,
  description:
    'This event will be taking place at the TangleStage. Make sure you eat lunch before watching this amazing display!',
}

describe('delteting event with click', () => {
  it('deletes the event', async () => {
    const id = 1

    const scope = nock('http://localhost')
      .get(`/api/v1/events/${id}`)
      .reply(200, mockEvent)

    const deleteScope = nock('http://localhost')
      .delete(`/api/v1/events/${id}`)
      .reply(200)

    const screen = setupApp(`/events/${id}/edit`)
    const deleteClicked = await screen.findByTestId('event-deleted')
    await userEvent.click(deleteClicked)

    expect(scope.isDone()).toBe(true)
    expect(deleteScope.isDone()).toBe(true)
  })
})
