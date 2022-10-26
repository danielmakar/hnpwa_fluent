import React from "react";
import "./App.css";
import { Navigation } from "./components/Navigation";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Stories from "./sites/Stories";
import { Comment } from "./components/Comment";
import { Story } from "./components/Story";
import { User } from "./components/User";

function App() {
  initializeIcons();

  const isMobile = useMediaQuery({ query: "(max-width: 787px)" });

  const _getRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/new" />}></Route>
        <Route
          path="/new"
          element={<Stories storyType={"newstories"}></Stories>}
        ></Route>
        <Route
          path="/top"
          element={<Stories storyType={"topstories"}></Stories>}
        ></Route>
        <Route
          path="/ask"
          element={<Stories storyType={"askstories"}></Stories>}
        ></Route>
        <Route
          path="/show"
          element={<Stories storyType={"showstories"}></Stories>}
        ></Route>
        <Route
          path="/jobs"
          element={<Stories storyType={"jobstories"}></Stories>}
        ></Route>
        <Route
          path="/comments"
          element={<Comment commentID={2921983}></Comment>}
        ></Route>
        <Route path="/user/:userID" element={<User></User>}></Route>
        <Route
          path="/story/:storyID"
          element={<Story isolated={true}></Story>}
        ></Route>
      </Routes>
    );
  };
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <div className="nav">
            <Navigation></Navigation>
          </div>
          {!isMobile && <div className="content">{_getRoutes()}</div>}
          {isMobile && <div className="mobile-content">{_getRoutes()}</div>}
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
