// Импорт ответов и типов от Next.js middleware API
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Кастомный клиент Supabase, настроенный для server-side использования
import { createSupabaseServerClient } from "@/lib/supabaseServer";

// Поддерживаемые языки для i18n маршрутов
const PUBLIC_LOCALES = ["en", "ru"];
const DEFAULT_LOCALE = "ru";

/**
 * Определяет локаль из заголовка Accept-Language запроса.
 * Возвращает первую найденную поддерживаемую локаль или локаль по умолчанию.
 */
function detectLocale(req: NextRequest): string {
  const acceptLang = req.headers.get("accept-language");
  if (!acceptLang) return DEFAULT_LOCALE;

  const matched = PUBLIC_LOCALES.find((locale) =>
    acceptLang.toLowerCase().includes(locale)
  );

  return matched || DEFAULT_LOCALE;
}

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // I18N редирект: если пользователь заходит на корень сайта ("/"),
  // его перенаправляют на подходящую локаль, например "/en" или "/ru"
  if (pathname === "/") {
    const locale = detectLocale(req);
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }

  // Получение Supabase сессии с помощью серверного клиента
  const supabase = await createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Логируем информацию о сессии и пользователе
  console.log("[MIDDLEWARE] Cookies:", req.cookies.getAll());
  console.log("[MIDDLEWARE] Session:", JSON.stringify(session));
  console.log("[MIDDLEWARE] User:", JSON.stringify(session?.user));
  console.log("[MIDDLEWARE] User role:", session?.user?.user_metadata?.role);

  // Пути, требующие админ-доступа
  const adminPaths = ["/admin"];
  const isAdminPath = adminPaths.some((path) =>
    pathname.startsWith(path)
  );

  // Если путь — админский, проверяем авторизацию
  if (isAdminPath) {
    // Перенаправление на /login, если пользователь не авторизован
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Проверка роли пользователя — должен быть "ADMIN"
    const userRole = session.user?.user_metadata?.role;
    if (userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Продолжить выполнение запроса, если все проверки пройдены
  return NextResponse.next();
}

// Настройки матчеров middleware — на какие пути распространяется логика выше
export const config = {
  matcher: [
    '/',                         // корень сайта
    '/(ru|en)',                  // маршруты с локалью
    '/(ru|en)/admin/:path*',     // админка с поддержкой i18n
  ]
};