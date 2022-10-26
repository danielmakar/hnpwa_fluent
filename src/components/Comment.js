import { useState, useEffect } from "react";
import TimeAgo from "react-timeago";
import { getItem } from "../services/HNService";
import { Link as LinkRouter } from "react-router-dom";
import { Text, Separator, Stack } from "@fluentui/react";

export const Comment = ({ commentID, level }) => {
  const [comment, setComment] = useState({});
  //const [parentStory, setParentStory] = useState({});

  useEffect(() => {
    getItem(commentID).then((data) => data && data.id && setComment(data));
    // getCommentParent(commentID).then(
    //   (data) => data && data.id && setParentStory(data)
    // );
  }, [commentID]);

  const getCommentHeader = () => {
    return (
      <Text variant="medium">
        <LinkRouter to={`/user/${comment.by}`} className="link bold">
          {comment.by}
        </LinkRouter>{" "}
        <TimeAgo date={comment.time * 1000}></TimeAgo>
      </Text>
    );
  };

  const getCommentText = () => {
    return (
      <Text variant="medium">
        <span dangerouslySetInnerHTML={{ __html: comment.text }}></span>
      </Text>
    );
  };

  return (
    !comment.deleted && (
      <>
        <Stack itemLayout="horizontal" size="small">
          <div className={`comment-level-${level}`}>
            <div>{getCommentHeader()}</div>
            <div>{getCommentText()}</div>
            <Separator />
          </div>
          {comment.kids
            ? comment.kids.map((child) => (
                <Comment
                  key={child}
                  commentID={child}
                  level={level + 1}
                ></Comment>
              ))
            : null}
        </Stack>
      </>
    )
  );
};
