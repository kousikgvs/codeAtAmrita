import React from 'react'
import ChannelItem from './ChannelItem'
import "./Channels.css"
import { useEffect , useState } from 'react'
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
        <div className='channels-div'>
            <ChannelItem branch={"IT Branches"} image={"https://cdn-icons-png.flaticon.com/512/2818/2818072.png"} />
            <ChannelItem branch={"Non IT branches"} image={"https://cdn-icons-png.flaticon.com/512/7991/7991055.png"}/>
        </div>
    </div>
  )
}

export default Channels
