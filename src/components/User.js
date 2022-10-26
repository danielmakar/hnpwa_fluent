import { getUser } from "../services/HNService";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TimeAgo from "react-timeago";
import { Text } from "@fluentui/react";

export const User = () => {
  const [user, setUser] = useState({});

  const { userID } = useParams();

  useEffect(() => {
    getUser(userID).then((data) => data && data.id && setUser(data));
  }, [userID]);

  const _userDate = new Date(user.created * 1000);

  return (
    <>
      <Text variant="xLarge">{user.id}</Text>
      <div>
        <Text variant="medium">
          Created: <TimeAgo date={user.created * 1000}></TimeAgo> (
          {_userDate.toDateString()})
        </Text>
      </div>
      <div>
        <Text variant="medium">Karma: {user.karma} points</Text>
      </div>
      {user.about && (
        <div>
          <Text variant="medium">
            <span dangerouslySetInnerHTML={{ __html: user.about }}></span>
          </Text>
        </div>
      )}
    </>
  );
};
