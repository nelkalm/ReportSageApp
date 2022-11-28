import { ImStatsBars } from "react-icons/im";
import { FaFileAlt, FaFileMedical } from "react-icons/fa";
import { MdPersonOutline } from "react-icons/md";

const links = [
  { id: 1, text: "all reports", path: "/", icon: <FaFileAlt /> },
  {
    id: 2,
    text: "Create report",
    path: "add-report",
    icon: <FaFileMedical />,
  },
  { id: 3, text: "stats", path: "stats", icon: <ImStatsBars /> },
  { id: 4, text: "profile", path: "profile", icon: <MdPersonOutline /> },
];

export default links;
