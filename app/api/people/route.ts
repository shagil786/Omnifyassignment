import { filterData } from "@/types/types";
import { NextRequest } from "next/server";

const data: Array<any> = [
  { name: "Janice Holt", type: "Player" },
  { name: "Yvette Nash", type: "Attendee" },
  { name: "Matthew Newman", type: "Player" },
  { name: "Martin Rowland", type: "Attendee" },
  { name: "Eric Pearson", type: "Player" },
  { name: "Paula Gordon", type: "Attendee" },
  { name: "Kristina Trevino", type: "Player" },
  { name: "Melinda Brown", type: "Attendee" },
  { name: "Katrina Smith", type: "Player" },
  { name: "Dennis Romero", type: "Attendee" },
  { name: "Melissa King", type: "Player" },
  { name: "Ian Choi", type: "Attendee" },
  { name: "Anita Mcguire", type: "Player" },
  { name: "Christopher Lang", type: "Attendee" },
  { name: "Steven Jones", type: "Player" },
  { name: "Jamie Smith", type: "Attendee" },
  { name: "Rachel Koch", type: "Player" },
  { name: "Heather Silva", type: "Attendee" },
  { name: "Angela Perez", type: "Player" },
  { name: "James Morrow", type: "Attendee" },
  { name: "James Simmons", type: "Player" },
  { name: "Bryan Knight", type: "Attendee" },
  { name: "Sherry Mendez", type: "Player" },
  { name: "Teresa Deleon", type: "Attendee" },
  { name: "Jennifer Calderon", type: "Player" },
  { name: "Alexander Ruiz", type: "Attendee" },
  { name: "Stacie Johnson", type: "Player" },
  { name: "Kimberly Ross", type: "Attendee" },
  { name: "Laura Green", type: "Player" },
  { name: "April Wood", type: "Attendee" },
  { name: "Scott Cole", type: "Player" },
  { name: "Julie Erickson", type: "Attendee" },
  { name: "Benjamin Molina", type: "Player" },
  { name: "Robin Martinez", type: "Attendee" },
  { name: "Denise Ellis", type: "Player" },
  { name: "Charles Hayes", type: "Attendee" },
  { name: "Mary Warner", type: "Player" },
  { name: "Jason Strickland", type: "Attendee" },
  { name: "Adrienne Simmons", type: "Player" },
  { name: "Jennifer Thomas", type: "Attendee" },
  { name: "Andrew Green", type: "Player" },
  { name: "Kyle Olson", type: "Attendee" },
  { name: "Betty Hayes", type: "Player" },
  { name: "Charles Jones", type: "Attendee" },
  { name: "Christopher Ryan", type: "Player" },
  { name: "Amanda Luna", type: "Attendee" },
  { name: "David Roberts", type: "Player" },
  { name: "Charles Davis", type: "Attendee" },
  { name: "Scott Johnson", type: "Player" },
  { name: "Barbara Barber", type: "Attendee" },
  { name: "Daniel Thomas", type: "Player" },
  { name: "Holly Castaneda", type: "Attendee" },
  { name: "Kristina Kramer", type: "Player" },
  { name: "Mr. Darrell Johnson", type: "Attendee" },
  { name: "Charles Hanson", type: "Player" },
  { name: "Cody Hanson", type: "Attendee" },
  { name: "Connor Bush", type: "Player" },
  { name: "Christopher Jones", type: "Attendee" },
  { name: "Andrew Duncan", type: "Player" },
  { name: "Craig Black", type: "Attendee" },
  { name: "Aaron Collier", type: "Player" },
  { name: "Cynthia Richard", type: "Attendee" },
  { name: "Michael Thornton", type: "Player" },
  { name: "James Smith", type: "Attendee" },
  { name: "Eduardo Mendoza", type: "Player" },
  { name: "Monica Roth", type: "Attendee" },
  { name: "Linda Baker", type: "Player" },
  { name: "Robert Spencer", type: "Attendee" },
  { name: "Patricia Macdonald", type: "Player" },
  { name: "Jesse Gonzalez", type: "Attendee" },
  { name: "Keith Morrison", type: "Player" },
  { name: "Denise Ortiz", type: "Attendee" },
  { name: "Anthony Miller", type: "Player" },
  { name: "Lisa Middleton", type: "Attendee" },
  { name: "Jennifer Gonzalez", type: "Player" },
  { name: "Brian Jones", type: "Attendee" },
  { name: "Emma Mejia", type: "Player" },
  { name: "Jill Butler", type: "Attendee" },
  { name: "Charlene Pruitt", type: "Player" },
  { name: "Katie Hernandez", type: "Attendee" },
  { name: "Cheryl Taylor", type: "Player" },
  { name: "Eric Lambert", type: "Attendee" },
  { name: "Kristine Craig", type: "Player" },
  { name: "Kim Gregory", type: "Attendee" },
  { name: "Sara Day", type: "Player" },
  { name: "Rachel Dean", type: "Attendee" },
  { name: "Sarah Carter", type: "Player" },
  { name: "Diane Watson", type: "Attendee" },
  { name: "Lori Bradley", type: "Player" },
  { name: "Terry Sellers", type: "Attendee" },
  { name: "Allen Lee", type: "Player" },
  { name: "Jason Wright", type: "Attendee" },
  { name: "Jack Smith", type: "Player" },
  { name: "Danielle Hawkins", type: "Attendee" },
  { name: "Desiree Williams", type: "Player" },
  { name: "Charles Brown", type: "Attendee" },
  { name: "Lindsey Mann", type: "Player" },
  { name: "Kristopher Lee", type: "Attendee" },
  { name: "Meredith Harrington", type: "Player" },
  { name: "Cassandra Barnes", type: "Attendee" }
];

export async function GET(params: NextRequest) {
  const parameters = new URL(params?.url)?.searchParams;
  const searchText = parameters?.get("searchText");
  const filteredData = data?.length
    ? data?.filter((item) =>
        item?.name?.toLowerCase()?.includes(searchText!?.toLowerCase())
      )
    : [];

  return new Response(JSON.stringify(filteredData?.slice(0, 10)));
}
