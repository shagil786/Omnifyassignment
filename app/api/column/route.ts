import { NextRequest } from "next/server";

const arr = [
  { name: "created_on", id: 0, label: "Created On" },
  { name: "player", id: 1, label: "Player" },
  { name: "status", id: 2, label: "Status" },
  { name: "email", id: 3, label: "Email" },
  { name: "player_phone", id: 4, label: "Player Phone" },
  { name: "services", id: 5, label: "Services" },
  { name: "scheduled", id: 6, label: "Scheduled" },
];

export async function GET(params: NextRequest) {
  return new Response(JSON.stringify(arr));
}
