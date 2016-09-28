var saw = require('string-saw'),
	moment = require('moment');

var ACCESS_LOG_REGEXP = /(?:([a-z0-9]+)|-) (?:([a-z0-9\.-_]+)|-) (?:\[([^\]]+)\]|-) (?:([0-9\.]+)|-) (?:-|([a-z0-9:\/\-]+)) (?:([a-z0-9.-_]+)|-) (?:([a-z\.]+)|-) (?:-|([a-z0-9\.\-_\/%]+)) (?:"-"|"([^"]+)"|-) (?:(\d+)|-) (?:([a-z]+)|-) (?:(\d+)|-) (?:(\d+)|-) (?:(\d+)|-) (?:(\d+)|-) (?:"-"|"([^"]+)"|-) (?:"-"|"([^"]+)"|-) (?:([a-z0-9]+)|-)/i;

module.exports = a = function (line) {
	var $match = saw(line).match(ACCESS_LOG_REGEXP);

	if (!$match.toBoolean()) {
		return null;
	}

	var log = $match.toObject(
		'bucket_owner',
		'bucket',
		'time',
		'remote_ip',
		'requester',
		'request_id',
		'operation',
		'key',
		'request_uri',
		'http_status',
		'error_code',
		'bytes_sent',
		'object_size',
		'total_time',
		'turn_around_time',
		'referrer',
		'user_agent',
		'version_id'
	);

	if (log.http_status) {
		log.http_status = parseInt(log.http_status, 10);
	}

	if (log.bytes_sent) {
		log.bytes_sent = parseInt(log.bytes_sent, 10);
	}

	if (log.object_size) {
		log.object_size = parseInt(log.object_size, 10);
	}

	if (log.total_time) {
		log.total_time = parseInt(log.total_time, 10);
	}

	if (log.turn_around_time) {
		log.turn_around_time = parseInt(log.turn_around_time, 10);
	}

	if (log.time) {
		log.time = moment(log.time, 'DD/MMM/YYYY:HH:mm:ss Z').toDate();
	}

	return log;
};