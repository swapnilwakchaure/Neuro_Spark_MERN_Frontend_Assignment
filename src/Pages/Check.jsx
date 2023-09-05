import React, { useState } from 'react';

const Check = () => {
    // Create an array to track the show/hide state of each event

    const userEvent = [
        {
            'id': 1,
            'title': 'Birthday Celebration',
            'user': [
                {
                    'id': 1,
                    'name': 'Swapnil Wakchaure',
                    'email': 'sw.wakchaure@gmail.com'
                },
                {
                    'id': 2,
                    'name': 'Mangesh Wakchaure',
                    'email': 'mw.wakchaure@gmail.com'
                }
            ]
        },
        {
            'id': 2,
            'title': 'Space Craft Launch',
            'user': [
                {
                    'id': 1,
                    'name': 'C.V.Raman',
                    'email': 'c.v.raman@gmail.com'
                }
            ]
        }
    ]

    const [showEventDetails, setShowEventDetails] = useState(new Array(userEvent.length).fill(false));

    // Function to toggle the show/hide state of an event
    const toggleEventDetails = (index) => {
        const newShowEventDetails = [...showEventDetails];
        newShowEventDetails[index] = !newShowEventDetails[index];
        setShowEventDetails(newShowEventDetails);
    };

    return (
        <div>
            {userEvent.length > 0 && userEvent.map((el, index) => (
                <div key={el.id}>
                    <p onClick={() => toggleEventDetails(index)}>{el.title} Event</p>
                    <p>{el.user.length} Participants Invited</p>

                    {showEventDetails[index] && (
                        <div>
                            {el.user.length > 0 && el.user.map((users) => (
                                <div key={users.id}>
                                    <p>{users.name}</p>
                                    <p>{users.email}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}


export default Check;