const API_BASE = import.meta.env.VITE_API_BASE_URL;

// Generic GET request
export async function fetchData(endpoint) {
	try {
		const res = await fetch(`${API_BASE}${endpoint}`);
		if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
		return await res.json();
	} catch (err) {
		console.error("API error:", err);
		return [];
	}
}

// Optional: POST request
export async function postData(endpoint, payload) {
	try {
		const res = await fetch(`${API_BASE}${endpoint}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload)
		});
		if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
		return await res.json();
	} catch (err) {
		console.error("API error:", err);
		return null;
	}
}
