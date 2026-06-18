const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "/api";

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = localStorage.getItem("kisanseva-auth")
    ? JSON.parse(localStorage.getItem("kisanseva-auth") ?? "{}").state?.token
    : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message ?? `HTTP ${res.status}`);
  }

  return res.json();
}

export interface WeatherData {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  icon: string;
  rainfall: number;
  forecast: WeatherDay[];
}

export interface WeatherDay {
  date: string;
  tempMax: number;
  tempMin: number;
  condition: string;
  icon: string;
  rainfall: number;
}

export interface MandiPrice {
  id: string;
  crop: string;
  market: string;
  district: string;
  modalPrice: number;
  minPrice: number;
  maxPrice: number;
  date: string;
  unit: string;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorVillage: string;
  content_te: string;
  content_hi: string;
  content_en: string;
  category: string;
  likes: number;
  comments: number;
  tags: string[];
  createdAt: string;
}

export interface Scheme {
  id: string;
  name_te: string;
  name_hi: string;
  name_en: string;
  category: string;
  benefitAmount: number;
  deadline: string;
  description_te: string;
  eligibility: string[];
}

export interface DiseaseResult {
  disease: string;
  confidence: number;
  treatment: string[];
  medicines: string[];
  preventiveMeasures: string[];
}

// Weather API
export async function getCurrentWeather(
  lat: number,
  lng: number,
): Promise<WeatherData> {
  return request<WeatherData>(`/weather/current?lat=${lat}&lng=${lng}`);
}

// Market API
export async function getMandiPrices(params: {
  crop?: string;
  district?: string;
}): Promise<MandiPrice[]> {
  const searchParams = new URLSearchParams();
  if (params.crop) searchParams.set("crop", params.crop);
  if (params.district) searchParams.set("district", params.district);
  return request<MandiPrice[]>(`/market/prices?${searchParams}`);
}

// Disease Detection
export async function detectDisease(
  imageFile: File,
): Promise<DiseaseResult> {
  const formData = new FormData();
  formData.append("image", imageFile);
  const token = localStorage.getItem("kisanseva-auth")
    ? JSON.parse(localStorage.getItem("kisanseva-auth") ?? "{}").state?.token
    : null;
  const res = await fetch(`${API_BASE}/disease/detect`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  if (!res.ok) throw new Error("Detection failed");
  return res.json();
}

// Community
export async function getCommunityPosts(params: {
  category?: string;
  page?: number;
}): Promise<CommunityPost[]> {
  const searchParams = new URLSearchParams();
  if (params.category) searchParams.set("category", params.category);
  if (params.page) searchParams.set("page", String(params.page));
  return request<CommunityPost[]>(`/community/posts?${searchParams}`);
}

// Schemes
export async function getSchemes(): Promise<Scheme[]> {
  return request<Scheme[]>("/schemes");
}

// AI Chat
export async function aiChat(message: string, language: string): Promise<{
  reply_te: string;
  reply_en: string;
  suggestedActions: string[];
}> {
  return request("/advisory/ai-chat", {
    method: "POST",
    body: JSON.stringify({ message, language }),
  });
}

// Voice TTS
export async function textToSpeech(
  text: string,
  language: string,
): Promise<ArrayBuffer> {
  const res = await fetch(`${API_BASE}/voice/tts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, language }),
  });
  if (!res.ok) throw new Error("TTS failed");
  return res.arrayBuffer();
}

// Auth API
export interface SendOtpResponse {
  success: boolean;
  message: string;
}

export interface VerifyOtpResponse {
  token: string;
  isNewUser: boolean;
  user?: {
    id: string;
    name: string;
    phone: string;
    village: string;
    mandal: string;
    district: string;
    state: string;
    preferredLanguage: "te" | "hi" | "en";
    isVerified: boolean;
  };
}

export interface RegisterPayload {
  name: string;
  village: string;
  mandal: string;
  district: string;
  state: string;
  preferredLanguage: "te" | "hi" | "en";
}

// Login flow: send OTP to phone
export async function sendOtp(phone: string): Promise<SendOtpResponse> {
  return request<SendOtpResponse>("/auth/send-otp", {
    method: "POST",
    body: JSON.stringify({ phone }),
  });
}

// Verify OTP and get JWT
export async function verifyOtp(
  phone: string,
  otp: string,
): Promise<VerifyOtpResponse> {
  return request<VerifyOtpResponse>("/auth/verify-otp", {
    method: "POST",
    body: JSON.stringify({ phone, otp }),
  });
}

// Complete registration for new user
export async function registerFarmer(
  payload: RegisterPayload,
  token: string,
): Promise<VerifyOtpResponse> {
  return request<VerifyOtpResponse>("/auth/register", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });
}

// Get current user profile
export async function getProfile(): Promise<VerifyOtpResponse["user"]> {
  return request<VerifyOtpResponse["user"]>("/auth/me");
}

export { API_BASE };
