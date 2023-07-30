import { Routes, Route } from "react-router-dom";
import "./App.css";
import PostsList from "./screens/PostsList";
import AddPost from "./screens/AddPost";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/addPost" element={<AddPost />} />
        <Route path="/" element={<PostsList />} />
      </Routes>
    </div>
  );
}

export default App;
