#!/bin/bash
echo "Creating migration"
npm run database-up
echo "Running server"
npm run server