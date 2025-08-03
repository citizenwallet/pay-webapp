export const getNavigationLink = (
  serialNumber: string,
  params:
    | { project?: string; community?: string; token?: string; path?: string }
    | undefined
) => {
  const { project, community, token, path } = params ?? {};

  let url = `/card/${serialNumber}`;
  if (path) {
    url += `${path}`;
  }
  if (project) {
    url += url.includes("?") ? `&project=${project}` : `?project=${project}`;
  }
  if (community) {
    url += url.includes("?")
      ? `&community=${community}`
      : `?community=${community}`;
  }
  if (token) {
    url += url.includes("?") ? `&token=${token}` : `?token=${token}`;
  }
  return url;
};
