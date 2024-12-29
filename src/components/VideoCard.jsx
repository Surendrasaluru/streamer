import React from "react";

const VideoCard = (info) => {
  const { snippet, statistics } = info.info;
  const { channelTitle, title, thumbnails } = snippet;

  console.log(info);
  return (
    <div className="border border-none p-2 border-gray-500 shadow-lg mx-2  w-80  rounded-md">
      <img
        alt="thumbnail"
        src={thumbnails.medium.url}
        className="rounded-lg shadow-md shadow-slate-300"
      />

      <h1 className="font-semibold text-left text-base">{title}</h1>
      <h2 className="font-medium text-left text-sm">{channelTitle}</h2>
      <p className="font-medium text-left text-slate-700 my-2 text-xs">
        {statistics.likeCount} LIKES
      </p>
      <p className="font-medium text-left  text-slate-700 text-xs">
        {statistics.viewCount} VIEWS
      </p>
    </div>
  );
};

export default VideoCard;
