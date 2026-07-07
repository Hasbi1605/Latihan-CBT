import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || "dev-secret-cbt-uin-siber-ganti-di-produksi",
);

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
    .sign(secret);
}

export async function verifySessionToken(
  token: string,
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
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
