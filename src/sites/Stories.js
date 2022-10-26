import { useEffect, useState } from "react";
import { Story } from "../components/Story";
import { getItems } from "../services/HNService";
import { Separator, Stack } from "@fluentui/react";
import { DefaultButton } from "@fluentui/react";

export default function Stories({ storyType }) {
  const [stories, setStories] = useState([]);
  const [storyCount, setStoryCount] = useState(30);

  const handlePageChange = () => {
    setStoryCount(storyCount + 30);
  };

  useEffect(() => {
    getItems(storyType).then((data) => data && setStories(data));
  }, [storyType]);

  return (
    <div>
      <Stack>
        {stories.slice(storyCount - 30, storyCount).map((storyID) => (
          <div key={storyID}>
            <Story
              itemID={storyID}
              isolated={false}
              number={stories.indexOf(storyID) + 1}
            ></Story>
            <Separator />
          </div>
        ))}
      </Stack>
      <DefaultButton
        text="More"
        onClick={handlePageChange}
        className="btn-next"
      />
    </div>
  );
}
