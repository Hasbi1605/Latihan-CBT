import { SignJWT, jwtVerify } from "jose";

const DEV_FALLBACK = "dev-secret-cbt-uin-siber-ganti-di-produksi";
let warnedMissingSecret = false;

function resolveAuthSecret(): Uint8Array {
  const value = process.env.AUTH_SECRET;
  if (!value) {
    if (process.env.NODE_ENV === "production" && !warnedMissingSecret) {
      warnedMissingSecret = true;
      console.error(
        "[SECURITY] AUTH_SECRET belum diset. Wajib isi di produksi — lihat .env.example.",
      );
    }
    return new TextEncoder().encode(DEV_FALLBACK);
  }
  return new TextEncoder().encode(value);
}

function secretKey() {
  return resolveAuthSecret();
}

export const SESSION_COOKIE = "cbt_session";

export type SessionRole = "PESERTA" | "ADMIN";

export type SessionPayload = {
  userId: string;
  role: SessionRole;
  nama: string;
  nomorPeserta: string;
};

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey());
}

export async function verifySessionToken(
  token: string,
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey());
    if (
      typeof payload.userId === "string" &&
      typeof payload.role === "string" &&
      typeof payload.nama === "string" &&
      typeof payload.nomorPeserta === "string"
    ) {
      return {
        userId: payload.userId,
        role: payload.role as SessionRole,
        nama: payload.nama,
        nomorPeserta: payload.nomorPeserta,
      };
    }
    return null;
  } catch {
    return null;
  }
}
