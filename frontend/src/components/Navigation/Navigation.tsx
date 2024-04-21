import Link from "next/link";

const links = [
  {
    route: "/",
    label: "Home",
  },
  {
    route: "/radio-list",
    label: "Radio List",
  },
];

export default function Navigation() {
  return (
      <header className="rounded-sm p-4">
        <nav className="flex list-none ">
          <ul className="flex gap-8">
            {links.map(({ route, label }) => (
              <li key={route}>
                <Link href={route} className="text-black hover:text-green-500">
                  <h2>{label}</h2>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
  );
}
