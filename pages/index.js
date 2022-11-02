import Link from "next/link";
import { getFeaturedEvents } from "../dummy-data";
import EventList from "../components/events/event-list";
import styles from "../styles/Home.module.css";

export default function HomePage() {
  const featuredEvents = getFeaturedEvents();
  console.log("featuredEvents - ", featuredEvents);

  return (
    <div>
      This is the Home Page
      <EventList items={featuredEvents} />
    </div>
  );
}
