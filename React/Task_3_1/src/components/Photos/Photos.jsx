import photosData from '../../data/photos.json';
import PhotoCard from '../PhotosCard/PhotoCard';

function Photos() {
  const photos = photosData?.photos || photosData || [];

  return (
    <section className="px-0" aria-label="Photo Gallery">
      <h2 className="sr-only">Photo Gallery</h2>
      <ul className="grid grid-cols-2 gap-0">
        {photos.map((photo) => (
          <PhotoCard
            key={photo.id}
            image={photo.webformatURL}
            title={photo.title || photo.tags || photo.alt}
          />
        ))}
      </ul>
    </section>
  );
}

export default Photos;