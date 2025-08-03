export function getNavigationLink(
  serialNumber: string,
  options: {
    project?: string;
    community?: string;
    token?: string;
    path?: string;
    lang?: string;
  } = {}
): string {
  const { project, community, token, path = "", lang } = options;
  const params = new URLSearchParams();

  if (project) params.set("project", project);
  if (community) params.set("community", community);
  if (token) params.set("token", token);
  if (lang) params.set("lang", lang);

  const queryString = params.toString();
  const basePath = `/card/${serialNumber}${path}`;

  return queryString ? `${basePath}?${queryString}` : basePath;
}
