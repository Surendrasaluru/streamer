import moment from "moment";
import React from "react";

const VideoCard = (info) => {
  const { snippet, statistics } = info.info;
  const { channelTitle, title, thumbnails, publishedAt } = snippet;

  //console.log(info);
  return (
    <div className="border border-none p-2 mb-4 border-gray-500 shadow-xl dark:shadow-none dark:bg-slate-700  dark:border-gray-100    w-80 min-h-full  rounded-md">
      <img
        alt="thumbnail"
        src={thumbnails.medium.url}
        className="rounded-lg shadow-md shadow-slate-300"
      />

      <h1 className="font-semibold text-left text-base text-black dark:text-white ">
        {title}
      </h1>
      <h2 className="font-medium text-left text-sm text-gray-500">
        {channelTitle}
      </h2>
      <h2 className="font-medium text-left text-sm text-gray-500">
        {moment(publishedAt).fromNow()}
      </h2>
    </div>
  );
};

export default VideoCard;
