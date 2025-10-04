import React from "react";
import Talk from "../../features/order/Talk";
import { useNavigate } from "react-router-dom";

const ChatPage: React.FC = () => {
	const navigate = useNavigate();
	return (
		<div
			className="min-h-screen flex flex-col items-center justify-center relative bg-background bg-cover bg-center text-center"
			style={{
				backgroundImage: "url('./src/assets/generate/bg.svg')",
			}}
		>
            <div className="flex flex-row w-full h-full gap-4 items-start justify-center">
                <button 
                    className="w-18 h-18 rounded-full flex items-center justify-center"
                    style={{
                        background: "linear-gradient(151deg, rgba(255, 255, 255, 0.10) 17.27%, rgba(255, 255, 255, 0.80) 65.96%)",
                        boxShadow: "3px 4px 1.6px 0 rgba(255, 255, 255, 0.51) inset, 0 4px 7.7px 0 rgba(0, 0, 0, 0.15)",
                    }}
                    onClick={() => navigate(-1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.625em" height="1.625em" viewBox="0 0 26 26" fill="none">
                        <path d="M25.129 16.7789C24.4455 21.5563 20.3369 25.2288 15.3705 25.2288H3.39996V22.4122H15.3707C19.2596 22.4122 22.4121 19.2595 22.4121 15.3706C22.4121 11.4817 19.2596 8.32906 15.3705 8.32906H5.3916L8.91238 11.8498L6.92073 13.8415L0 6.92075L6.92073 0L8.91238 1.99166L5.3916 5.51244H15.3705C20.8151 5.51244 25.2287 9.9261 25.2287 15.3706V16.7789H25.129Z" fill="black"/>
                        </svg>
                </button>
                <Talk />
            </div>
		</div>
	);
};

export default ChatPage;