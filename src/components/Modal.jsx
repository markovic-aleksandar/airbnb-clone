import { useRef } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

const Modal = ({children, title, closeModal}) => {
  const modalHolder = useRef(null);

  const handleCloseModal = () => {
    modalHolder.current.classList.add('fade-out');
    setTimeout(() => {
      closeModal();
    }, 450);
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.45)] z-[999]">
      <div className="w-[95%] max-w-[568px] max-h-[90vh] overflow-y-auto bg-white p-[0_24px_24px_24px] rounded-xl fade-in" ref={modalHolder}>
        <div className={`relative p-[24px_0_20px]${title ? ' border-b border-b-[#ebebeb]' : ''}`}>
          <button 
            type="button"
            id="close-modal-btn"
            className="absolute top-[50%] left-[-10px] translate-y-[-50%] flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#f7f7f7]"
            onClick={handleCloseModal}  
          >
            <IoCloseOutline className="text-[22px]" />
          </button>
          {title && <h3 className="text-center font-medium">{title}</h3>}
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal;