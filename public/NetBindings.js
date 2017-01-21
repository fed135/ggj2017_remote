require(['kalm', 'kalm-websocket'], function(Kalm, WS) {
	Kalm.adapters.register('ws', WS);

	window.Net = new Kalm.Client({
		hostname: '52.90.77.154',
		port: 9000,
		adapter: 'ws'
	});
});