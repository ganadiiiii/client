import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RedirectModal from "../../order/RedirectModal";

const Cart: React.FC = () => {
    const navigate = useNavigate();
    const [isRedirectModalOpen, setIsRedirectModalOpen] = useState(false);

	return (
        <div className="min-h-screen flex flex-col items-center justify-center relative bg-background bg-cover bg-center text-center">
            <RedirectModal
                isOpen={true}
                message="주문 내역이 없습니다"
                onClose={() => {
                    setIsRedirectModalOpen(false);
                    navigate("/");
                }}
            />
        </div>
    );
};

export default Cart;