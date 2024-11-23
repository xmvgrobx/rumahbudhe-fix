export const uploadToBlob = async (file: File, filename: string) => {
  const formData = new FormData();
  formData.append('file', file, filename);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to upload file: ${response.status}`);
  }

  const { url } = await response.json();
  return { url };
};