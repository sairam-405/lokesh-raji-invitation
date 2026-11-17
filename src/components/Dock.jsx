import { useNavigate } from "react-router-dom";
import { content } from "../content.js";

export default function Dock() {
  const navigate = useNavigate();
  return (
    <nav className="dock">
      <button className="on">{content.dock.invite}</button>
      {/* opens the first screen again, lights off */}
      <button onClick={() => navigate("/")}>{content.dock.bridge}</button>
    </nav>
  );
}
