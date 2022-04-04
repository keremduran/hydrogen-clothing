import {useProduct, MediaFile, Image} from '@shopify/hydrogen/client';
import {useState} from 'react';

const galleryItemDefaultClasses =
  'w-[80vw] h-full snap-start md:h-auto object-cover object-center transition ease-in-out rounded-xl duration-700 delay-150 hover:-translate-y-1 hover:scale-[110%]';
const smallItemClasses = `${galleryItemDefaultClasses} md:w-auto hover:opacity-90 cursor-pointer shadow-inner hover:shadow-xl flex-shrink-0 md:col-span-2 lg:col-span-1`;
const largeItemClasses = `${galleryItemDefaultClasses} md:w-full flex-shrink-0 md:flex-shrink-none md:col-start-1 md:col-end-[-1] md:row-start-1 md:row-end-2 `;
const galleryClassesArray = [
  largeItemClasses,
  smallItemClasses,
  smallItemClasses,
  smallItemClasses,
  smallItemClasses,
];
/**
 * A client component that defines a media gallery for hosting images, 3D models, and videos of products
 */
export default function Gallery() {
  const {media, selectedVariant} = useProduct();
  const [activeGalleryItem, setActiveGalleryItem] = useState(0);
  const featuredMedia = selectedVariant.image || media[0]?.image;
  const featuredMediaSrc = featuredMedia?.url.split('?')[0];
  function handleGalleryItemClick(index) {
    if (activeGalleryItem === index) {
      return;
    }
    for (let i = 0; i < galleryClassesArray.length; i++) {
      galleryClassesArray[i] = smallItemClasses;
    }

    galleryClassesArray[index] = largeItemClasses;
    setActiveGalleryItem(index);
  }
  const galleryMedia = media.filter(
    (med) =>
      med.mediaContentType === MODEL_3D_TYPE ||
      med.mediaContentType === VIDEO_TYPE ||
      med.mediaContentType === EXTERNAL_VIDEO_TYPE ||
      !med.image.url.includes(featuredMediaSrc),
  );
  if (!media.length) {
    return null;
  }

  return (
    <div
      className="gap-4 flex md:grid md:grid-cols-4 overflow-x-scroll no-scrollbar scroll-snap-x scroll-smooth h-[485px] md:h-auto place-content-start"
      tabIndex="-1"
    >
      <Image
        data={selectedVariant.image}
        onClick={() => handleGalleryItemClick(0)}
        className={galleryClassesArray[0]}
      />
      {galleryMedia.map((med, index) => {
        let extraProps = {};

        if (med.mediaContentType === MODEL_3D_TYPE) {
          extraProps = MODEL_3D_PROPS;
        }

        return (
          <MediaFile
            tabIndex="0"
            key={med.id || med.image.id}
            className={galleryClassesArray[index + 1]}
            data={med}
            options={{
              height: '485',
              crop: 'center',
            }}
            onClick={() => handleGalleryItemClick(index + 1)}
            {...extraProps}
          />
        );
      })}
    </div>
  );
}

const MODEL_3D_TYPE = 'MODEL_3D';
const MODEL_3D_PROPS = {
  interactionPromptThreshold: '0',
};
const VIDEO_TYPE = 'VIDEO';
const EXTERNAL_VIDEO_TYPE = 'EXTERNAL_VIDEO';
