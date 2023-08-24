import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LikeIcon } from '../../constants';

const Listing = ({id, images, title, location: {country, city}, regularPrice}) => {
  const [imageLoaded, setImageLoaded] = useState(true);
  const navigate = useNavigate();

  return (
    <article className="cursor-pointer" onClick={() => navigate(`listing/${id}`)}>
      <div className="relative mb-3 aspect-[20/19]">
        <img 
          src={images[0]}
          alt={title} 
          className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
          loading="lazy"
          onLoad={() => setImageLoaded(false)}
        />
        <button type="button" className="absolute top-3 right-3">
          <LikeIcon color="rgba(0, 0, 0, 0.5)" />
        </button>
        {imageLoaded && <div className="absolute top-0 left-0 w-full h-full bg-[#ddd] rounded-lg"></div>}
      </div>
      
      <div className="flex flex-col gap-y-[10px]">
        <h4 className="relative leading-[1]">
          {!imageLoaded ? (
            <>
              {city}, {country}
            </>
          ) : (
            <span className="block w-[70%] h-[15px] bg-[#ddd] rounded-[4px]"></span>
          )}
        </h4>
        <p className="relative text-[#717171] leading-[1] line-clamp-1 text-ellipsis">
          {!imageLoaded ? (
            <>
              {title}
            </>
          ) : (
            <span className="block w-[50%] h-[15px] bg-[#ddd] rounded-[4px]"></span>
          )}
        </p>
        <p className="relative leading-[1]">
          {!imageLoaded ? (
            <>
              <span className="font-medium">${regularPrice}</span> night
            </>
          ) : (
            <span className="block w-[30%] h-[15px] bg-[#ddd] rounded-[4px]"></span>
          )}
        </p>
      </div>
    </article>
  )
}

export default Listing;