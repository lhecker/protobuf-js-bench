const Benchmark = require('benchmark');
const fs = require('fs');

const proto2Old = require('./proto/benchmark_messages_proto2_pb_old');
const proto2New = require('./proto/benchmark_messages_proto2_pb_new');
const proto3Old = require('./proto/benchmark_messages_proto3_pb_old');
const proto3New = require('./proto/benchmark_messages_proto3_pb_new');

let datasetMessage1 = new Uint8Array(fs.readFileSync('./datasets/google_message1.dat'));
let datasetMessage2 = new Uint8Array(fs.readFileSync('./datasets/google_message2.dat'));
let jsonGoogleMessage1Encoded = fs.readFileSync('./datasets/google_message1.json', {encoding: 'utf8'});
let jsonGoogleMessage2Encoded = fs.readFileSync('./datasets/google_message2.json', {encoding: 'utf8'});

const suite = new Benchmark.Suite;
const testSettings = {
	maxTime: 1,
};

let proto2OldGoogleMessage1Decoded;
let proto2NewGoogleMessage1Decoded;
let proto2OldGoogleMessage2Decoded;
let proto2NewGoogleMessage2Decoded;
let proto3OldGoogleMessage1Decoded;
let proto3NewGoogleMessage1Decoded;
suite.add('decode.proto2.message1.old', () => { proto2OldGoogleMessage1Decoded = proto2Old.GoogleMessage1.deserializeBinary(datasetMessage1); }, testSettings);
suite.add('decode.proto2.message1.new', () => { proto2NewGoogleMessage1Decoded = proto2New.GoogleMessage1.deserializeBinary(datasetMessage1); }, testSettings);
suite.add('decode.proto2.message2.old', () => { proto2OldGoogleMessage2Decoded = proto2Old.GoogleMessage2.deserializeBinary(datasetMessage2); }, testSettings);
suite.add('decode.proto2.message2.new', () => { proto2NewGoogleMessage2Decoded = proto2New.GoogleMessage2.deserializeBinary(datasetMessage2); }, testSettings);
suite.add('decode.proto3.message1.old', () => { proto3OldGoogleMessage1Decoded = proto3Old.GoogleMessage1.deserializeBinary(datasetMessage1); }, testSettings);
suite.add('decode.proto3.message1.new', () => { proto3NewGoogleMessage1Decoded = proto3New.GoogleMessage1.deserializeBinary(datasetMessage1); }, testSettings);

suite.add('encode.proto2.message1.old', () => { proto2OldGoogleMessage1Decoded.serializeBinary(); }, testSettings);
suite.add('encode.proto2.message1.new', () => { proto2NewGoogleMessage1Decoded.serializeBinary(); }, testSettings);
suite.add('encode.proto2.message2.old', () => { proto2OldGoogleMessage2Decoded.serializeBinary(); }, testSettings);
suite.add('encode.proto2.message2.new', () => { proto2NewGoogleMessage2Decoded.serializeBinary(); }, testSettings);
suite.add('encode.proto3.message1.old', () => { proto3OldGoogleMessage1Decoded.serializeBinary(); }, testSettings);
suite.add('encode.proto3.message1.new', () => { proto3NewGoogleMessage1Decoded.serializeBinary(); }, testSettings);

let jsonGoogleMessage1Decoded;
let jsonGoogleMessage2Decoded;
suite.add('decode.json.message1', () => { jsonGoogleMessage1Decoded = JSON.parse(jsonGoogleMessage1Encoded); }, testSettings);
suite.add('decode.json.message2', () => { jsonGoogleMessage2Decoded = JSON.parse(jsonGoogleMessage2Encoded); }, testSettings);
suite.add('encode.json.message1', () => { jsonGoogleMessage1Encoded = JSON.stringify(jsonGoogleMessage1Decoded); }, testSettings);
suite.add('encode.json.message2', () => { jsonGoogleMessage2Encoded = JSON.stringify(jsonGoogleMessage2Decoded); }, testSettings);

suite.on('cycle', (event) => {
	const bench = event.target;

	if (bench.error) {
		console.error(bench.error.stack);
	} else {
		const stats = bench.stats;
		logTableRow(bench.name, stats.sample.length, Math.round(bench.hz), Math.round(stats.mean * 1e9), stats.rme.toFixed(2) + '%');
	}
});

logTableRow('name', 'samples', 'ops/sec', 'ns/op', 'rmse');
suite.run();

function logTableRow(name, samples, hz, mean, rmse) {
	console.log(`${rightPad(name, 26)}   ${leftPad(samples, 12)}   ${leftPad(hz, 12)}   ${leftPad(mean, 12)}   ${rmse}`);
}

function leftPad(num, length, padChar) {
    const n = String(num);
    const r = Math.max(0, length - n.length);
    return (padChar || ' ')[0].repeat(r) + n;
}

function rightPad(num, length, padChar) {
    const n = String(num);
    const r = Math.max(0, length - n.length);
    return n + (padChar || ' ')[0].repeat(r);
}
