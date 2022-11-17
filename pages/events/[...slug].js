import { useRouter } from "next/router";
import { Fragment } from "react";

import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
// import { getFilteredEvents } from "../../utils/eventHandler";
import { getFilteredEvents } from "../../dummy-data";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { getPostData } from "../../../demo/lib/posts-util";

function FilterdEventsPage() {
  // const events = props.events;
  // console.log("01-FilterdEventsPage-events - " + events);
  const router = useRouter();
  const filterData = router.query.slug;
  if (!filterData) {
    return <p className=".center">Loading...</p>;
  }
  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  // transfer string to number
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth > 12 ||
    numMonth < 1
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid input - please correct it</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  // const filteredEvents = getFilteredEvents(events, {
  //   year: numYear,
  //   month: numMonth,
  // });
  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No Events found for the filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}
export default FilterdEventsPage;

// export async function getStaticProps() {
//   const res = await fetch(
//     "https://nextjs-practice-max-02-default-rtdb.firebaseio.com/events.json"
//   );
//   console.log("01-FilterdEventsPage-getStaticProps-index - ", res);
//   const data = await res.json();
//   const transformedEvents = [];
//   for (const key in data) {
//     transformedEvents.push({
//       id: key,
//       date: data[key].date,
//       description: data[key].description,
//       image: data[key].image,
//       location: data[key].location,
//       title: data[key].title,
//       isFeatured: data[key].isFeatured,
//     });
//   }

//   console.log(
//     "01-FilterdEventsPage-getStaticProps-transformedEvents - ",
//     transformedEvents
//   );

//   return {
//     props: {
//       events: transformedEvents,
//     },
//   };
// }

// export async function getStaticPaths() {
//   const events = await getAllEvents();

//   const ids = data.
//   const pathsWithParams =
// }
