import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteEvent, getEvent } from "../Redux/AddList/action";

const Home = () => {

  // to navigate another page
  const navigate = useNavigate();

  // get the data from redux store by using react-redux hooks
  const { eventlist, isLoading, isError } = useSelector((store) => store.ListReducer);
  const dispatch = useDispatch();

  // handles API calls or function
  useEffect(() => {
    dispatch(getEvent());
  }, []);

  // hooks to show or hide the event details
  const [showEventDetails, setShowEventDetails] = useState(new Array(eventlist.length).fill(false));

  // to show or hide the event details function
  const handleEventDetails = (index) => {
    const newShowEventDetails = [...showEventDetails];
    newShowEventDetails[index] = !newShowEventDetails[index];
    setShowEventDetails(newShowEventDetails);
  };

  // to delete the particular event by providing an id to function
  const handleDeleteEvent = (id) => {
    dispatch(deleteEvent(id))
      .then(dispatch(getEvent()))
    
    window.location.reload();
  }


  return (
    <Main>
      <Navbar>
        <Header>Events</Header>
        <Button onClick={() => navigate('/create')}>Create Event</Button>
      </Navbar>


      <div>

        {isLoading ? <h2>Loading...</h2> : <div></div>}
        {isError ? <h2>something went wrong</h2> : <div></div>}

        {eventlist.length > 0 && eventlist.map((el, index) => {
          return <SingleEvent key={el._id}>
            <EventNavbar>
              <div>
                <Title onClick={() => handleEventDetails(index)}>{el.title} Event</Title>
                <Invited>{el.selectedUsers.length} Participants Invited</Invited>
              </div>
              <Delete onClick={() => handleDeleteEvent(el._id)}>Delete</Delete>
            </EventNavbar>

            {showEventDetails[index] && <div>
              {el.selectedUsers.length > 0 && el.selectedUsers.map((users) => {
                return <ShowDetails key={users._id}>
                  <p>{users.name}</p>
                  {/* <p>{users.date}</p> */}
                  <Email>{users.email}</Email>
                  <p>{users.contact}</p>
                </ShowDetails>
              })}
            </div>}

          </SingleEvent>
        })}

      </div>
    </Main>
  )
}

export default Home;





// styling starts from here

const Main = styled.div``


const Navbar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Header = styled.h1`
  color: #0091EA;
`

const Button = styled.button`
  padding: 10px;
  width: fit-content;
  background: none;
  border: 1px solid #0091EA;
  color: #0091EA;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;

  &: hover {
    background: #A7FFEB;
    transition: 0.3s;
  }
`




const SingleEvent = styled.div`
  border: 2px solid #0091EA;
  width: 85%;
  max-width: 450px;
  margin: 10px auto;
  padding: 0px 10px;
  border-radius: 10px;

  &: hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`

const EventNavbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.p`
  cursor: pointer;
  text-align: start;
  font-size: 16px;
  font-weight: 600;

  &: hover {
    text-decoration: underline;
  }
`

const Invited = styled.p`
  text-align: start;
`

const Delete = styled.button`
  color: #B71C1C;
  background: none;
  border: 1px solid;
  padding: 5px 10px;
  border-radius: 5px;

  &: hover {
    background: #B71C1C;
    color: white;
    cursor: pointer;
    transition: 0.3s;
    border: none;
  }
`



const ShowDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Email = styled.p`
  display: block;

  @media (max-width: 480px) {
    display: none;
  }
`