import Link from "next/link";

const clients = [
  { id: "max", name: "maximiliam" },
  { id: "min", name: "minimilian" },
];

function EventsPage() {
  return (
    <div>
      This is EventsPage
      <ul>
        {clients.map((client) => {
          return (
            <li key={client.id}>
              <Link
                href={{
                  pathName: "events/[eventId]",
                  query: { id: client.id },
                }}
              >
                {client.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default EventsPage;
