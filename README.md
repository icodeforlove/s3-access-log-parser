# s3-access-log-parser [![Build Status](https://travis-ci.org/icodeforlove/s3-access-log-parser.png?branch=master)](https://travis-ci.org/icodeforlove/s3-access-log-parser)

provides an easy way to parse the S3 access log format

## install

```
npm install s3-access-log-parser
```

## examples

```javascript
var s3alp = require('s3-access-log-parser');

s3alp('79a59df900b949e55d96a1e698fbacedfd6e09d98eacf8f8d5218e7cd47ef2be mybucket [06/Feb/2014:00:00:38 +0000] 192.0.2.3 79a59df900b949e55d96a1e698fbacedfd6e09d98eacf8f8d5218e7cd47ef2be 3E57427F3EXAMPLE REST.GET.VERSIONING - "GET /mybucket?versioning HTTP/1.1" 200 - 113 - 7 - "-" "S3Console/0.4" -');
```

would return 

```
{
	bucket_owner: '79a59df900b949e55d96a1e698fbacedfd6e09d98eacf8f8d5218e7cd47ef2be',
	bucket: 'mybucket',
	time: new Date('Thu Feb 06 2014 07:00:38 GMT+0700 (ICT)'),
	remote_ip: '192.0.2.3',
	requester: '79a59df900b949e55d96a1e698fbacedfd6e09d98eacf8f8d5218e7cd47ef2be', 
	request_id: '3E57427F3EXAMPLE', 
	operation: 'REST.GET.VERSIONING', 
	request_uri: 'GET /mybucket?versioning HTTP/1.1', 
	http_status: 200, 
	bytes_sent: 113, 
	total_time: 7, 
	user_agent: 'S3Console/0.4'
}
```