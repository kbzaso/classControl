/** @type {import('./$types').RequestHandler} */
export async function GET(req, res) {
	
	return new Response( JSON.stringify({ message: 'Hello World' }), {
		headers: { 'content-type': 'application/json' },
	});
}