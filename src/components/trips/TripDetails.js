import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
// import { NavLink} from 'react-router-dom';
import { baseURL, imgDetails } from '../../Globals';
// import {useHistory} from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import { loadTrips } from '../../actions/trips';
import { Grid, Card, CardContent, Button } from '@mui/material'








const TripDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const [trip, setTrip] = useState({})
  const [loading, setLoading] = useState(true)
  // const trips = useSelector(state => state.trips)



  const loadTrip = async () => {
    const resp = await fetch(baseURL + `/api/v1/trips/${id}`, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `bearer ${localStorage.getItem('jwt')}`
      }
    })
    const data = await resp.json();
    setTrip(data)
    // console.log('trip from details', data)
  }



  const load = async () => {
    await loadTrip();
    // await loadUser();
    setLoading(false)
  }

  useEffect(() => {
    load();
  }, [id])

  console.log("trip from details", trip)
  console.log("journal", trip.journals)

  const handleClick = () => {
    const headers = {
      "Accept": 'application/json',
      "Content-Type": "application/json"
    }
    const body = { been_there: !trip.been_there }
    const options = {
      method: "PATCH",
      headers,
      body: JSON.stringify(body)
    }
    fetch(`${baseURL}/api/v1/trips/${id}`, options)
    history.push(`/journal`)
  }

  const handleJournal = () => {
    history.push(`/journal/new`)
    console.log(handleJournal)
  }



  // console.log("beenThere", trip.been_there)



  if (loading) { return <h2>Loading...</h2> }

  return (
    <div align="center">
      <Grid item>
          {/* <Card style={{ margin: "0 750px 0 750px" }} item> */}
          <Card sx={{maxWidth: 345}} style={{ marginTop: "12px" }} item>
        <CardContent >{trip.city}, {trip.country}
          <br />
          <img style={{...imgDetails}} src={trip.image_url} alt="travel pic" />
          <br />
          {/* <p style={{textDecoration: "underline"}}>Why do you want to go?</p> */}
          <p>{trip.reason}</p>
        </CardContent>
        {trip.been_there ? <Button onClick={handleJournal}>Add Journal</Button> : <Button onClick={handleClick}>Been There</Button>}
      </Card>
    </Grid>
    {trip.been_there ? "trip journal!" : null }
    </div >
  )
}

export default TripDetails
