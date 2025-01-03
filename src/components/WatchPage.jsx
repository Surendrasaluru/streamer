import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import { GOOGLE_API } from "../utils/constants";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const videoid = searchParams.get("v");
  //console.log(searchParams.get("v"));
  const dispatch = useDispatch();
  const [videoData, setVideoData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const SINGLE_VIDEO_API =
    "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=" +
    videoid +
    "&key=" +
    GOOGLE_API;

  const COMMENTS_API =
    "https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=" +
    videoid +
    "&key=" +
    GOOGLE_API;
  const getVideoDetails = async () => {
    const data = await fetch(SINGLE_VIDEO_API);
    const json = await data.json();
    //console.log(json?.items[0]);
    setVideoData(json?.items[0]);
  };

  const getComments = async () => {
    const commentsApiData = await fetch(COMMENTS_API);
    const commentsJson = await commentsApiData.json();

    //console.log(commentsJson);
    await setCommentData(commentsJson.items);
    console.log(commentData);
    //console.log(commentData.replies.comments[0].snippet);
  };

  useEffect(() => {
    getVideoDetails();
    getComments();
    dispatch(closeMenu());
  }, []);
  if (videoData.length === 0 || commentData.length === 0)
    return <h1>Loading</h1>;

  const { title, channelTitle } = videoData.snippet;
  const { viewCount, likeCount } = videoData.statistics;
  /*const { textOriginal, authorDisplayName } =
    commentData.items[6].snippet.topLevelComment.snippet;
  /*const { authorDisplayName, textOriginal } =
    commentData[1].replies.comments[0].snippet;*/

  return (
    <div className="grid overflow-x-hidden bg-fixed grid-flow-col">
      <div className="col-span-11  mx-5 sticky top-0 ">
        <iframe
          width="1060"
          height="555"
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
      <div className="col-span-1 text-pretty overflow-y-auto max-w-fit">
        <p className="bg-blue-500 mr-2 text-slate-300 font-semibold p-2 border-none rounded-r-full">
          Comments
        </p>
        {commentData.map((e) => (
          <div key={e.snippet.topLevelComment.id} className="my-2">
            <div className="bg-slate-200 border rounded-lg border-b-slate-400 p-2 flex">
              <img
                src={
                  e.snippet.topLevelComment.snippet.authorProfileImageUrl ||
                  "https://cdn-icons-png.freepik.com/256/13924/13924070.png?ga=GA1.1.752565634.1729341420&semt=ais_hybrid"
                }
                alt="logo"
                className="rounded-full mr-2 w-10 "
              />
              <h1 className="font-semibold text-base">
                {e.snippet.topLevelComment.snippet.authorDisplayName + " "}
                <span className="font-normal text-md">
                  {e.snippet.topLevelComment.snippet.textOriginal}
                </span>
              </h1>
            </div>
          </div>
        ))}
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

  {commentData.map((e) => (
          <div key={e.snippet.topLevelComment.id} className="bg-slate-400">
            <h1>{e.snippet.topLevelComment.snippet.authorDisplayName}</h1>
            <h1>{e.snippet.topLevelComment.snippet.textDisplay}</h1>
          </div>
        ))}
 */
