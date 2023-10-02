"use client";

import React, { useState, useEffect } from "react";
import moment from "moment/moment";
import parse from "html-react-parser";
import { getComments } from "@/services";

const Comments = ({ slug }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(slug).then((res) => setComments(res));
  }, []);

  console.log(comments);

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
        {comments.length > 0 ? (
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            {comments.length} Comments
          </h3>
        ) : (
          <p className="flex items-center justify-center font-semibold text-2xl">
            No comments
          </p>
        )}
        {comments.map((comment) => (
          <div
            key={comment.createdAt}
            className="border-b border-gray-100 mb-4 pb-4"
          >
            <p className="mb-4">
              <span className="font-semibold flex-row">
                {comment.name}{" "}
                <p className="text-gray-500 text-xs">
                  {moment(comment.createdAt).format("MMM DD, YYYY")}
                </p>
              </span>
            </p>
            <p className="whitespace-pre-line text-gray-600 w-full">
              {parse(comment.comment)}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Comments;
