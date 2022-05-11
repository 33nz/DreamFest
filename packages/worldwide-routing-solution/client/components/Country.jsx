import React from 'react'
import { Link, useParams } from 'react-router-dom'

import countryData from '../../data/countries'

function Country() {
  const { code, name } = useParams()
  const country = countryData.find((country) => country.code === code)

  // This line prevents an error on countries with no neighbours, e.g. NZ and Aus
  let neighbours = country.neighbours ? country.neighbours.split(',') : []

  neighbours = neighbours.map((neighbour) =>
    countryData.find((country) => country.code === neighbour)
  )

  return (
    <div>
      <h2>
        {country.flag} {country.name}
      </h2>
      <p>
        <strong>Capital:</strong> {country.capital}
      </p>
      <p>
        <strong>Area:</strong> {country.areaSqKms} km²
      </p>
      <p>
        <strong>Population:</strong> {country.population}
      </p>
      <p>
        <strong>Currency:</strong> {country.currencyName} (
        {country.currencyCode})
      </p>
      <p>
        <strong>Neighbours:</strong>
      </p>
      <ul>
        {neighbours.map((neighbour) => (
          <li key={neighbour.code}>
            <Link to={`/continent/${name}/${neighbour.code}`}>
              {neighbour.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Country
