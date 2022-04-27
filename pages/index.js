import Head from 'next/head'
import useSWR from 'swr'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Search from '../components/Search'
import Today from '../components/Today'

const fetcher = async url => {
  const res = await fetch(url)

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    // Attach extra info to the error object.
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return res.json()
}


export default function Home() {

  const router = useRouter()

  const [zip, setZip] = useState(64111)

  useEffect(() => {
    if (router.isReady && router.query.zip) {
      setZip(router.query.zip)
    }
  }, [router.isReady, router.query])


  const key = process.env.NEXT_PUBLIC_WEATHER

  const geourl = 
    `http://api.openweathermap.org/geo/1.0/zip`
    + `?zip=${zip},US`
    + `&appid=${key}`;

  const { data: location, error } = useSWR(geourl, fetcher, {
    shouldRetryOnError: false
  })
  
  const { data: weather } = useSWR(() => (
    `https://api.openweathermap.org/data/2.5/onecall`
    + `?exclude=minutely,hourly,alerts`
    + `&units=imperial`
    + `&lat=` + location.lat
    + `&lon=` + location.lon
    + `&appid=${key}`
  ), fetcher)

  function main() {
    if (error) return (
      <div className="border p-5 my-5">❌&nbsp; Zip code not found</div>
    )
    if (!weather) return (
      <div className="border p-5 my-5">🎡&nbsp; Loading</div>
    )

    return (
      <>
      <h1 className="text-xl font-bold mt-6" >{ location.name }</h1>
      <Today
      day="Today"
      temp={weather.current.feels_like}
      main={weather.current.weather[0].main}
      desc={weather.current.weather[0].description}
      wind={weather.current.wind_speed}
      />
      <Today
      day="Tomorrow"
      temp={weather.daily[0].feels_like.day}
      main={weather.daily[0].weather[0].main}
      desc={weather.daily[0].weather[0].description}
      wind={weather.daily[0].wind_speed}
      />
      <Today
      day="Next Day"
      temp={weather.daily[1].feels_like.day}
      main={weather.daily[1].weather[0].main}
      desc={weather.daily[1].weather[0].description}
      wind={weather.daily[1].wind_speed}
      />
      </>
    )
  }

  return (
    <main className="w-[600px] my-6 m-auto">
    <Head><title>Sunp</title></Head>
    <Search

    handleSubmit={(z) => {
      router.push({
        pathname: "/",
        query: { zip: z},
      })
    }} />
    { main() }
    </main>
  )
}
