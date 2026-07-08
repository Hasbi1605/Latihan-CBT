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

/** Secure cookie hanya jika COOKIE_SECURE=true atau request HTTPS eksplisit. */
export function sessionCookieSecure(req: Request): boolean {
  if (process.env.COOKIE_SECURE === "true") return true;
  if (process.env.COOKIE_SECURE === "false") return false;
  const proto = req.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  return proto === "https";
}

export function sessionCookieOptions(req: Request) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: sessionCookieSecure(req),
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}

/** Header Set-Cookie manual — menghindari Next.js memaksa Secure di production. */
export function sessionCookieHeader(token: string, req: Request): string {
  const opts = sessionCookieOptions(req);
  const parts = [
    `${SESSION_COOKIE}=${token}`,
    `Path=${opts.path}`,
    `Max-Age=${opts.maxAge}`,
    "HttpOnly",
    `SameSite=${opts.sameSite === "lax" ? "Lax" : opts.sameSite}`,
  ];
  if (opts.secure) parts.push("Secure");
  return parts.join("; ");
}

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
