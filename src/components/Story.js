import { getItem } from "../services/HNService";
import { useState, useEffect } from "react";
import { Link as LinkRouter, useParams } from "react-router-dom";
import { Text, Separator, Link, Stack } from "@fluentui/react";
import urlParse from "url-parse";
import TimeAgo from "react-timeago";
import { Comment } from "./Comment";

export const Story = ({ itemID, isolated, number }) => {
  const [story, setStory] = useState({});

  const { storyID } = useParams();

  useEffect(() => {
    itemID
      ? getItem(itemID).then((data) => data && data.id && setStory(data))
      : getItem(storyID).then((data) => data && data.id && setStory(data));
  }, [itemID, storyID]);

  const _getStoryTitle = () => {
    return story.url ? (
      <>
        <Link
          href={story.url}
          styles={{
            root: {
              textDecoration: "none",
              color: "black",
              "&:hover": { textDecoration: "underline" },
              fontSize: "16px",
            },
          }}
        >
          {story.title} ({urlParse(story.url).hostname})
        </Link>
      </>
    ) : (
      <LinkRouter to={`/${story.type}/${story.id}`} className="link">
        <Text style={{ fontSize: "16px" }}>{story.title}</Text>
      </LinkRouter>
    );
  };

  const _getStoryData = () => {
    if (story.type === "job") {
      return (
        <>
          <Text variant="medium">
            <TimeAgo date={story.time * 1000}></TimeAgo>
          </Text>
        </>
      );
    }

    return (
      <>
        <Text variant="medium">{story.score} points by </Text>
        <LinkRouter to={`/user/${story.by}`} className="link bold">
          <Text variant="medium">{story.by}</Text>
        </LinkRouter>{" "}
        <Text variant="medium">
          <TimeAgo date={story.time * 1000}></TimeAgo> |{" "}
        </Text>
        <LinkRouter to={`/story/${story.id}`} className="link bold">
          {story.descendants === 1 ? (
            <Text variant="medium">{`${story.descendants} comment`}</Text>
          ) : (
            <Text variant="medium">{`${story.descendants} comments`}</Text>
          )}
        </LinkRouter>
      </>
    );
  };

  const _getStoryText = () => {
    return (
      isolated &&
      story.text && (
        <Text variant="medium">
          <span dangerouslySetInnerHTML={{ __html: story.text }}></span>
        </Text>
      )
    );
  };

  const _getStoryNumber = () => {
    return (
      !isolated && (
        <Text
          variant="xLarge"
          styles={{ root: { alignSelf: "center", marginRight: "16px" } }}
        >
          {number}.
        </Text>
      )
    );
  };

  const _getStoryComments = () => {
    return (
      isolated &&
      story.kids &&
      story.kids.map((kid) => (
        <Comment key={kid} commentID={kid} level={0}></Comment>
      ))
    );
  };

  return (
    <Stack>
      <div style={{ display: "flex" }}>
        {_getStoryNumber()}
        <div>
          <div>{_getStoryTitle()}</div>
          <div>{_getStoryData()}</div>
          <div>{_getStoryText()}</div>
        </div>
      </div>
      {isolated && <Separator />}
      {_getStoryComments()}
    </Stack>
  );
};
