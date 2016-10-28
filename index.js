const Benchmark = require('benchmark');
const fs = require('fs');

const proto2Old = require('./proto/benchmark_messages_proto2_pb_old');
const proto2New = require('./proto/benchmark_messages_proto2_pb_new');
const proto3Old = require('./proto/benchmark_messages_proto3_pb_old');
const proto3New = require('./proto/benchmark_messages_proto3_pb_new');

let datasetMessage1 = new Uint8Array(fs.readFileSync('./datasets/google_message1.dat'));
let datasetMessage2 = new Uint8Array(fs.readFileSync('./datasets/google_message2.dat'));

let proto2OldGoogleMessage1Decoded;
let proto2NewGoogleMessage1Decoded;
let proto2OldGoogleMessage2Decoded;
let proto2NewGoogleMessage2Decoded;
let proto3OldGoogleMessage1Decoded;
let proto3NewGoogleMessage1Decoded;

const suite = new Benchmark.Suite;


suite.add('decode.proto2.message1.old', () => {
	proto2OldGoogleMessage1Decoded = proto2Old.GoogleMessage1.deserializeBinary(datasetMessage1);
});

suite.add('decode.proto2.message1.new', () => {
	proto2NewGoogleMessage1Decoded = proto2New.GoogleMessage1.deserializeBinary(datasetMessage1);
});

suite.add('decode.proto2.message2.old', () => {
	proto2OldGoogleMessage2Decoded = proto2Old.GoogleMessage2.deserializeBinary(datasetMessage2);
});

suite.add('decode.proto2.message2.new', () => {
	proto2NewGoogleMessage2Decoded = proto2New.GoogleMessage2.deserializeBinary(datasetMessage2);
});

suite.add('decode.proto3.message1.old', () => {
	proto3OldGoogleMessage1Decoded = proto3Old.GoogleMessage1.deserializeBinary(datasetMessage1);
});

suite.add('decode.proto3.message1.new', () => {
	proto3NewGoogleMessage1Decoded = proto3New.GoogleMessage1.deserializeBinary(datasetMessage1);
});

suite.add('encode.proto2.message1.old', () => {
	datasetMessage1 = proto2OldGoogleMessage1Decoded.serializeBinary();
});

suite.add('encode.proto2.message1.new', () => {
	datasetMessage1 = proto2NewGoogleMessage1Decoded.serializeBinary();
});

suite.add('encode.proto2.message2.old', () => {
	datasetMessage2 = proto2OldGoogleMessage2Decoded.serializeBinary();
});

suite.add('encode.proto2.message2.new', () => {
	datasetMessage2 = proto2NewGoogleMessage2Decoded.serializeBinary();
});

suite.add('encode.proto3.message1.old', () => {
	datasetMessage1 = proto3OldGoogleMessage1Decoded.serializeBinary();
});

suite.add('encode.proto3.message1.new', () => {
	datasetMessage1 = proto3NewGoogleMessage1Decoded.serializeBinary();
});

suite.on('cycle', (event) => {
	const bench = event.target;

	if (bench.error) {
		console.error(bench.error.stack);
	} else {
		const stats = bench.stats;
		console.log(
			'%s %s samples %s ops/sec ±%s% %s ns/op',
			bench.name,
			leftPad(stats.sample.length, 5),
			leftPad(Math.round(bench.hz), 14),
			stats.rme.toFixed(2),
			leftPad(Math.round(stats.mean * 1e9), 14)
		);
	}
});

console.log('Running...');
Benchmark.options.maxTime = 1; // benchmark.js does not allow this to be set using run()
suite.run();

function leftPad(num, length, padChar) {
    const n = String(num);
    const r = Math.max(0, length - n.length);
    return (padChar || ' ')[0].repeat(r) + n;
}
