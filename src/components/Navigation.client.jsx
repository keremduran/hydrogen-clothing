import {Link} from '@shopify/hydrogen/client';

/**
 * A client component that defines the navigation for a web storefront
 */
export default function Navigation({collections}) {
  return (
    <nav className="hidden lg:block text-center">
      <ul className="md:flex items-center justify-center font-bold gap-2 opacity-95 capitalize">
        {collections.map((collection) => (
          <li key={collection.id} className="">
            <Link
              to={`/collections/${collection.handle}`}
              className="block rounded-b-lg p-5 clothing-label-effect"
            >
              {collection.title.toLowerCase()}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
