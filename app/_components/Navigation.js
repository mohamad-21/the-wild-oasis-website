import Link from "next/link";
import { auth } from "@/app/auth";
import Image from "next/image";

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10">
      <ul className="flex gap-6 items-center">
        <li>
          <Link href="/cabins" className="hover:text-accent-400 transition-colors">
            Cabins
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-accent-400 transition-colors">
            About
          </Link>
        </li>
        <li>
          <Link
            href="/account"
            className="hover:text-accent-400 transition-colors"
          >
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                width={35}
                height={35}
                className="rounded-full"
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
            ) : (
              'Guest area'
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
