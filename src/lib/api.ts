// Backend API service
const BASE_URL = 'https://pdftoolpro.onrender.com';

export interface ChatResponse {
  answer: string;
}

export interface SummaryResponse {
  summary: string;
}

export interface AvatarResponse {
  avatar_url: string;
}

// Chat with PDF - Send PDF + question, get AI answer
export const chatWithPdf = async (pdf: File, question: string): Promise<ChatResponse> => {
  const formData = new FormData();
  formData.append('pdf', pdf);
  formData.append('question', question);

  const response = await fetch(`${BASE_URL}/chat-with-pdf`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to get response from AI');
  }

  return response.json();
};

// PDF Summary - Send PDF, get summary
export const getPdfSummary = async (pdf: File): Promise<SummaryResponse> => {
  const formData = new FormData();
  formData.append('pdf', pdf);

  const response = await fetch(`${BASE_URL}/pdf-summary`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to generate summary');
  }

  return response.json();
};

// Generate 3D Avatar from photo
export const generate3DAvatar = async (photo: File): Promise<AvatarResponse> => {
  const formData = new FormData();
  formData.append('photo', photo);

  const response = await fetch(`${BASE_URL}/avatar-3d`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to generate avatar');
  }

  return response.json();
};
