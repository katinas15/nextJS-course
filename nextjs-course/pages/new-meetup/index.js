import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage() {
  function addMettupHandler(enteredMettupData) {
    console.log(enteredMettupData);
  }

  return <NewMeetupForm onAddMeetup={addMettupHandler} />;
}

export default NewMeetupPage;
