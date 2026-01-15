import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
    request: VercelRequest,
    response: VercelResponse,
) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const apiResponse = await fetch("https://api.retellai.com/v2/create-web-call", {
            method: "POST",
            headers: {
                "Authorization": "Bearer key_e1fdf402e8a43b7b6d8a729236c1",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                agent_id: "agent_338cb38fefb80627b1de2817f8"
            })
        });

        if (!apiResponse.ok) {
            throw new Error(`Retell API error: ${apiResponse.statusText}`);
        }

        const data = await apiResponse.json();
        return response.status(200).json(data);
    } catch (error) {
        console.error('Error creating web call:', error);
        return response.status(500).json({ error: 'Failed to create web call' });
    }
}
