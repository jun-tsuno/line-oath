import { type NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * LINEプラットフォームからのリダイレクト先
 * トークンを取得・検証し、ユーザー情報を取得する
 */
export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const code = searchParams.get('code');

	if (!code) {
		return NextResponse.json(
			{ error: 'Authorization code is missing' },
			{ status: 400 }
		);
	}

	const clientId = process.env.LINE_CHANNEL_ID!;
	const clientSecret = process.env.LINE_CHANNEL_SECRET!;
	const redirectUri = process.env.LINE_CALLBACK_URL!;

	try {
		// トークンの交換
		const tokenResponse = await fetch('https://api.line.me/oauth2/v2.1/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				grant_type: 'authorization_code',
				code: code,
				redirect_uri: redirectUri,
				client_id: clientId,
				client_secret: clientSecret,
			}).toString(),
		});

		if (!tokenResponse.ok) {
			throw new Error('Failed to exchange token');
		}

		const tokenData = await tokenResponse.json();
		const accessToken = tokenData.access_token;

		// プロフィールの取得
		const profileResponse = await fetch('https://api.line.me/v2/profile', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (!profileResponse.ok) {
			throw new Error('Failed to fetch profile');
		}

		const profile = await profileResponse.json();

		// クッキーにプロフィール情報を保存
		cookies().set({
			name: 'lineProfile',
			value: JSON.stringify(profile),
			path: '/',
			httpOnly: true, // クライアントサイドのJavaScriptからアクセスできないようにする
			secure: process.env.NODE_ENV === 'development' ? false : true, // HTTPSを使用している場合にのみ送信
			sameSite: 'lax', // CSRF攻撃を防ぐため
		});

		// ログイン後のページにリダイレクト
		return NextResponse.redirect('http://localhost:3000/home');
	} catch (error) {
		console.error('Error during LINE token exchange or profile fetch:', error);
		return NextResponse.json(
			{ error: 'Failed to retrieve LINE profile' },
			{ status: 500 }
		);
	}
}
