import { UsState } from "@/lib/types";

/**
 * All 50 U.S. states + DC. `activeMembers` is mock data for the beta so the
 * State Community pages feel alive. Replace with real counts once seeded.
 */
const raw: Array<[string, string]> = [
  ["AL", "Alabama"], ["AK", "Alaska"], ["AZ", "Arizona"], ["AR", "Arkansas"],
  ["CA", "California"], ["CO", "Colorado"], ["CT", "Connecticut"], ["DE", "Delaware"],
  ["DC", "District of Columbia"], ["FL", "Florida"], ["GA", "Georgia"], ["HI", "Hawaii"],
  ["ID", "Idaho"], ["IL", "Illinois"], ["IN", "Indiana"], ["IA", "Iowa"],
  ["KS", "Kansas"], ["KY", "Kentucky"], ["LA", "Louisiana"], ["ME", "Maine"],
  ["MD", "Maryland"], ["MA", "Massachusetts"], ["MI", "Michigan"], ["MN", "Minnesota"],
  ["MS", "Mississippi"], ["MO", "Missouri"], ["MT", "Montana"], ["NE", "Nebraska"],
  ["NV", "Nevada"], ["NH", "New Hampshire"], ["NJ", "New Jersey"], ["NM", "New Mexico"],
  ["NY", "New York"], ["NC", "North Carolina"], ["ND", "North Dakota"], ["OH", "Ohio"],
  ["OK", "Oklahoma"], ["OR", "Oregon"], ["PA", "Pennsylvania"], ["RI", "Rhode Island"],
  ["SC", "South Carolina"], ["SD", "South Dakota"], ["TN", "Tennessee"], ["TX", "Texas"],
  ["UT", "Utah"], ["VT", "Vermont"], ["VA", "Virginia"], ["WA", "Washington"],
  ["WV", "West Virginia"], ["WI", "Wisconsin"], ["WY", "Wyoming"],
];

const slugify = (name: string) =>
  name.toLowerCase().replace(/[^a-z]+/g, "-").replace(/(^-|-$)/g, "");

// Gentle deterministic "active members" so the number is stable between renders.
const mockMembers = (code: string) =>
  40 + (code.charCodeAt(0) + code.charCodeAt(1)) * 3;

export const STATES: UsState[] = raw.map(([code, name]) => ({
  code,
  name,
  slug: slugify(name),
  activeMembers: mockMembers(code),
}));

export const stateByCode = (code: string) =>
  STATES.find((s) => s.code === code);

export const stateBySlug = (slug: string) =>
  STATES.find((s) => s.slug === slug);
