import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";

import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  query,
  where,
  updateDoc,
  arrayUnion,
  arrayRemove,
  doc,
  getDoc,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function AnouncementPost({
  key,
  documentId,
  likescount,
  name,
  image,
  usersliked,
  description,
  createdAt,
  initialcomments,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const [parsedData, setParsedData] = useState({});
  const [totalLikes, setTotalLikes] = useState(likescount);
  const [checkuser, setcheckuser] = useState(false);
  const [loading, setLoading] = useState(true);

  const [comments, setComments] = useState([]);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const storedData = localStorage.getItem("user-data");
    if (storedData) {
      setParsedData(JSON.parse(storedData));
    }

    if (
      usersliked &&
      parsedData.email &&
      usersliked.includes(parsedData.email)
    ) {
      setLiked(true);
    }
  }, [parsedData.email, usersliked]);

  useEffect(() => {
    const storedData = localStorage.getItem("user-data");
    if (storedData) {
      setParsedData(JSON.parse(storedData));
    }
    const isLoggedIn = !!parsedData.email;
    setcheckuser(isLoggedIn);
  }, [localStorage.getItem("user-data")]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const docRef = doc(db, "announcements", documentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const postData = docSnap.data();
          const postComments = postData.comments || [];

          setComments(postComments);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [documentId, comments]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "announcements", documentId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const postData = docSnap.data();
          const { usersliked: currentUsersLiked } = postData;

          if (currentUsersLiked.includes(parsedData.email)) {
            setLiked(true);
          }
          setTotalLikes(currentUsersLiked.length);
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchData();
  }, [documentId, parsedData.email]);

  const handleLikeClick = async () => {
    if (!parsedData.email) {
      console.log("Please Login");
      return;
    }
    try {
      const docRef = doc(db, "announcements", documentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const postData = docSnap.data();
        const { usersliked: currentUsersLiked } = postData;

        const userAlreadyLiked = currentUsersLiked.includes(parsedData.email);

        if (userAlreadyLiked) {
          const updatedLikedUsers = currentUsersLiked.filter(
            (userId) => userId !== parsedData.email
          );
          await updateDoc(docRef, { usersliked: updatedLikedUsers });
          setLiked(false);
          setTotalLikes(updatedLikedUsers.length);
        } else {
          const updatedLikedUsers = [...currentUsersLiked, parsedData.email];
          await updateDoc(docRef, { usersliked: updatedLikedUsers });
          setLiked(true);
          setTotalLikes(updatedLikedUsers.length);
        }
      }
    } catch (error) {
      console.error("Error handling like click:", error);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      if (commentText.trim() !== "") {
        const docRef = doc(db, "announcements", documentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const postData = docSnap.data();
          const currentComments = postData.comments || [];

          const updatedComments = [
            ...currentComments,
            { userid: parsedData.email, description: commentText },
          ];

          await updateDoc(docRef, { comments: updatedComments });

          setComments(updatedComments);

          setCommentText("");
        }
      }
    } catch (error) {
      console.error("Error handling comment submission:", error);
    }
  };

  const [commentText, setCommentText] = useState("");

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        backgroundColor:"aliceblue",
        borderRadius: 8, // Border radius of 8px
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Box shadow
      }}
    >
      {" "}
      <CardHeader
        avatar={
          <img
            src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
            height={30}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={createdAt}
      />
      <CardMedia component="img" height="194" image={image} alt="Paella dish" />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ fontFamily: "Arial, sans-serif", textAlign: "justify" }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => {
            if (!parsedData.email) {
              console.log("Please Login");
              toast("Please login to like.");
              return;
            }
            handleLikeClick();
          }}
          color={parsedData.email ? (liked ? "error" : "default") : "disabled"}
          disabled={!parsedData.email}
        >
          <FavoriteIcon />
          {totalLikes}
        </IconButton>
        <IconButton
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          disabled={!parsedData.email}
        >
          <CommentIcon /> {" " + comments.length}
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <input
              placeholder="Add a comment"
              value={commentText}
              onChange={handleCommentChange}
              style={{
                padding: "8px",
                width: "100%",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginRight: "8px",
                flex: "1",
              }}
            />
            <button
              onClick={handleCommentSubmit}
              style={{
                padding: "8px 16px",
                backgroundColor: "#007bff",
                width: "100%",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Submit
            </button>
          </div>
          {comments.map((comment, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
                marginTop: "10px",
                border: "1px solid #000",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                padding: "10px",
              }}
            >
              {" "}
              <div>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                  height={30}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Typography>{comment.userid}</Typography>
                <Typography>{comment.description}</Typography>
              </div>
            </div>
          ))}
          <ToastContainer />
        </CardContent>
      </Collapse>
    </Card>
  );
}
