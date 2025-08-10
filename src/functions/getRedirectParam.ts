const getRedirectParam = (
  path: string,
  redirectTo: string | null,
  hasQueryAlready: boolean = false
): string => {
  if (!redirectTo) return path;

  const connector = hasQueryAlready ? "&" : "?";
  return `${path}${connector}redirectTo=${encodeURIComponent(redirectTo)}`;
};

export default getRedirectParam;