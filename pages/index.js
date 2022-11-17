import Link from "next/link";
import { getFeaturedEvents } from "../dummy-data";
import EventList from "../components/events/event-list";
import styles from "../styles/Home.module.css";

export default function HomePage() {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      This is the Home Page
      <EventList items={featuredEvents} />
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    "https://nextjs-practice-max-02-default-rtdb.firebaseio.com/events.json"
  );

  const data = await res.json();
  const transformedEvents = [];
  for (const key in data) {
    transformedEvents.push({
      id: key,
      date: data[key].date,
      description: data[key].description,
      image: data[key].image,
      location: data[key].location,
      title: data[key].title,
      isFeatured: data[key].isFeatured,
    });
  }

  return {
    props: {
      events: transformedEvents,
    },
  };
}
