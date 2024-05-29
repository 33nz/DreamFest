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
  console.log(day)
  const events = await db('events')
    .join('locations', 'locations.id', 'events.location_id')
    .select(
      'events.id as id',
      'day',
      'time',
      'events.name as eventName',
      'events.description as description',
      'locations.name as locatonName',
    )
    .where({ day })
  return events as Event[]
}

export async function getLocationById(id: string) {
  const location = await db('locations').select().where({ id }).first()
  return location
}
