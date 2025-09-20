import { useEffect, useRef } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import type { Address } from "react-daum-postcode";

interface CustomPostcodeModalProps {
  onClose: () => void;
  onComplete: (data: Address) => void;
}

const CustomPostcodeModal = ({ onClose, onComplete }: CustomPostcodeModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 닫힘 처리
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const themeObj = {
    bgColor: "#FFFFFF",
    searchBgColor: "#FFFFFF",
    contentBgColor: "#FFFFFF",
    pageBgColor: "#FFFFFF",
    textColor: "#000000",
    queryTextColor: "#000000",
    postcodeTextColor: "#FF9BAF",
    emphTextColor: "#FF9BAF",
    outlineColor: "#D3D3D3",
  };

  return (
    <div className="fixed inset-0 bg-modal-bg/60 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-[20px] overflow-hidden w-[32em] h-[40em] p-2"
      >
        <DaumPostcodeEmbed
          onComplete={onComplete}
          theme={themeObj}
          style={{ width: "100%", height: "100%", borderRadius: "1.25em" }}
        />
      </div>
    </div>
  );
};

export default CustomPostcodeModal;