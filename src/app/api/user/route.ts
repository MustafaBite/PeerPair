import { NextResponse } from 'next/server';

export async function GET() {
  // Şimdilik mock veri döndürüyoruz
  return NextResponse.json({
    name: 'Ahmet Yılmaz',
    department: 'Bilgisayar Mühendisliği',
  });
} 