import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../Styles/styles.css";
import styled from "styled-components";
import { CgClose } from "react-icons/cg";
import UserCard from "../Components/UserCard";
import { addToList, getList, postEvent } from "../Redux/AddList/action";
import { emailValidation, nameValidation, numberValidation } from "../Components/validation";


const CreateEvent = () => {

  // create event with title and participants array;

  const [title, setTitle] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  // add to list form handling values are here using hooks;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [date, setDate] = useState('');

  // get the lists of participants by using react-redux store;

  const { list, isLoading, isError } = useSelector((store) => store.ListReducer);
  const dispatch = useDispatch();



  // create event form starts from here;

  const handleCheckboxChange = (event, user) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedUsers([...selectedUsers, user]);
    } else {
      const updatedUsers = selectedUsers.filter((selectedUser) => selectedUser._id !== user._id);
      setSelectedUsers(updatedUsers);
    }
  };

  // submit the create event form;

  const handleEventForm = (e) => {
    e.preventDefault();

    if (title && selectedUsers.length > 0) {
      const payload = { title, selectedUsers };
      // console.log('payload: ', payload);
      dispatch(postEvent(payload))
        .then((
          dispatch(getList())
        ))

      setTitle('');
      setSelectedUsers([]);
      setTimeout( window.location.reload(), 3000);
      // window.location.reload();
    } else {
      alert('Enter required details or select the participants from the list or add');
    }
  }



  // add to list modal form starts from here;
  // using useEffect hook dispatch getList function and get data;

  useEffect(() => {
    dispatch(getList());
  }, []);

  // check input values are valid or invalid;

  const nameStrength = nameValidation(name);
  const emailStrength = emailValidation(email);
  const noStrength = numberValidation(contact);

  // get the values and submit add to list form and post the data;

  const handleAddToList = (e) => {
    e.preventDefault();

    if (nameStrength === 'valid' && emailStrength === 'valid' && noStrength === 'valid' && date) {
      const payload = { name, email, contact: Number(contact), date };
      // console.log('payload: ', payload);
      dispatch(addToList(payload))
        .then((
          dispatch(getList())
        ))

      setName('');
      setEmail('');
      setContact('');
      setDate('');
      window.location.reload();
    } else {
      alert('please enter valid details');
    }
  }

  // set modal using hooks;

  const [modal, setModal] = useState(false);

  // open modal form and close modal form
  const toggleModal = () => {
    setModal(!modal);
  }

  // modal conditions to active

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }



  return (
    <Main>
      <EventForm onSubmit={handleEventForm}>

        <Title
          type="text"
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title of the Event"
          required
          minLength="3"
        />

        <div>
          {isError ? <h2>something went wrong</h2> : <div></div>}
          {isLoading ? <h2>Loading...</h2> : <div></div>}
          {list?.length > 0 && list.map((user) => {
            return <Details key={user._id}>
              <UserCard
                data={user}
              />
              <CheckBox
                type="checkbox"
                onChange={(event) => handleCheckboxChange(event, user)}
                checked={selectedUsers.some((selectedUsers) => selectedUsers._id === user._id)}
              />
            </Details>
          })
          }
        </div>

        <ButtonBox>
          <Add
            onClick={toggleModal}
          >
            Add
          </Add>
          <Submit
            type="submit"
            value="Save"
          />
        </ButtonBox>

      </EventForm>

      {modal && <div className="modal">
        <div onClick={toggleModal} className="overlay"></div>

        <Form className="modal-content" onSubmit={handleAddToList}>

          <Close>
            <CgClose onClick={toggleModal} />
          </Close>

          <div className="inputBox">
            <input
              className="input"
              autoFocus
              type="text"
              minLength="3"
              maxLength="100"
              required="required"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span className="placeholder">Full Name</span>
            <Message>{nameStrength !== 'valid' && name.length > 1 && nameStrength}</Message>
          </div>

          <div className="inputBox">
            <DOB>Date of birth (between 2000 to 2022 year only)</DOB>
            <input
              className="input"
              type="date"
              min="2000-01-01"
              max="2022-12-31"
              required="required"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="inputBox">
            <input
              className="input"
              type="email"
              required="required"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="placeholder">Email</span>
            <Message>{emailStrength !== 'valid' && email.length > 2 && emailStrength}</Message>
          </div>

          <div className="inputBox">
            <input
              className="input"
              type="text"
              required="required"
              minLength="10"
              maxLength="10"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            <span className="placeholder">Contact</span>
            <Message>{noStrength !== 'valid' && contact.length > 1 && noStrength}</Message>
          </div>

          <Button type="submit">Add To List</Button>
        </Form>
      </div>
      }

    </Main>
  )
}

export default CreateEvent;




// styling starts from here

const Main = styled.div`
  width: 90%;
  max-width: 410px;
  margin: 30px auto;
`

const EventForm = styled.form``


const Title = styled.input`
  width: 100%;
  text-align: center;
  padding: 5px 0px;
  border: 2px solid;
  border-radius: 20px;
  font-size: 20px;
  font-weight: 500;
  color: #0091EA;
  letter-spacing: 1.5px;
`


const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5px;
`


const CheckBox = styled.input`
  cursor: pointer;
`


const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`


const Button = styled.button`
  width: 90%;
  margin: 5px;
  padding: 5px;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid;
  border-radius: 10px;
  background: none;
  cursor: pointer;
  
  &: hover {
    background: #80D8FF;
    color: #fff;
    transition: 0.3s;
  }
`

const Add = styled.p`
  border: 1px solid;
  width: 100%;
  padding: 5px;
  border-radius: 10px;
  background: #80D8FF;
  color: white;
  font-size: 16px;
  font-weigth: 600;

  &: hover {
    border-radius: 20px;
    cursor: pointer;
    background: #00B0FF;
    transition: 0.3s;
  }
`

const Submit = styled.input`
  border: 1px solid;
  width: 100%;
  padding: 8px;
  background: #B2DFDB;
  border-radius: 10px;
  color: white;
  font-size: 16px;
  font-weigth: 600;

  &: hover {
    border-radius: 20px;
    cursor: pointer;
    background: #00897B;
    transition: 0.3s;
  }
`










// modal form or add to list form styling here

const Form = styled.form`
  width: 90%;
  max-width: 410px;
  margin: auto;
  padding: 5px 5px 15px 5px;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #f1f1f1;
`

const Close = styled.div`
  position: absolute;
  right: 1.5%;
  top: 0.5%;
  border: 1px solid;
  border-radius: 10px;
  margin: 2px;
  padding: 2px;
  cursor: pointer;

  &: hover {
    background: black;
    color: white;
  }
`

const DOB = styled.p`
  text-align: start;
  margin: 0px 0px 4px 0px;
  font-size: 14px;
  color: #0672cb;
  font-weight: 300;
`


const Message = styled.p`
  text-align: start;
  margin: 5px;
  font-size: 14px;
  font-style: Italic;
  font-weight: 300;
  color: red;
`
