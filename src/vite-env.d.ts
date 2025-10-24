/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_GOOGLE_MAPS_API_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

// Audio file types
declare module "*.mp3" {
	const src: string;
	export default src;
}
