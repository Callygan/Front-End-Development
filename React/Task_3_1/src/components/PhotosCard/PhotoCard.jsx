const FALLBACK_IMG = 'https://via.placeholder.com/640x427?text=No+Image';

function PhotoCard({ image, title }) {
  const label = title || 'Untitled';
  const handleError = (event) => {
    event.target.onerror = null;
    event.target.src = FALLBACK_IMG;
  };

  return (
    <li className="relative w-full">
      <div className="relative aspect-[4/5]">
        <img
          src={image}
          alt={label}
          loading="lazy"
          onError={handleError}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-0 w-full bg-black/50 text-white px-2 py-1 text-base flex justify-center text-center">
          <span className="truncate block">{label}</span>
        </div>
      </div>
    </li>
  );
}

export default PhotoCard;