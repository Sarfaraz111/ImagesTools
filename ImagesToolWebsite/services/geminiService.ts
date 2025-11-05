// The URL for our Netlify serverless function proxy
const PROXY_URL = '/.netlify/functions/gemini-proxy';

/**
 * A helper function to call our secure backend proxy.
 * @param action - The specific AI task to perform (e.g., 'processImage').
 * @param payload - The data needed for the task (e.g., image data, prompt).
 * @returns The base64-encoded result from the Gemini API.
 */
const callProxy = async (action: string, payload: any): Promise<string> => {
  const response = await fetch(PROXY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ action, payload }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    // Forward the error message from the backend proxy
    throw new Error(responseData.error || `Request failed with status ${response.status}`);
  }

  return responseData.resultBase64;
};

export const processImage = async (
  base64Image: string,
  mimeType: string,
  prompt: string,
  maskBase64?: string
): Promise<string> => {
  try {
    const payload = { base64Image, mimeType, prompt, maskBase64 };
    return await callProxy('processImage', payload);
  } catch (error) {
    console.error("Error processing image via proxy:", error);
    throw error; // Re-throw the error to be handled by the component
  }
};

export const generateIcon = async (prompt: string): Promise<string> => {
  try {
    const payload = { prompt };
    return await callProxy('generateIcon', payload);
  } catch (error) {
    console.error("Error generating icon via proxy:", error);
    throw error; // Re-throw the error to be handled by the component
  }
};
