import React from 'react'
import ChannelItem from './ChannelItem'
import "./Channels.css"
import { useEffect, useState } from 'react'
const Channels = () => {
  const [parsedData, setParsedData] = useState({});

  useEffect(() => {
    const storedData = localStorage.getItem('user-data');
    if (storedData) {
      setParsedData(JSON.parse(storedData));
    }
  }, [localStorage.getItem('user-data')]);

  const isLoggedIn = !!parsedData.email;
  console.log(parsedData.email)

  return (
    <div className='channels'>
      <p className='channels-heading'>Channels Here</p>
      {
        isLoggedIn ?
          <div className='channels-div'>
            <ChannelItem branch={"Beginner"} image={"https://cdn-icons-png.flaticon.com/512/2818/2818072.png"} description="Perfect for those who are new to the topic and want to start learning from scratch and starting to code." />
            <ChannelItem branch={"Expert"} image={"https://cdn-icons-png.flaticon.com/512/7991/7991055.png"} description="Advanced content tailored for experts in the field who are looking for in-depth discussions and insights." />
          </div>
          : <>Please Login to Continue</>
      }
    </div>
  )
}

export default Channels
