import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Posts from './components/Posts';
import Footer from './components/Footer';
import Login from './components/Login';

function App() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(localStorage.getItem('_username'));
  }, []);

  if (username && username != "") {
    return (
      <>
        <Navbar username={username} />
        <Posts />
        <Footer />
      </>
    )
  }

  return (
    <>
      <Login />
      <Footer />
    </>
  )
}

export default App
