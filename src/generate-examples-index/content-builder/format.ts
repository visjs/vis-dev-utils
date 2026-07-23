import { format } from "oxfmt";

export const formatCSS = async (
  css: string | null | undefined,
): Promise<string> => (await format("style.css", css ?? "")).code;
export const formatHTML = async (
  html: string | null | undefined,
): Promise<string> => (await format("index.html", html ?? "")).code;
export const formatJS = async (
  js: string | null | undefined,
): Promise<string> => (await format("script.js", js ?? "")).code;
export const formatMD = async (
  md: string | null | undefined,
): Promise<string> => (await format("README.md", md ?? "")).code;
