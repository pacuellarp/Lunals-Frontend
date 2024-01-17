const Modal = ({
  isOpen,
  onClose,
  message,
  buttonText,
  secondButtonText,
  onClickButton,
}) => {
  if (!isOpen) {
    return null;
  }

  const buttonClicked = () => {
    onClickButton();
    onClose();
  };

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col justify-center rounded bg-white p-8 shadow-lg">
        <p>{message}</p>
        <button
          onClick={buttonClicked || onClose}
          className="mx-6 mt-4 rounded bg-slate-800 px-4 py-2 text-white hover:bg-slate-950"
        >
          {buttonText}
        </button>
        {secondButtonText && (
          <button
            onClick={onClose}
            className="mx-6 mt-4 rounded bg-slate-800 px-4 py-2 text-white hover:bg-slate-950"
          >
            {secondButtonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
