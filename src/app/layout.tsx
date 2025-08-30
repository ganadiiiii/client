import Navbar from "../components/Navbar";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col h-screen">
			<Navbar />
			<main>{children}</main>
		</section>
	);
}
