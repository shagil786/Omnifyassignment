import { modalProps } from "@/types/types";
import getPosition from "@/utils/getPositions";
import useOutsideClick from "@/utils/useOutsideClick";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

const Modal: React.FC<modalProps> = ({ isOpen, children, style, setIsOpen, onClose, isCenter, myRef, position }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [coords, setCoords] = useState<any>();
    const isClickOutside = useOutsideClick(modalRef);

    useEffect(() => {
      if(!myRef?.current || !isOpen || isCenter) return;

      const boxRect = myRef.current?.getBoundingClientRect();
      const modalRect = modalRef.current?.getBoundingClientRect();

      let positions = getPosition(position!, boxRect, modalRect!);
      setCoords(positions?.coords);
    },[isOpen, isCenter, myRef?.current])

    useEffect(() => {
      if(isClickOutside) {
        setIsOpen(false);
      }
    },[isClickOutside])

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={`fixed z-2 top-0 bottom-0 right-0 left-0 w-full ${isCenter ? 'flex justify-center items-center' : ''}`}>
      <div ref={modalRef} className="relative w-fit border-[1px] border-[#E2E8F0] search_gradient rounded-md bg-white" style={coords}>
        <div className={`flex ${style}`}>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
