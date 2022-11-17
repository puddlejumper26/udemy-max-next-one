import { Fragment } from "react";
import { useRouter } from "next/router";
import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

function AllEventsPage(props) {
  console.log("01-AllEventsPage-props", props);
  const { events } = props;
  console.log("01-AllEventsPage-events", events);
  // const events = getAllEvents();
  const router = useRouter();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}
export default AllEventsPage;

export async function getStaticProps() {
  const res = await fetch(
    "https://nextjs-practice-max-02-default-rtdb.firebaseio.com/events.json"
  );
  console.log("01-AllEventsPage-getStaticProps-index - ", res);
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

  console.log(
    "01-AllEventsPage-getStaticProps-transformedEvents - ",
    transformedEvents
  );

  return {
    props: {
      events: transformedEvents,
    },
  };
}
