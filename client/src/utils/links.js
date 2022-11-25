import { ImStatsBars } from "react-icons/im";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { MdPersonOutline } from "react-icons/md";

const links = [
  { id: 1, text: "all reports", path: "/", icon: <HiOutlineDocumentText /> },
  {
    id: 2,
    text: "add report",
    path: "add-report",
    icon: <HiOutlineDocumentPlus />,
  },
  { id: 3, text: "stats", path: "stats", icon: <ImStatsBars /> },
  { id: 4, text: "profile", path: "profile", icon: <MdPersonOutline /> },
];

export default links;
