import React from "react";
import "./Cards.css";
import CardItem from "./CardItem";
import MasterCard from "./MasterCard";
import Footer from "../Components/Footer";
import { ChakraProvider } from "@chakra-ui/react";
import HomeCard from "./HomeCard"
function Cards() {
  return (
    <>
      <div className="cards">
        <div className="cards__container">
          <h1 className="aboutclub">About our club</h1>
          <p className="description-content">
            Code @ Amrita, Amrita Vishwa Vidyapeetham, Amritapuri is an official
            SIG of ACM. We at club aim to provide a platform for students to
            learn and grow their competitive programming skills. We believe that
            the best way to learn is by doing. Students in club are encouraged
            to participate in various events and competitions and enhance their
            skills. Main objective of club is to make students excel in data
            structures and algorithms. So that they can be a part of the next
            generation of programmers. We believe every student can do efficient
            programming with some help of the club. The club is a group of
            people who enjoy coding and help each other to learn. Our main
            motive is to make next generation programmers who solves real time
            problems around the world in efficient manner.
            <br></br>
            <br></br>
            Club is under the guidance of Dr. Swaminathan J, who is the head of
            the club.
            <br></br>
            <br></br>
          </p>
          <MasterCard />
          <h1 className="aboutclub">What You'll Learn</h1>
          <div className="cards_list">
            <HomeCard imglink={"https://img.freepik.com/free-vector/data-concept-illustration-idea-collecting-analysing-using_613284-1574.jpg?w=826&t=st=1703806393~exp=1703806993~hmac=36f0ed4f3e721d146a27d1fbb61d52892d3db6fe53859c43c1a738aee69bd257"} topic={"Data Structures"} content={"Smart Data Structures and Dumb code works a lot better than the Other way around"} />
            <HomeCard imglink={"https://img.freepik.com/free-vector/programmer-concept-illustration_114360-2284.jpg?w=826&t=st=1703806555~exp=1703807155~hmac=6613f2278dda91c779dfd835c143d1054038fea9566142f97441f627a029b98d"} topic={"Algorithms"} content={"An Algorithm is Like a recipe for a Computer to Follow. Learn Good recipe"} />
            <HomeCard imglink={"https://img.freepik.com/free-vector/busy-businessmen-with-laptops-near-hourglass-working-different-time-zones-time-zones-international-time-world-business-time-concept-illustration_335657-2073.jpg?t=st=1703806643~exp=1703807243~hmac=e632b2c1d6d7da5456671a68bc37ccb24ee8639a167f87acdd22fedb1414b5f1"} topic={"Time Complexity"} content={"Talk is Cheap Show me the Code"} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Cards;
