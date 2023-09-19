const ButtonImage = ({imgURL, handleAction}) => {
  return (
    <button
      type="button"
      className="relative h-full after:absolute after:top-0 after:left-0 after:w-full after:h-full hover:after:bg-[rgba(0,0,0,0.2)]"
      onClick={handleAction}  
    >
      <img src={imgURL} alt="" className="w-full h-full object-cover -z-10" />
    </button>
  )
}

export default ButtonImage;