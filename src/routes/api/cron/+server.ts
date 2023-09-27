export default function handler(request, response) {
	console.log('Cron job ran at', new Date().toISOString());
   
	response.status(200).json({ success: true, message: 'hello' });
  }