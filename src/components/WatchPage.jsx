import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import { GOOGLE_API } from "../utils/constants";
/*
id=Ks-_Mh1QhMc&key=[YOUR_API_KEY]
*/

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const videoid = searchParams.get("v");
  console.log(searchParams.get("v"));
  const dispatch = useDispatch();
  const [videoData, setVideoData] = useState([]);
  const SINGLE_VIDEO_API =
    "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=" +
    videoid +
    "&key=" +
    GOOGLE_API;
  const getVideoDetails = async () => {
    const data = await fetch(SINGLE_VIDEO_API);
    const json = await data.json();
    console.log(json?.items[0]);
    setVideoData(json?.items[0]);
  };

  useEffect(() => {
    getVideoDetails();
    dispatch(closeMenu());
  }, []);
  if (videoData.length === 0) return <h1>Loading</h1>;

  const { title, channelTitle } = videoData.snippet;
  const { viewCount, likeCount } = videoData.statistics;

  return (
    <div className="col-span-11 mx-5">
      <iframe
        width="1060"
        height="455"
        src={"https://www.youtube.com/embed/" + searchParams.get("v")}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      <h1 className="text-xl font-semibold">{title}</h1>
      <h2 className="text-lg font-semibold">{channelTitle}</h2>
      <div className="flex">
        <button className="bg-red-600 text-white font-semibold p-2 border border-slate-200 shadow-lg rounded-l-full">
          LIKE
        </button>
        <p className="bg-red-600 mr-2 text-white font-semibold p-2 border-none rounded-r-full">
          {likeCount} 👍🏻
        </p>
        <button className="bg-red-600 text-white font-semibold p-2 border border-slate-200 shadow-lg rounded-full">
          {viewCount} Views 👁️
        </button>
      </div>
    </div>
  );
};

export default WatchPage;

/**
 * const [searchParams] = useSearchParams();
  const videoid = searchParams.get("v");
  console.log(searchParams.get("v"));
  const dispatch = useDispatch();

  const SINGLE_VIDEO_API =
    "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=" +
    videoid +
    "&key=" +
    GOOGLE_API;

  const getVideoDetails = async () => {
    const data = await fetch (SINGLE_VIDEO_API);
    const json = await data.json();
    console.log(json)
    }
  };
  useEffect(() => {
    dispatch(closeMenu());
  }, []);
 */
