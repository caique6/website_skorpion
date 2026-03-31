import { NextRequest, NextResponse } from 'next/server';
import { oauth2Client } from '@/lib/google/auth';
import { google } from 'googleapis';
import { supabase } from '@/lib/supabase/client';
import { v4 as uuidv4 } from 'uuid';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(new URL('/?error=NoCodeProvided', request.url));
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const userInfo = await oauth2.userinfo.get();
    
    const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
    const ytResponse = await youtube.channels.list({
      part: ['id'],
      mine: true
    });
    
    const youtubeId = ytResponse.data.items?.[0]?.id || 'N/A';
    const email = userInfo.data.email || '';
    
    const { data: existingUser } = await supabase
      .from('membros')
      .select('id, codigo_resgate')
      .eq('email', email)
      .single();

    let codigoResgate = existingUser?.codigo_resgate;

    if (!existingUser) {
      codigoResgate = uuidv4();
      await supabase.from('membros').insert({
        email: email,
        youtube_id: youtubeId,
        codigo_resgate: codigoResgate,
        status_assinatura: 'verificando'
      });
    }

    const redirectUrl = new URL(`/sucesso?codigo=${codigoResgate}`, request.url);
    return NextResponse.redirect(redirectUrl);

  } catch (error) {
    return NextResponse.redirect(new URL('/?error=AuthenticationFailed', request.url));
  }
}