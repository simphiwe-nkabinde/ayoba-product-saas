import { writable } from "svelte/store";

export const cart = writable([]);
export const theme = writable({
    primary_text_color: "",
    secondary_text_color: "",
    tertiary_text_color: "",
    primary_bg: "",
    secondary_bg: "",
    tertiary_bg: "",
    primary_font: "",
    secondary_font: "",
    tertiary_font: "",
    page_bg: ""
})