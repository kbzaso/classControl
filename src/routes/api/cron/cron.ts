const handler = async (request, response) => {
	try{
		console.log('Cron job ran at', new Date().toISOString());
		return response.status(200).json({ success: true, message: 'hello' });
	} catch (error) {
		return response.status(500).json({ success: false, message: error });
  }
}


  export default handler