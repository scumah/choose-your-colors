import {
  IoAmericanFootball,
  IoBaseball,
  IoBasketball,
  IoFootball,
} from "react-icons/io5";
import { GiHockey } from "react-icons/gi";
import { TbPlayHandball } from "react-icons/tb";
import { FaRegQuestionCircle } from "react-icons/fa";

import { ReactNode } from "react";

export default function sportIcon(sport: string): ReactNode {
  switch (sport) {
    case "Baseball":
      return <IoBaseball title="Baseball" />;
    case "Basketball":
      return <IoBasketball title="Basketball" />;
    case "American football":
      return <IoAmericanFootball title="American football" />;
    case "Ice hockey":
      return <GiHockey title="Hockey" />;
    case "Football":
      return <IoFootball title="Football" />;
    case "Handball":
      return <TbPlayHandball title="Handball" />;
    default:
      return <FaRegQuestionCircle />;
  }
}
