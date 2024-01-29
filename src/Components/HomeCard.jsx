import React from 'react'
import "./Homecard.css"
const HomeCard = ({ imglink , topic , content}) => {
  return (
    <>
  <div class="nft">
    <div class='main'>
      <img class='tokenImage' src={imglink} alt="NFT" height={100} width={"100%"}/>
          <h2>{topic}</h2>
          <p class='description'>{content }</p>
      <hr />
      <div class='creator'>
        <div class='wrapper'>
          <img src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80" alt="Creator" />
        </div>
        <p><ins>Creation of</ins> codeAtAmrita</p>
      </div>
    </div>
  </div>
    </>
    )
}

export default HomeCard