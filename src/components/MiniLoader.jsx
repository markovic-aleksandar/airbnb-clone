const MiniLoader = ({color}) => {
  return (
    <span className="mini-loader-holder">
      <span className="loader" style={{border: color ? `3px solid ${color}` : '3px solid #FF385C', borderBottomColor: 'transparent'}}></span>
    </span>
  )
}

export default MiniLoader;