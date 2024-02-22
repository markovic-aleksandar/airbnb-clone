const ListingTitle = ({title, location}) => {
  const {address, city, country} = location;

  return (
    <div>
      <h2 className="mb-3">{title}</h2>
      <h4 className="text-sm font-medium underline">{city}, {address}, {country}</h4>
    </div>
  )
}

export default ListingTitle;
