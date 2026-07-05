export function getUrl(relativePath: string, isExport = false) {
  const normalizedPath = relativePath.at(0) == "/" ? relativePath : `/${relativePath}`;
  if (isExport) return normalizedPath;
  return `${process.env.NEXT_PUBLIC_API_URL}${normalizedPath}`;
}
