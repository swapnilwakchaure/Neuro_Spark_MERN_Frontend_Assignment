import styled from "styled-components";

const UserCard = ({ data }) => {

    let { _id, name, date, email, contact } = data;

    date = Number(date.substring(0, 4));
    date = 2023 - date;

    return (
        <Main key={_id}>
            <div>{name}, {date} Y</div>
            <div>{email}</div>
        </Main>
    )
}

export default UserCard;



const Main = styled.div`
  text-align: start;
`