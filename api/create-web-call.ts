import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
    request: VercelRequest,
    response: VercelResponse,
) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method Not Allowed' });
    }

    const apiKey = process.env.RETELL_API_KEY;
    const agentId = process.env.RETELL_AGENT_ID;

    if (!apiKey || !agentId) {
        console.error('Missing RETELL_API_KEY or RETELL_AGENT_ID environment variables');
        return response.status(500).json({ error: 'Server configuration error' });
    }

    try {
        const apiResponse = await fetch("https://api.retellai.com/v2/create-web-call", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                agent_id: agentId
            })
        });

        if (!apiResponse.ok) {
            throw new Error(`Retell API error: ${apiResponse.statusText}`);
        }

        const data = await apiResponse.json();

        // Validate that access_token is present in the response
        if (!data.access_token) {
            return response.status(500).json({ error: 'Invalid response from voice service' });
        }

        return response.status(200).json(data);
    } catch {
        return response.status(500).json({ error: 'Failed to create web call' });
    }
}
