import React, { useState } from "react";
import { useEffect } from "react";
import { YOUTUBE_API } from "../utils/constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_API);
    const json = await data.json();
    console.log(json?.items);
    setVideos(json?.items);
  };
  if (videos.length === 0) return <h1>Loading...</h1>;
  return (
    <div className="grid grid-cols-4 ">
      {videos.map((video) => (
        <Link key={video.id} to={"/watch?v=" + video.id}>
          <VideoCard info={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
