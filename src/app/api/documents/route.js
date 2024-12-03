import axios from 'axios';
import { NextResponse } from 'next/server';
import { URL } from '@component/utils/constants';

export const dynamic = 'force-static';

export async function GET() {
    try {
        const response = await axios.get(`${URL}/api/scenarios-collection`, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}