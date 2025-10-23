import { forwardRef, useImperativeHandle, useState } from "react";

interface TagSectionRef {
	isValid: () => boolean;
}

export const TagSection = forwardRef<TagSectionRef>((_, ref) => {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	const tags = [1, 2, 3];
	const [message, setMessage] = useState("");

    useImperativeHandle(ref, () => ({
        isValid: () => true, // TagSection is always valid
    }));

	return (
		<section
			className="bg-transparent"
			style={{
				width: "42.4375em",
				height: "31em",
			}}
		>
			<h2
				className="w-full text-start text-2xl font-bold text-black mb-2.5"
				style={{ fontFamily: "NexonLv1Gothic" }}
			>
				태그 / 메세지
			</h2>
			<div
				className="p-9 rounded-[1.25em] bg-white w-full"
				style={{ boxShadow: "2px 2px 21.3px 0 rgba(0, 0, 0, 0.08)" }}
			>
				{/* 이름 선택 */}
				<div className="mb-6">
					<div className="flex items-center gap-2">
						<p
							className="text-black/60 text-base font-light"
							style={{ fontFamily: "NexonLv1Gothic" }}
						>
							태그
						</p>
					</div>
                    <div className="flex flex-row gap-12.5 pt-4">
                        {tags.map((number, index) => (
                            <div key={number} className="flex flex-col relative w-[6.625em] h-[9.4em] items-center">
                                <img
                                    src={`/src/assets/order/tag-${number}.png`}
                                    alt={`tag-${number}`}
                                    className="w-full h-[7.525em]"
                                />
                                <button
                                    onClick={() => setSelectedIndex(index)}
                                    className={`absolute bottom-0 right-4 mt-3 w-4.5 h-4.5 rounded-full transition-all ${
                                        selectedIndex === index
                                            ? "border-4 border-primary 3xl:border-6"
                                            : "border border-black/20"
                                    }`}
                                />
                            </div>
                        ))}
                    </div>
				</div>

				{/* 메시지 */}
				<div className="flex flex-col">
                    <div className="block flex items-center gap-4 mb-2">
                        <p
                            className="text-black/60 text-base font-light text-start"
                            style={{ fontFamily: "NexonLv1Gothic" }}
                        >
                            메시지
                        </p>
                        <span className="text-primary text-xs font-light" style={{ fontFamily: "NexonLv1Gothic" }}>메시지는 태그에 작성됩니다.</span>
                    </div>
					<textarea
						placeholder="친구에게 보낼 메시지를 입력해 보세요!"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						className="w-full h-[9.625em] rounded-[15px] border border-gray/40 p-4 resize-none overflow-y-auto focus:outline-none"
						style={{ fontFamily: "NexonLv1Gothic" }}
					></textarea>
				</div>
			</div>
		</section>
	);
});