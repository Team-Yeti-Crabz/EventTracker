import React, { useEffect, useState } from 'react';
import '../styles.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function HomePage() {
  const location = useLocation();
  //allows you to navigate/manipulate the browser history
  // const { email } = location.state;
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const { email } = location.state;
        const response = await fetch(
          `/api/preferences?email=${encodeURIComponent(email)}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );
        const data = await response.json();
        console.log(data);
        // {
        // email
        // location: {city:, state:}
        // artists:[1,2,3]
        // genres: [a,b,c]
        // }
        setUserData(data);
      } catch {
        throw new Error('Error with initial fetch request!');
      }
    };
    fetchingData();
  }, [location]);

  return (
    <div className="homePage">
      <div className="home"> Made it to homepage!</div>
    </div>
  );
}
