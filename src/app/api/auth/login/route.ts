import { type NextRequest, NextResponse } from 'next/server';

/**
 * LINEプラットフォームにリダイレクトする
 */
export async function GET(request: NextRequest) {
	const channelId = process.env.NEXT_PUBLIC_LINE_CHANNEL_ID as string;
	const redirectUrl = process.env.NEXT_PUBLIC_LINE_REDIRECT_URL as string;
	const encodedRedirectUri = encodeURIComponent(redirectUrl);
	const state = process.env.NEXT_PUBLIC_LINE_STATE as string;
	const loginUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${channelId}&redirect_uri=${encodedRedirectUri}&state=${state}&scope=profile%20openid%20email`;

	return NextResponse.redirect(loginUrl);
}
