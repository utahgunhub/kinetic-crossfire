export const restrictedShippingStates = [
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Hawaii",
  "Illinois",
  "Maryland",
  "Massachusetts",
  "Nevada",
  "New Jersey",
  "New York",
  "Oregon",
  "Washington",
] as const;

const restrictedShippingStatesSet = new Set<string>(restrictedShippingStates);

export const usStates = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
] as const;

export const allowedShippingStates = usStates.filter(
  (state) => !restrictedShippingStatesSet.has(state)
);

const restrictedShippingStateAliases: Record<string, string> = {
  ca: "California",
  california: "California",
  co: "Colorado",
  colorado: "Colorado",
  ct: "Connecticut",
  connecticut: "Connecticut",
  de: "Delaware",
  delaware: "Delaware",
  hi: "Hawaii",
  hawaii: "Hawaii",
  il: "Illinois",
  illinois: "Illinois",
  md: "Maryland",
  maryland: "Maryland",
  ma: "Massachusetts",
  massachusetts: "Massachusetts",
  nv: "Nevada",
  nevada: "Nevada",
  nj: "New Jersey",
  "new jersey": "New Jersey",
  ny: "New York",
  "new york": "New York",
  or: "Oregon",
  oregon: "Oregon",
  wa: "Washington",
  washington: "Washington",
};

export const restrictedShippingStatesText = restrictedShippingStates.join(", ");

export const getRestrictedShippingState = (value: string): string | null => {
  const normalizedValue = value.trim().toLowerCase();
  return restrictedShippingStateAliases[normalizedValue] ?? null;
};

export const isRestrictedShippingState = (value: string): boolean => {
  return getRestrictedShippingState(value) !== null;
};
