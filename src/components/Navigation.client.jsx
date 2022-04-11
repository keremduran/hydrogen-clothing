import {Link} from '@shopify/hydrogen/client';

/**
 * A client component that defines the navigation for a web storefront
 */
export default function Navigation({collections}) {
  const mainNavItems = collections.mainNavItems.items;
  const subNavItems = collections.subNavItems;
  return (
    <nav className="hidden lg:block text-center">
      <ul className="md:flex items-top justify-center font-bold gap-2 opacity-95 capitalize">
        {mainNavItems.map((collection) => (
          <li key={collection.id} className="">
            <Link
              to={`/collections/${collection.handle}`}
              className="block rounded-b-lg p-5 clothing-label-effect md:hover:tracking-wide"
            >
              {collection.title.toLowerCase()}
            </Link>
          </li>
        ))}
        <li className="group relative">
          <Link
            to={``}
            className="block rounded-b-lg p-5 clothing-label-effect md:hover:tracking-wide"
          >
            {subNavItems.title.toLowerCase()}
          </Link>
          <SubNavigation items={subNavItems.items} />
        </li>
      </ul>
    </nav>
  );
}

function SubNavigation({items}) {
  return (
    <ul className="hidden group-hover:fixed text-sm py-5 px-10 top-[4rem] left-0 justify-center group-hover:flex flex-wrap items-center font-bold gap-2 capitalize ">
      {items.map((collection) => (
        <li key={collection.id} className="">
          <Link
            to={`/collections/${collection.handle}`}
            className="block rounded-b-lg p-3 clothing-label-effect"
          >
            {collection.title.toLowerCase()}
          </Link>
        </li>
      ))}
    </ul>
  );
}
