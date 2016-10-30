# protobuf-js-bench

This is a PoC.

## Usage

```bash
npm install
node index.js
```

## Results

name                           | samples | ops/sec | ns/op   | rme
-------------------------------|---------|---------|---------|-------
decode proto2 message1 **old** |      20 |  168516 |    5934 | ±0.42%
decode proto2 message1 **new** |      23 |  341186 |    2931 | ±0.25%
decode proto2 message2 **old** |      19 |     138 | 7241664 | ±3.98%
decode proto2 message2 **new** |      20 |     203 | 4915836 | ±0.82%
decode proto3 message1 **old** |      22 |  119309 |    8382 | ±2.33%
decode proto3 message1 **new** |      21 |  189197 |    5286 | ±2.94%
encode proto2 message1 **old** |      21 |  207638 |    4816 | ±0.32%
encode proto2 message1 **new** |      20 |  206339 |    4846 | ±2.07%
encode proto2 message2 **old** |      22 |     372 | 2688337 | ±0.71%
encode proto2 message2 **new** |      20 |     385 | 2599718 | ±2.53%
encode proto3 message1 **old** |      19 |  121546 |    8227 | ±0.19%
encode proto3 message1 **new** |      20 |  121626 |    8222 | ±2.47%
decode json message1           |      22 |  187882 |    5322 | ±0.22%
decode json message2           |      19 |     327 | 3061492 | ±5.54%
encode json message1           |      19 |  225345 |    4438 | ±1.97%
encode json message2           |      22 |     489 | 2047071 | ±0.18%
