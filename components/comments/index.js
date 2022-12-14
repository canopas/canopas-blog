import Image from "next/image";
import UserImage from "../../assets/images/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import CommentForm from "./commentForm";

export default function Comment({ post }) {
  let [description, setDescription] = useState(true);
  let [reviews, setReviews] = useState(false);
  let [currentIndex, setcurrentIndex] = useState(0);
  let [previousIndex, setpreviousIndex] = useState(0);
  let threadComments = post.attributes.comments.data;

  const handleSubmit = (id) => () => {
    if (previousIndex == id) {
      setDescription(false);
      setReviews(true);
    } else {
      setDescription(false);
      setReviews(true);
    }
    setcurrentIndex(id);
    setpreviousIndex(currentIndex);
  };

  return (
    <div className="py-10">
      {post.attributes.comments.data.map((comment) => {
        {
          return (
            <ol key={comment.attributes.id} className="px-10 py-2">
              {comment && comment.attributes.parentId == null ? (
                <li className="px-5 py-5 bg-white border border-solid border-gray-300 rounded">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="relative w-[40px] h-[40px] mb-2 md:mb-0">
                        <Image
                          className="rounded-full h-full w-full object-cover absolute inset-0"
                          layout="fill"
                          objectFit="cover"
                          src={UserImage}
                          alt={"user-avatar"}
                        />
                      </div>
                      {comment.attributes.commentators.data.map((user) => {
                        user = user.attributes;
                        return (
                          <div key={user.id} className="pl-3">
                            {user.username}
                          </div>
                        );
                      })}
                    </div>
                    <div
                      onClick={handleSubmit(comment.id)}
                      className="text-gray-500 cursor-pointer"
                    >
                      <FontAwesomeIcon
                        icon={faReply}
                        className="pr-1 text-sm"
                      />
                      Reply
                    </div>
                  </div>
                  <p
                    style={{ ["font-size"]: "14px" }}
                    className="text-gray-500"
                  >
                    {comment.attributes.publishedAt}
                  </p>
                  <div className="pt-4">{comment.attributes.comment}</div>

                  {/* Thread comments */}

                  {threadComments.map((threadComment) => {
                    return (
                      <div key={threadComment.attributes.id}>
                        {threadComment.attributes.parentId &&
                        threadComment.attributes.parentId == comment.id ? (
                          <ol className="pt-2">
                            <li className="px-5 py-5 bg-white border border-solid border-gray-300 rounded">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                  <div className="relative w-[40px] h-[40px] mb-2 md:mb-0">
                                    <Image
                                      className="rounded-full h-full w-full object-cover absolute inset-0"
                                      layout="fill"
                                      objectFit="cover"
                                      src={UserImage}
                                      alt={"user-avatar"}
                                    />
                                  </div>
                                  {threadComment.attributes.commentators.data.map(
                                    (user) => {
                                      user = user.attributes;
                                      return (
                                        <div key={user.id} className="pl-3">
                                          {user.username}
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              </div>
                              <p
                                style={{ ["font-size"]: "14px" }}
                                className="text-gray-500"
                              >
                                {threadComment.attributes.publishedAt}
                              </p>
                              <div className="pt-4">
                                {threadComment.attributes.comment}
                              </div>
                            </li>
                          </ol>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}

                  {reviews && comment.id === currentIndex ? (
                    <CommentForm post={[post.id, comment.id]} />
                  ) : (
                    ""
                  )}
                </li>
              ) : (
                ""
              )}
            </ol>
          );
        }
      })}

      {/* comments form */}
      {description ? <CommentForm post={[post.id, null]} /> : ""}
    </div>
  );
}
