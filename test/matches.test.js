var parser = require('../index');

describe('General', function() {
	it('it can parse valid lines', function() {
		expect(parser(
			'79a59df900b949e55d96a1e698fbacedfd6e09d98eacf8f8d5218e7cd47ef2be mybucket-2 [06/Feb/2014:00:00:38 +0000] 192.0.2.3 79a59df900b949e55d96a1e698fbacedfd6e09d98eacf8f8d5218e7cd47ef2be 3E57427F3EXAMPLE REST.GET.VERSIONING mybucket-%20file "GET /mybucket-%20file?versioning HTTP/1.1" 200 - 113 - 7 - "-" "S3Console/0.4" -'
		)).toEqual({
			bucket_owner: '79a59df900b949e55d96a1e698fbacedfd6e09d98eacf8f8d5218e7cd47ef2be',
			bucket: 'mybucket-2',
			time: new Date('Thu Feb 06 2014 07:00:38 GMT+0700 (ICT)'),
			remote_ip: '192.0.2.3',
			requester: '79a59df900b949e55d96a1e698fbacedfd6e09d98eacf8f8d5218e7cd47ef2be', 
			request_id: '3E57427F3EXAMPLE', 
			operation: 'REST.GET.VERSIONING',
			key: 'mybucket-%20file',
			request_uri: 'GET /mybucket-%20file?versioning HTTP/1.1', 
			http_status: 200, 
			bytes_sent: 113, 
			total_time: 7, 
			user_agent: 'S3Console/0.4'
		});

		expect(parser(
			'- - - - - - - - "-" - - - - - - "-" "-" -'
		)).toEqual({});
	});

	it('it can parse lines with requests originating from IAM users', function() {
		expect(parser(
			'79a59df900b949e55d96a1e698fbacedfd6e09d98eacf8f8d5218e7cd47ef2be mybucket [06/Feb/2014:00:00:38 +0000] 192.0.2.3 arn:aws:iam::100:user/iam-user 3E57427F3EXAMPLE REST.GET.VERSIONING - "GET /mybucket?versioning HTTP/1.1" 200 - 113 - 7 - "-" "S3Console/0.4" -'
		)).toEqual(jasmine.objectContaining({
			requester: 'arn:aws:iam::100:user/iam-user'
		}));
	});

	it('it can detect bad matches', function() {
		expect(parser(
			'mybucket [06/Feb/2014:00:00:38 +0000] 192.0.2.3 79a59df900b949e55d96a1e698fbacedfd6e09d98eacf8f8d5218e7cd47ef2be 3E57427F3EXAMPLE REST.GET.VERSIONING - "GET /mybucket?versioning HTTP/1.1" 200 - 113 - 7 - "-" "S3Console/0.4" -'
		)).toEqual(null);

		expect(parser(
			'bad match'
		)).toEqual(null);
	});
});