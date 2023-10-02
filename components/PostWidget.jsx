"use client";

import React, { useEffect, useState } from "react";
import useStore from "@/store/blog";
import { getRecentPosts, getSimilarPosts } from "@/services";
import moment from "moment/moment";
import Link from "next/link";
import { RotatingLines } from "react-loader-spinner";
import Image from "next/image";

const PostWidget = ({ categories, slug }) => {
  const { relatedPosts } = useStore();
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) => {
        useStore.setState({ relatedPosts: result });
        setIsDataLoaded(true);
      });
    } else {
      getRecentPosts().then((result) => {
        useStore.setState({ relatedPosts: result });
        setIsDataLoaded(true);
      });
    }
  }, [slug]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>

      <div className="flex flex-col">
        {!isDataLoaded ? (
          <div className=" flex items-center justify-center">
            <RotatingLines
              strokeColor="green"
              strokeWidth="5"
              animationDuration="0.75"
              width="40"
              visible={true}
            />
          </div>
        ) : (
          relatedPosts.map((post) => (
            <div key={post.title} className="flex w-full mb-4">
              <div className="w-16 flex-none">
                <Image
                  alt={post.title}
                  height="60"
                  width="60"
                  unoptimized
                  className="align-middle w-[80px] h-[60px] rounded-full"
                  src={post.featuredImage.url}
                />
              </div>
              <div className="flex-grow ml-4">
                <p className="text-gray-500 text-xs">
                  {moment(post.createdAt).format("MMM DD, YYYY")}
                </p>
                <Link
                  href={`/post/${post.slug}`}
                  className="text-sm text-gray-700 transition duration-700 cursor-pointer hover:text-blue-600"
                >
                  {post.title}
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PostWidget;
