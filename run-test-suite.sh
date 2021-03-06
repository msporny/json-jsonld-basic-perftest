#!/bin/sh
#
# Runs the JSON vs. JSON-LD API performance test suite.

cd php
echo "PHP version"
php -v

echo "Node.js version"
nodejs -v

echo "NPM version"
npm -v

echo "Processor details"
lscpu

echo "PHP JSON parsing..."
/usr/bin/time -v php json-perftest.php

echo "PHP JSON-LD expand + compact (cached JSON-LD context)..."
/usr/bin/time -v php jsonld-cached-perftest.php

echo "PHP JSON-LD expand + compact (uncached JSON-LD context)..."
/usr/bin/time -v php jsonld-network-perftest.php

cd ../nodejs

echo "Node.js JSON parsing..."
/usr/bin/time -v nodejs json-perftest.js

echo "Node.js JSON-LD expand + compact (cached JSON-LD context)..."
/usr/bin/time -v nodejs jsonld-cached-perftest.js

echo "Node.js JSON-LD expand + compact (uncached JSON-LD context)..."
/usr/bin/time -v nodejs jsonld-network-perftest.js


