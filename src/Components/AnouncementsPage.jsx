import React, { useEffect, useState } from "react";
import "./Anouncements.css";
import AnouncementPost from "./AnouncementPost";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { styled } from '@mui/system';

const CustomStack = styled(Stack)(({ theme }) => ({
  width: '25%',

  [theme.breakpoints.down('sm')]: {
    width: '100%', 
  },
}));

const AnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [parsedData, setParsedData] = useState({});

  useEffect(() => {
    const storedData = localStorage.getItem("user-data");
    if (storedData) {
      setParsedData(JSON.parse(storedData));
    }

    const fetchData = async () => {
      try {
        const colRef = collection(db, "announcements");
        const querySnapshot = await getDocs(colRef);
        const data = [];

        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });

        setAnnouncements(data);
        setLoading(false);
      } catch (error) {
        console.error("Error getting documents: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [parsedData.email]);

// This is a Basic Template where I need to Create Data Like this
// Ignore This
// const announcementstemp = [
//   {
//     id: 1,
//     comments: [
//       { userid: "user1", description: "This is comment 1" },
//       { userid: "user2", description: "Another comment" },
//     ],
//     createdAt: new Date("2023-12-26T13:35:08.000Z"), // Replace this with your date field
//     description: "This is a post description",
//     image: "https://example.com/image.jpg",
//     likescount: 5,
//     name: "Admin",
//     usersliked: ["user3", "user4"],
//   },
//   {
//     id: 2,
//     comments: [
//       { userid: "user5", description: "Nice post!" },
//       { userid: "user6", description: "I agree" },
//     ],
//     createdAt: new Date("2023-12-25T10:15:23.000Z"), 
//     description: "This is another post description",
//     image: "https://images.unsplash.com/photo-1513151233558-d860c5398176", 
//     likescount: 7,
//     name: "User7",
//     usersliked: ["user8", "user9", "user10"],
//   },
//   {
//     id: 3,
//     comments: [
//       { userid: "user11", description: "Wow, amazing!" },
//       { userid: "user12", description: "Very cool" },
//     ],
//     createdAt: new Date("2023-12-24T07:45:12.000Z"),
//     description: "This is yet another post description",
//     image: "https://images.unsplash.com/photo-1508615070457-7baeba4003e0",
//     likescount: 10,
//     name: "User13",
//     usersliked: ["user14", "user15", "user16", "user17"],
//   },
// ];


  return (
    <div className="anouncements-main">
      <h1>AnouncementsPage</h1>
      {!parsedData.email ? (
        <div className="announcements-error">
          <Stack className="announcements-child" spacing={2}>
            <Alert severity="error">Please Login to Like and Comment !! </Alert>
        </Stack>
        </div>
      ) : (
        <></>
      )}
      <div className="anouncements-div">
        {loading ? (
          <div className="loader">
            <CircularProgress />
          </div>
        ) : (
          announcements.map((announcement) => (
            <AnouncementPost
              key={announcement.id}
              documentId={announcement.id}
              likescount={announcement.likescount}
              name={announcement.name}
              image={announcement.image}
              usersliked={announcement.usersliked}
              description={announcement.description}
              createdAt={announcement.createdAt.toDate().toLocaleDateString()}
              initialcomments={announcement.comments}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AnouncementsPage;
