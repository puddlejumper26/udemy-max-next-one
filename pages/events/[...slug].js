import { useRouter } from "next/router";
import { Fragment } from "react";

import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import { getFilteredEvents } from "../../dummy-data";

function FilterdEventsPage() {
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
  console.log("numYear - ", numYear);
  console.log("numMonth -", numMonth);
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth > 12 ||
    numMonth < 1
  ) {
    return <p>Invalid input - please correct it</p>;
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });
  console.log("filteredEvents -", filteredEvents);
  if (!filteredEvents || filteredEvents.length === 0) {
    return <p>No Events found for the filter</p>;
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
