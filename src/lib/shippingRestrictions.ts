export const restrictedShippingStates = [
  "California",
  "Connecticut",
  "Delaware",
  "Hawaii",
  "Illinois",
  "Maryland",
  "Massachusetts",
  "New Jersey",
  "New York",
  "Washington",
] as const;

const restrictedShippingStateAliases: Record<string, string> = {
  ca: "California",
  california: "California",
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
  nj: "New Jersey",
  "new jersey": "New Jersey",
  ny: "New York",
  "new york": "New York",
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
