import {useProduct, MediaFile} from '@shopify/hydrogen/client';
import {useState} from 'react';

const galleryItemDefaultClasses =
  'w-[80vw] h-full rounded-xl snap-start md:h-auto object-cover object-center transition ease-in-out duration-300 delay-150 hover:-translate-y-4 hover:shadow-xl';
const largeItemClasses = `${galleryItemDefaultClasses} md:col-span-full`;
const smallItemClasses = `${galleryItemDefaultClasses} hover:opacity-90 cursor-pointer flex-shrink-0 md:col-span-2 lg:col-span-1`;

/**
 * A client component that defines a media gallery for hosting images, 3D models, and videos of products
 */
export default function Gallery() {
  const {media} = useProduct();
  const [activeGalleryItemIndex, setActiveGalleryItemIndex] = useState(0);

  if (!media.length) {
    return null;
  }

  let galleryMedia = media.filter(
    (med) =>
      med.mediaContentType === MODEL_3D_TYPE ||
      med.mediaContentType === VIDEO_TYPE ||
      med.mediaContentType === EXTERNAL_VIDEO_TYPE ||
      med.mediaContentType === IMAGE_TYPE,
  );
  const galleryMediaIndexes = Array.from(
    Array(galleryMedia.length),
    (_, i) => (i + activeGalleryItemIndex) % galleryMedia.length,
  );

  return (
    <div
      className={`gap-4 flex md:grid md:grid-cols-4 overflow-x-scroll no-scrollbar scroll-snap-x scroll-smooth h-[485px] md:h-auto place-content-start`}
      tabIndex="-1"
    >
      {galleryMediaIndexes.map((medIndex, index) => {
        let extraProps = {};
        let med = galleryMedia[medIndex];
        if (med.mediaContentType === MODEL_3D_TYPE) {
          extraProps = MODEL_3D_PROPS;
        }
        return (
          <MediaFile
            tabIndex="0"
            key={med.id || med.image.id}
            className={
              medIndex === activeGalleryItemIndex
                ? largeItemClasses
                : smallItemClasses
            }
            data={med}
            options={{
              height: '485',
              crop: 'center',
            }}
            onClick={() => setActiveGalleryItemIndex(medIndex)}
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
const IMAGE_TYPE = 'IMAGE';
