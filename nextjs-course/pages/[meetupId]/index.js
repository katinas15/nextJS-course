import {MongoClient, ObjectId} from 'mongodb'
import { Fragment } from "react";

function MeetupDetails(props) {
  return (
    <Fragment>
      <img src=""></img>
      <h1>{props.meetupData.title}</h1>
      <h1>{props.meetupData.image}</h1>
      <h1>{props.meetupData.address}</h1>
      <h1>{props.meetupData.description}</h1>
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(process.env.MONGO_MAIN)
  const db = client.db()
  const meetupsCollection = db.collection('meetups')
  const meetups = await meetupsCollection.find({}, {_id: 1}).toArray()
  client.close()

  return {
    fallback: false,
    paths: meetups.map(meetup => ({params: {meetupId: meetup._id.toString()}}))
  }
}

export async function getStaticProps(context){
  const meetupId = context.params.meetupId
  const client = await MongoClient.connect(process.env.MONGO_MAIN)
  const db = client.db()
  const meetupsCollection = db.collection('meetups')
  const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)})
  client.close()
  console.log(selectedMeetup)

  console.log(meetupId)
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.data.title,
        image: selectedMeetup.data.image,
        address: selectedMeetup.data.title,
        description: selectedMeetup.data.description

      }
    }
  }
  
}

export default MeetupDetails;
