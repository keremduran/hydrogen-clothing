import {useEffect, useState} from 'react';
import {Link} from '@shopify/hydrogen/client';

import CartToggle from './CartToggle.client';
import {useCartUI} from './CartUIProvider.client';
import CountrySelector from './CountrySelector.client';
import Navigation from './Navigation.client';
import MobileNavigation from './MobileNavigation.client';

/**
 * A client component that specifies the content of the header on the website
 */
export default function Header({collections, storeName}) {
  const mainNavTitles = ['featured', 'men', 'women', 'kid', 'sale'];
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const {isCartOpen} = useCartUI();
  const organizedCollections = {
    mainNavItems: {title: 'Main Nav', items: []},
    subNavItems: {title: 'Brands', items: []},
  };
  collections.map((collection) => {
    mainNavTitles.includes(collection.title.toLowerCase())
      ? organizedCollections.mainNavItems.items.push(collection)
      : organizedCollections.subNavItems.items.push(collection);
  });
  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    setScrollbarWidth(scrollbarWidth);
  }, [isCartOpen]);

  return (
    <header className="h-20 lg:h-25" role="banner">
      <div
        className={`fixed z-20 w-full py-4 px-8 md:px-8 lg:py-0 mx-auto ${
          isMobileNavOpen ? '' : 'backdrop-blur-md'
        }`}
      >
        <div
          className="h-full flex lg:flex-col place-content-between "
          style={{
            paddingRight: isCartOpen ? scrollbarWidth : 0,
          }}
        >
          <div className="text-center w-full h-full flex justify-between items-center">
            <span className="flex items-center">
              <MobileNavigation
                collections={organizedCollections}
                isOpen={isMobileNavOpen}
                setIsOpen={setIsMobileNavOpen}
              />
              <Link
                className="font-bold text-3xl p-1 pb-2 mx-4 lowercase"
                to="/"
              >
                {storeName}
              </Link>
              <Navigation
                collections={organizedCollections}
                storeName={storeName}
              />
            </span>
            <span className="flex">
              <CountrySelector />
              <CartToggle
                handleClick={() => {
                  if (isMobileNavOpen) setIsMobileNavOpen(false);
                }}
              />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
