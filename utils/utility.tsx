import memoize from "memoize-one";
import calendarIcon from "@/public/images/calendar.svg";
import playerIcon from "@/public/images/user.svg";
import circleIcon from "@/public/images/circle-dot.svg";
import hashIcon from "@/public/images/hash.svg";
import Image from "next/image";

const styling = (row: any) => {
  if (row?.status === "Lead") {
    return { color: "#3B82F6", backgroundColor: "#EFF6FF" };
  } else if (row?.status === "Active") {
    return { color: "#15803D", backgroundColor: "#F0FDF9" };
  } else {
    return { color: "#334155", backgroundColor: "#E2E8F0" };
  }
};

export const columns = memoize((omit) => [
  {
    name: (
      <div className="flex gap-1">
        <Image src={calendarIcon} alt="created on" />
        <span>Created On</span>
      </div>
    ),
    selector: (row: any) => row?.created_on,
    sortable: true,
    omit: omit?.includes(0) ? false : true,
  },
  {
    name: (
      <div className="flex gap-1">
        <Image src={playerIcon} alt="player" />
        <span>Player</span>
      </div>
    ),
    selector: (row: any) => row?.player,
    sortable: true,
    omit: omit?.includes(1) ? false : true,
  },
  {
    name: (
      <div className="flex gap-1">
        <Image src={circleIcon} alt="status" />
        <span>Status</span>
      </div>
    ),
    selector: (row: any) => (
      <div
        className="flex items-center gap-1"
        style={{ ...styling(row), padding: "4px 8px", borderRadius: "20px" }}
      >
        <span
          style={{
            backgroundColor: styling(row)?.color,
            width: "4px",
            height: "4px",
            borderRadius: "20px",
          }}
        ></span>
        <span>{row?.status}</span>
      </div>
    ),
    sortable: true,
    omit: omit?.includes(2) ? false : true,
  },
  {
    name: (
      <div className="flex gap-1">
        <Image src={hashIcon} alt="email" />
        <span>Email</span>
      </div>
    ),
    selector: (row: any) => row?.email,
    sortable: true,
    omit: omit?.includes(3) ? false : true,
  },
  {
    name: (
      <div className="flex gap-1">
        <Image src={hashIcon} alt="player phone" />
        <span>Player Phone</span>
      </div>
    ),
    selector: (row: any) => row?.player_phone,
    sortable: true,
    omit: omit?.includes(4) ? false : true,
  },
  {
    name: (
      <div className="flex gap-1">
        <Image src={hashIcon} alt="services" />
        <span>Services</span>
      </div>
    ),
    selector: (row: any) => row?.services,
    sortable: true,
    omit: omit?.includes(5) ? false : true,
  },
  {
    name: (
      <div className="flex gap-1">
        <Image src={calendarIcon} alt="calendar" />
        <span>Scheduled</span>
      </div>
    ),
    selector: (row: any) => row?.scheduled,
    sortable: true,
    omit: omit?.includes(6) ? false : true,
  },
]);
