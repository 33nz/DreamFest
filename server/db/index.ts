import knexFile from './knexfile.js'
import knex from 'knex'
import type { Location, LocationData } from '../../models/Location.ts'
import type { Event, EventWithLocation, EventData } from '../../models/Event.ts'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]
export const connection = knex(config)
const db = connection

export async function getAllLocations() {
  const locations = await db('locations').select()
  return locations as Location[]
}

export async function getEventsByDay(day: string) {
  const events = await db('events')
    .join('locations', 'locations.id', 'events.location_id')
    .select(
      'events.id as id',
      'day',
      'time',
      'events.name as eventName',
      'events.description as description',
      'locations.name as locationName',
    )
    .where({ day })
  return events as Event[]
}

export async function getLocationById(id: number) {
  const location = await db('locations').select().where({ id }).first()
  return location as Location
}

export async function updateLocation(
  id: number,
  name: string,
  description: string,
) {
  const newLocation = await db('locations')
    .where({ id })
    .update({ name, description })
  return newLocation
}

export async function addNewEvent({
  locationId,
  day,
  time,
  name,
  description,
}: EventData) {
  const newEvent = await db('events').insert({
    location_id: locationId,
    day,
    time,
    name,
    description,
  })
  console.log(newEvent)
  return newEvent[0]
}

export async function deleteEvent(id: number) {
  const event = await db('events').where({ id }).del()
  return event
}
